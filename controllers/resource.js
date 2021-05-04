const Resource = require("../models/resource");

exports.index = async function (req, res) {
  const Resources = await Resource.find({});
  res.status(200).json({ Resources });
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
