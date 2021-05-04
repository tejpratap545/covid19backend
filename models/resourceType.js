const mongoose = require("mongoose");

const ResourceTypeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: String,
  },
  { timestamps: true }
);

const resourceType = mongoose.model("ResourceType", ResourceTypeSchema);

module.exports = resourceType;
