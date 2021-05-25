const mongoose = require("mongoose");

const StatusSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      required: true,
      default: 1,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Volunteer",
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Volunteer",
    },
  },
  { timestamps: true },
  {
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.__v;
        return ret;
      },
    },
  }
);

const status = mongoose.model("Status", StatusSchema);

module.exports = status;
