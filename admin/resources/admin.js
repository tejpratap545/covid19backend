const bcrypt = require("bcrypt");
const display = require("./display");
const sort = require("./sort");
const mongoose = { name: "Covidapp", icon: "SpineLabel" };
const { IsAdmin, IsSuperAdmin } = require("./permission");

module.exports = {
  ...sort,

  actions: {
    new: {
      showInDrawer: true,
      isAccessible: IsAdmin,
    },
    edit: {
      showInDrawer: true,
      isAccessible: IsAdmin,
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
