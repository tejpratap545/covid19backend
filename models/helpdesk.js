const mongoose = require("mongoose");

const HelpDeskSchema = mongoose.Schema(
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

const helpdesk = mongoose.model("HelpDesk", HelpDeskSchema);
module.exports.HelpDeskSchema = HelpDeskSchema;
module.exports = helpdesk;
