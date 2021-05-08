const AdminBro = require("admin-bro");
const AdminBroMongoose = require("@admin-bro/mongoose");
const upload = require("./resources/upload");
AdminBro.registerAdapter(AdminBroMongoose);
const display = require("./resources/display");
const sort = require("./resources/sort");
const mongoose = { name: "Covidapp", icon: "SpineLabel32" };
const CitySchema = require("../models/city");
const ResourceSchema = require("../models/resource");
const ResourceTypeSchema = require("../models/resourceType");
const VolunteerSchema = require("../models/volunteer");
const StatusSchema = require("../models/status");
const uploadFeature = require("@admin-bro/upload");
const path = require("path");

const volunteer = require("./resources/volunteer");
module.exports = {
  resources: [
    {
      resource: CitySchema,
      options: { parent: mongoose, ...sort, ...display, ...upload },
      features: [
        uploadFeature({
          provider: { local: { bucket: path.join(__dirname, "../public") } },
          properties: {
            key: "image",
          },
        }),
      ],
    },
    {
      resource: StatusSchema,
      options: { parent: mongoose, ...sort, ...display, ...upload },
    },
    {
      resource: ResourceSchema,
      options: { parent: mongoose, ...sort, ...display, ...upload },
    },
    {
      resource: ResourceTypeSchema,
      options: { parent: mongoose, ...sort, ...display, ...upload },
    },
    {
      resource: VolunteerSchema,
      ...volunteer,
    },
  ],
  version: {
    admin: true,
    app: "1.2.3-beta",
  },
  branding: {
    companyName: "Covid Help Care ",
  },
  pages: {},
  dashboard: {
    handler: async () => {
      return { some: "output" };
    },
    component: AdminBro.bundle("./components/dashboard"),
  },
};
