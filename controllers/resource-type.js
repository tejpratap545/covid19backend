const ResourceType = require("../models/resourceType");

exports.index = async function (req, res) {
  const cities = await ResourceType.find({});
  res.status(200).json({ cities });
};

exports.store = async (req, res, _) => {
  try {
    const resourceType = await ResourceType.create(req.body);
    res.status(201).json(resourceType);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.show = async function (req, res) {
  try {
    const resourceType = await ResourceType.findById(req.params.id);

    if (!resourceType)
      return res.status(401).json({ message: "ResourceType does not exist" });

    res.status(200).json({ resourceType });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.update = async function (req, res) {
  try {
    const resourceType = await ResourceType.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(202).json(resourceType);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.destroy = async function (req, res) {
  try {
    await ResourceType.findOneAndDelete(req.params.id);
    res.status(200).json({ message: "ResourceType has been deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
