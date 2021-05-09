const bcrypt = require("bcrypt");
const display = require("./display");
const sort = require("./sort");
const mongoose = { name: "Covidapp", icon: "SpineLabel" };
module.exports = {
  options: {
    parent: mongoose,
    ...sort,
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
        showInDrawer: true,
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
      edit: {
        showInDrawer: true,
        before: async (request) => {
          console.log(request.payload);
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
      show: {
        showInDrawer: true,
      },
    },
  },
};
