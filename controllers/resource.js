const Resource = require("../models/resource");
const { ObjectId } = require("mongodb");
const Status = require("../models/status");
const csv = require("@fast-csv/parse");
const fs = require("fs");
const Volunteer = require("../models/volunteer");
const City = require("../models/city");
const ResourceType = require("../models/resourceType");
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
    let status = await Status.findOne({ name: "PENDING" });

    if (!status) {
      status = await Status.create({ name: "PENDING" });
    }
    const resource = await Resource.create({
      ...req.body,
      status: status.id,
    });
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

exports.upload = async function (req, res) {
  const volunteer = await Volunteer.findById(req.body.volunteer);
  if (!volunteer) {
    res.status(401).json({ msg: "No Such User " });
    return;
  }
  let status = await Status.findOne({ name: "PENDING" });

  if (!status) {
    status = await Status.create({ name: "PENDING" });
  }
  let resources = [];
  const tempFile = req.files.resource.tempFilePath;
  let otherProperties = [];
  fs.createReadStream(tempFile)
    .pipe(csv.parse())
    .on("error", (error) => console.error(error))
    .on("data", async (row) => {
      let [name, resourceType, address, city, mobileNumbers, ...otherData] =
        row;

      mobileNumbers = mobileNumbers.split("&");
      if (name == "Name") {
        otherProperties = otherData;
      }

      if (name != "" && name != "Name") {
        city = await City.findOne({ name: city });
        resourceType = await ResourceType.findOne({ name: resourceType });
        if (!city || !resourceType) {
          console.log(`no city or resource type with name ${row[3]} ${row[4]}`);
        } else {
          let data = {
            name: name,
            resourceType: resourceType,
            address: address,
            city: city.id,
            mobileNumbers: mobileNumbers,
            status: status.id,
            createdBy: volunteer.id,
          };
          if (otherProperties != undefined) {
            var otherProperty = {};
            for (let index = 0; index < otherProperties.length; index++) {
              otherProperty[otherProperties[index]] = otherData[index];
            }

            data = { ...data, otherProperties: otherProperty };
          }
          console.log(data);

          resources.push(data);
        }
      }

      await Resource.create(resources);
    })
    .on("end", (rowCount) => console.log(`Parsed ${rowCount} rows`));

  fs.unlink(tempFile, (err) => {
    if (err) throw err;
    console.log(`${tempFile}was deleted`);
  });
  res.status(200).json({ msg: "data is successfully imported " });
};
