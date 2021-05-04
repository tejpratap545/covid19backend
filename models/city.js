const mongoose = require("mongoose");

const CitySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: String,
  },
  { timestamps: true }
);

const city = mongoose.model("City", CitySchema);

module.exports = city;
