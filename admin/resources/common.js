const bcrypt = require("bcrypt");
const display = require("./display");
const sort = require("./sort");
const mongoose = { name: "Covidapp", icon: "SpineLabel" };
const { IsAdmin, IsSuperAdmin } = require("./permission");

module.exports = {
  ...sort,

  properties: {
    _id: {
      isVisible: {
        show: true,
        list: false,
        edit: false,
        filter: false,
      },
    },
    createdBy: {
      isVisible: {
        show: true,
        list: false,
        edit: false,
        filter: true,
      },
    },
    updatedBy: {
      isVisible: {
        show: true,
        list: false,
        edit: false,
        filter: true,
      },
    },
  },

  actions: {
    new: {
      showInDrawer: true,
      isAccessible: IsAdmin,
      before: async (request, { currentAdmin }) => {
        request.payload = {
          ...request.payload,
          createdBy: currentAdmin._id,
          updatedBy: currentAdmin._id,
        };

        return request;
      },
    },
    edit: {
      showInDrawer: true,
      isAccessible: IsAdmin,
      before: async (request, { currentAdmin }) => {
        request.payload = {
          ...request.payload,
          updatedBy: currentAdmin._id,
        };

        return request;
      },
    },
    delete: { isAccessible: IsSuperAdmin },
    show: {
      showInDrawer: true,
    },

    bulkDelete: {
      isAccessible: IsSuperAdmin,
    },
  },
};
