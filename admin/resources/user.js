const bcrypt = require("bcrypt");
const display = require("./display");
const sort = require("./sort");
const uploadFeature = require("@admin-bro/upload");
const path = require("path");
const mongoose = { name: "mongooseResources", icon: "SpineLabel" };
module.exports = {
  options: {
    properties: {
      encryptedPassword: { isVisible: false },
      password: {
        type: "string",
        isVisible: {
          list: false,
          edit: true,
          filter: false,
          show: false,
        },
      },
    },
    actions: {
      new: {
        before: async (request) => {
          if (request.payload.password) {
            request.payload = {
              ...request.payload,
              encryptedPassword: await bcrypt.hash(
                request.payload.password,
                10
              ),
              password: undefined,
            };
          }
          return request;
        },
      },
    },
  },

  features: [
    uploadFeature({
      provider: { local: { bucket: path.join(__dirname, "../../public") } },
      properties: {
        key: "avatar",
      },
    }),
  ],
};
