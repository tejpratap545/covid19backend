const Volunteer = require("../models/volunteer");

exports.index = async function (req, res) {
  const cities = await Volunteer.find({});
  res.status(200).json({ cities });
};

exports.store = async (req, res, _) => {
  try {
    const volunteer = await Volunteer.create(req.body);
    res.status(201).json(volunteer);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.show = async function (req, res) {
  try {
    const volunteer = await Volunteer.findById(req.params.id);

    if (!volunteer)
      return res.status(401).json({ message: "Volunteer does not exist" });

    res.status(200).json({ volunteer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.update = async function (req, res) {
  try {
    const volunteer = await Volunteer.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(202).json(volunteer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.destroy = async function (req, res) {
  try {
    await Volunteer.findOneAndDelete(req.params.id);
    res.status(200).json({ message: "Volunteer has been deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
