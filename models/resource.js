const { json } = require("express");
const mongoose = require("mongoose");
const validator = require("validator");
const ResourceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    resourceType: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "ResourceType",
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "City",
    },
    mobileNumbers: {
      type: Array,
      required: true,
    },
    status: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Status",
    },
    otherProperties: {
      type: Object,
    },
  },
  { timestamps: true }
);

const Resource = mongoose.model("Resource", ResourceSchema);

module.exports = Resource;
