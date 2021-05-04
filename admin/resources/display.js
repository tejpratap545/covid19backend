const { sort, timestamps } = require("./sort");
const path = require("path");
const uploadFeature = require("@admin-bro/upload");
module.exports = {
  sort,
  actions: {
    show: {
      showInDrawer: true,
    },
    edit: {
      showInDrawer: true,
    },
    new: {
      showInDrawer: true,
    },
  },
  properties: {
    ...timestamps,
  },
};
