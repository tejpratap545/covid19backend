const mongoose = require("mongoose");

const StatusSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const status = mongoose.model("Status", StatusSchema);

module.exports = status;
