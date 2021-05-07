const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    avatar: String,
    email: String,
    phoneNumber: String,
    city: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "City",
    },
    encryptedPassword: { type: String, required: true },
    role: {
      type: String,
      enum: ["superadmin", "admin", "volunteer"],
      required: true,
    },
    superAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const user = mongoose.model("User", UserSchema);

module.exports = user;
