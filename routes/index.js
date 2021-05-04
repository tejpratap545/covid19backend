const user = require("./user");
const city = require("./city");
const resource = require("./resource");
const resourceType = require("./resource-type");
const volunteer = require("./volunteer");
const status = require("./status");
module.exports = (app) => {
  app.use("/api/user", user);
  app.use("/api/city", city);
  app.use("/api/resource", resource);
  app.use("/api/resource-type", resourceType);
  app.use("/api/volunteer", volunteer);
  app.use("/api/status", status);
};
