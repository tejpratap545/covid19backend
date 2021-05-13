const City = require("../models/helpdesk");
const Volunteer = require("../models/volunteer");
const Status = require("../models/status");

exports.index = async function (req, res) {
  const cities = await City.find({});
  res.status(200).json({ cities });
};

exports.join = async function (req, res) {
  try {
    let helpdesk = await City.findById(req.params.helpdeskid)
    let status = await Status.findOne({ name: "INACTIVE" });

    if (!status) {
      status = await Status.create({ name: "INACTIVE" });
    }

    const volunteer = await Volunteer.updateOne(
      { _id: req.params.userid },
      {
        status: status.id,
        superAdmin: helpdesk.createdBy,
      }
    );

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.store = async (req, res, _) => {
  try {
    const city = await City.create(req.body);
    res.status(201).json(city);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.show = async function (req, res) {
  try {
    const city = await City.findById(req.params.id);

    if (!city)
      return res.status(401).json({ message: "Helpdesk does not exist" });

    res.status(200).json({ city });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.update = async function (req, res) {
  try {
    const city = await City.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(202).json(city);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.destroy = async function (req, res) {
  try {
    await City.findOneAndDelete(req.params.id);
    res.status(200).json({ message: "Helpdesk has been deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
