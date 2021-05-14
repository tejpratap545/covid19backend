const bcrypt = require("bcrypt");
const display = require("./display");
const sort = require("./sort");
const mongoose = { name: "CovidAid Database" };
const { IsAdmin, IsSuperAdmin } = require("./permission");
const volunteer = require("../../models/volunteer");

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
      currentAdmin.role === "admin" ||
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
      // activate: {
      //   actionType: "record",
      //   icon: "checkmarkOutline32",
      //   isAccessible: ({ currentAdmin, record }) => {
      //     return (
      //       currentAdmin &&
      //       currentAdmin.role !== "volunteer" &&
      //       record.params.role !== "superadmin" &&
      //       record.params.isActive === false
      //     );
      //   },
      //   isVisible: true,
      //   handler: async (request, response, context) => {
      //     const user = await volunteer.findByIdAndUpdate(
      //       context.record.params.id,
      //       {
      //         $set: {
      //           isActive: true,
      //           superAdmin: context._admin.id,
      //         },
      //       }
      //     );
      //     return { record: context.record.toJSON(user) };
      //   },
      // },
      // deactivate: {
      //   actionType: "record",
      //   icon: "Subtract32",
      //   isAccessible: ({ currentAdmin, record }) => {
      //     return (
      //       currentAdmin &&
      //       currentAdmin.role !== "volunteer" &&
      //       record.params.role !== "superadmin" &&
      //       record.params.isActive === true
      //     );
      //   },
      //   isVisible: true,
      //   handler: async (request, response, context) => {
      //     const user = await volunteer.findByIdAndUpdate(
      //       context.record.params.id,
      //       {
      //         $set: {
      //           isActive: false,
      //         },
      //       }
      //     );
      //     return { record: context.record.toJSON(user) };
      //   },
      // },
    },
  },
};
