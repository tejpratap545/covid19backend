const User = require("../models/user");

exports.index = async function (req, res) {
  const users = await User.find({});
  res.status(200).json({ users });
};

exports.store = async (req, res, _) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (user)
      return res.status(401).json({
        message:
          "The email address you have entered is already associated with another account. You can change this users role instead.",
      });
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.show = async function (req, res) {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(401).json({ message: "User does not exist" });

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.update = async function (req, res) {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(202).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.destroy = async function (req, res) {
  try {
    await User.findOneAndDelete(req.params.id);
    res.status(200).json({ message: "User has been deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
