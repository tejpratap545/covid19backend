const user = require("./user");
const city = require("./city");
const helpdesk = require("./helpdesk");
const resource = require("./resource");
const resourceType = require("./resource-type");
const volunteer = require("./volunteer");
const status = require("./status");
const apiKey = require("../middlewares/api-key");
var bodyParser = require("body-parser");

module.exports = (app) => {
  app.use(bodyParser.json());
  app.use("/api/user", user);
  app.use("/api/city", city); 
  app.use("/api/helpdesk", helpdesk);
  app.use("/api/resource", resource);
  app.use("/api/resource-type", resourceType);
  app.use("/api/volunteer", volunteer);
  app.use("/api/status", status);
};
