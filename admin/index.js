const AdminBro = require("admin-bro");
const AdminBroMongoose = require("@admin-bro/mongoose");
const upload = require("./resources/upload");
AdminBro.registerAdapter(AdminBroMongoose);
const display = require("./resources/display");
const sort = require("./resources/sort");
const mongoose = { name: "Covidapp" };

const HelpDeskSchema = require("../models/helpdesk");
const CitySchema = require("../models/city");
const ResourceSchema = require("../models/resource");
const ResourceTypeSchema = require("../models/resourceType");
const VolunteerSchema = require("../models/volunteer");
const StatusSchema = require("../models/status");

const uploadFeature = require("@admin-bro/upload");
const path = require("path");
const common = require("./resources/common");

const volunteer = require("./resources/volunteer");
const resource = require("./resources/resource");

module.exports = {
  resources: [
    {
      resource: HelpDeskSchema,
      options: { parent: mongoose, ...common },
    },
    {
      resource: CitySchema,
      options: { parent: mongoose, ...common },
    },
    {
      resource: StatusSchema,
      options: { parent: mongoose, ...common },
    },
    {
      resource: ResourceSchema,
      ...resource,
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
      resource: ResourceTypeSchema,
      options: { parent: mongoose, ...common },
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
    softwareBrothers: false,
    logo: "",
  },
  pages: {},
  locale: {
    translations: {
      labels: {
        loginWelcome: "CovidAid Admin",
      },
      messages: {
        loginWelcome: "Login to covidaid Admin Dashboard",
      },
    },
  },
  dashboard: {
    handler: async () => {
      return { some: "output" };
    },
    component: AdminBro.bundle("./components/dashboard"),
  },
};
