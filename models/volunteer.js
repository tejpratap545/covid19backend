const mongoose = require("mongoose");
const validator = require("validator");
const VolunteerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mobileNumber: String,
    email: String,
    status: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Status",
      required: true,
    },
    encryptedPassword: { type: String, required: true },
    role: {
      type: String,
      enum: ["superadmin", "admin", "dataentry", "volunteer"],
      required: true,
    },
    superAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Volunteer",
    },
    city: [{ type: mongoose.Schema.Types.ObjectId, ref: "City" }],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Volunteer",
    },
    isActive: Boolean,
    otherProperties: {
      type: Object,
    },
  },
  {
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.__v;
        delete ret.encryptedPassword;
        return ret;
      },
    },
  },
  { timestamps: true }
);

const volunteer = mongoose.model("Volunteer", VolunteerSchema);

module.exports = volunteer;
