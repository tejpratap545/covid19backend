const Status = require("../models/status");

exports.index = async function (req, res) {
  const cities = await Status.find({});
  res.status(200).json({ cities });
};

exports.store = async (req, res, _) => {
  try {
    const status = await Status.create(req.body);
    res.status(201).json(status);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.show = async function (req, res) {
  try {
    const status = await Status.findById(req.params.id);

    if (!status)
      return res.status(401).json({ message: "Status does not exist" });

    res.status(200).json({ status });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.update = async function (req, res) {
  try {
    const status = await Status.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(202).json(status);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.destroy = async function (req, res) {
  try {
    await Status.findOneAndDelete(req.params.id);
    res.status(200).json({ message: "Status has been deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
