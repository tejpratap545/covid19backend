const mongoose = require("mongoose");

const CitySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Volunteer",
    },
  },
  {
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.__v;

        return ret;
      },
    },
  },
  { timestamps: true }
);

const city = mongoose.model("City", CitySchema);
module.exports.CitySchema = CitySchema;
module.exports = city;
