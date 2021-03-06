const mongoose = require("mongoose");

const ResourceTypeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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

const resourceType = mongoose.model("ResourceType", ResourceTypeSchema);

module.exports = resourceType;
