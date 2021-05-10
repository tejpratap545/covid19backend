const bcrypt = require("bcrypt");
const display = require("./display");
const sort = require("./sort");
const mongoose = { name: "Covidapp", icon: "SpineLabel" };
const { IsAdmin, IsSuperAdmin } = require("./permission");
const canDeleteVolunteers = ({ currentAdmin, record }) => {
  return (
    currentAdmin &&
    (currentAdmin.role === "superadmin" ||
      currentAdmin._id === record.param("superAdmin"))
  );
};

// can edit by volunteer ,  volunteer Admin and superadmin
const canEditVolunteers = ({ currentAdmin, record }) => {
  return (
    currentAdmin &&
    (currentAdmin.role === "superadmin" ||
      currentAdmin._id === record.param("superAdmin") ||
      currentAdmin._id === record.param("_id"))
  );
};

module.exports = {
  options: {
    parent: mongoose,
    ...sort,
    properties: {
      encryptedPassword: { isVisible: false },

      _id: {
        isVisible: {
          show: true,
          list: false,
          edit: false,
          filter: false,
        },
      },
      createdBy: {
        isVisible: { show: true, list: true, edit: false, filter: true },
      },

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
      list: {
        isAccessible: IsAdmin,
      },
      new: {
        showInDrawer: true,
        isAccessible: IsAdmin,
        before: async (request, { currentAdmin }) => {
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

          request.payload = {
            ...request.payload,
            createdBy: currentAdmin._id,
          };
          return request;
        },
      },
      edit: {
        showInDrawer: true,
        isAccessible: canEditVolunteers,
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
      delete: { isAccessible: canDeleteVolunteers },
      show: {
        showInDrawer: true,
      },
      bulkDelete: {
        isAccessible: IsSuperAdmin,
      },
    },
  },
};
