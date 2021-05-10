const Volunteer = require("../models/volunteer");
const bcrypt = require("bcrypt");

exports.index = async function (req, res) {
  const volunteers = await Volunteer.find({})
    .populate("superAdmin")
    .populate("city");
  res.status(200).json(volunteers);
};

exports.store = async (req, res, _) => {
  try {
    let { encryptedPassword, ...body } = req.body;
    encryptedPassword = await bcrypt.hash(encryptedPassword, 10);
    const volunteer = await Volunteer.create({
      encryptedPassword,
      ...body,
      role: "volunteer",
      isActive: false,
    });
    res.status(200).json(volunteer);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.show = async function (req, res) {
  try {
    const volunteer = await Volunteer.findById(req.params.id)
      .populate("superAdmin")
      .populate("city");

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
