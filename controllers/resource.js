const Resource = require("../models/resource");
const { ObjectId } = require("mongodb");
exports.index = async function (req, res) {
  aggregate_options = [];

  const options = {
    page: parseInt(req.query.page) || 1,
    limit: parseInt(req.query.limit) || 20,
    customLabels: {
      totalDocs: "totalResults",
      docs: "results",
    },
  };

  //pupulated
  aggregate_options.push(
    {
      $lookup: {
        from: "cities",
        localField: "city",
        foreignField: "_id",
        as: "city",
      },
    },

    {
      $lookup: {
        from: "status",
        localField: "status",
        foreignField: "_id",
        as: "status",
      },
    },

    {
      $lookup: {
        from: "createdBy",
        localField: "createdBy",
        foreignField: "_id",
        as: "createdBy",
      },
    },
    {
      $lookup: {
        from: "updatedBy",
        localField: "updatedBy",
        foreignField: "_id",
        as: "updatedBy",
      },
    },

    {
      $lookup: {
        from: "resourcetypes",
        localField: "resourceType",
        foreignField: "_id",
        as: "resourceType",
      },
    },
    {
      $unwind: "$city",
    },
    {
      $unwind: "$status",
    },
    {
      $unwind: "$resourceType",
    }
  );

  //search
  if (req.query.search) {
    aggregate_options.push({
      $match: {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { address: { $regex: req.query.search, $options: "i" } },
          { "city.name": { $regex: req.query.search, $options: "i" } },
          { "city.status": { $regex: req.query.search, $options: "i" } },
          {
            "resourceType.name": { $regex: req.query.search, $options: "i" },
          },
        ],
      },
    });
  }

  //filter
  if (req.query.name) {
    aggregate_options.push({
      $match: {
        name: req.query.name,
      },
    });
  }

  if (req.query.city) {
    aggregate_options.push({
      $match: {
        "city._id": new ObjectId(req.query.city),
      },
    });
  }
  if (req.query.status) {
    aggregate_options.push({
      $match: {
        "status._id": new ObjectId(req.query.status),
      },
    });
  }
  if (req.query.resource_type) {
    aggregate_options.push({
      $match: {
        "resourceType._id": new ObjectId(req.query.resource_type),
      },
    });
  }

  const myAggregate = Resource.aggregate(aggregate_options);
  const result = await Resource.aggregatePaginate(myAggregate, options);
  await Resource.populate(result, { path: "city" });

  res.status(200).json(result);
};

exports.store = async (req, res, _) => {
  try {
    const resource = await Resource.create(req.body);
    res.status(201).json(resource);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.show = async function (req, res) {
  try {
    const resource = await Resource.findById(req.params.id);

    if (!resource)
      return res.status(401).json({ message: "Resource does not exist" });

    res.status(200).json({ resource });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.update = async function (req, res) {
  try {
    const resource = await Resource.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(202).json(resource);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.destroy = async function (req, res) {
  try {
    await Resource.findOneAndDelete(req.params.id);
    res.status(200).json({ message: "Resource has been deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
