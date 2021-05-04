const mongoose = require("mongoose");
const validator = require("validator");
const VolunteerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: String,
    mobileNumber: String,
    status: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Status",
    },
  },
  { timestamps: true }
);

const volunteer = mongoose.model("Volunteer", VolunteerSchema);

module.exports = volunteer;
