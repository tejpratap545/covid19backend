const mongoose = require("mongoose");

const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
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

    image: String,

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Volunteer",
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Volunteer",
    },
    otherProperties: {
      type: Object,
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
ResourceSchema.plugin(aggregatePaginate);
ResourceSchema.index({ name: 1, address: 1 }); // schema level
const Resource = mongoose.model("Resource", ResourceSchema);

module.exports = Resource;
