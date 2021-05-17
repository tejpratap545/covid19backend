const bcrypt = require("bcrypt");
const display = require("./display");
const sort = require("./sort");
const mongoose = { name: "CovidAid Database" };
const { IsAdmin, IsSuperAdmin } = require("./permission");
const volunteer = require("../../models/volunteer");

// const canDoResources = ({ currentAdmin, record }) => {
//   let result =
//     currentAdmin &&
//     (currentAdmin.role === "superadmin" ||
//       currentAdmin._id === record.param("_id"));

//   //   not work  volunteer -> admin can edit / delete resources
//   if (!result && record.param("createdBy")) {
//     volunteer
//       .findById(record.param("createdBy"))
//       .populate("superAdmin")
//       .exec((err, user) => {
//         if (user != null) {
//           if (user.superAdmin != null) {
//             result = user.superAdmin.id === currentAdmin._id;
//           }
//         }
//       });
      
//       result = record.param("createdBy") === currentAdmin._id;
//   }

//   return result;
// };

module.exports = {
  options: {
    parent: mongoose,
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
          filter: false,
        },
      },
      updatedBy: {
        isVisible: {
          show: true,
          list: false,
          edit: false,
          filter: false,
        },
      },
    },

    actions: {
      show: {
        showInDrawer: true,
      },
      new: {
        showInDrawer: true,

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
        isAccessible: true,
        before: async (request, { currentAdmin }) => {
          request.payload = {
            ...request.payload,
            updatedBy: currentAdmin._id,
          };

          return request;
        },
      },
      delete: { isAccessible: true },

      bulkDelete: {
        isAccessible: IsSuperAdmin,
      },
    },
  },
};
