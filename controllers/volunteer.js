const Volunteer = require("../models/volunteer");
const bcrypt = require("bcrypt");

exports.index = async function (req, res) {
  const volunteers = await Volunteer.find({})
    .populate("superAdmin")
    .populate("city")
    .populate("status");
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
      .populate("city")
      .populate("status");

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

exports.upload = async function (req, res) {
  const volunteer = await Volunteer.findById(req.body.volunteer);
  if (!volunteer) {
    res.status(401).json({ msg: "No Such User " });
    return;
  }

  let volunteers = [];
  const tempFile = req.files.resource.tempFilePath;
  fs.createReadStream(tempFile)
    .pipe(csv.parse())
    .on("error", (error) => console.error(error))
    .on("data", async (row) => {
      let [name, mobileNumber, email, password, role, cities] = row;
      password = await bcrypt.hash(password, 10);

      if (name != "" && name != "Name") {
        let citiesID = [];
        cities = cities.split("&").forEach(async (city) => {
          const c = await City.findOne({ name: city });
          if (c) {
            citiesID.push(c.id);
          }
        });

        volunteers.push({
          email: email,
          mobileNumber: mobileNumber,
          email: email,
          encryptedPassword: password,
          city: cities,
          createdBy: volunteer.id,
          superAdmin: volunteer.id,
          isActive: true,
          role: "volunteer",
        });
      }

      await Volunteer.create(volunteers);
    })
    .on("end", (rowCount) => console.log(`Parsed ${rowCount} rows`));

  fs.unlink(tempFile, (err) => {
    if (err) throw err;
    console.log(`${tempFile}was deleted`);
  });
  res.status(200).json({ msg: "data is successfully imported " });
};
