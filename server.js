const mongoose = require("mongoose");
const AdminBro = require("admin-bro");
const AdminBroExpress = require("@admin-bro/express");
const AdminBroOptions = require("./admin");
const express = require("express");
const app = express();

const adminBro = new AdminBro(AdminBroOptions);

const ADMIN = {
  email: process.env.ADMIN_EMAIL || "admin@covid.com",
  password: process.env.ADMIN_PASSWORD || "password",
};

const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  authenticate: async (email, password) => {
    if (ADMIN.password === password && ADMIN.email === email) {
      return ADMIN;
    }
    return null;
  },
  cookieName: "_session_id",
  cookiePassword: process.env.cookiePassword || "cookiePassword",
});

app.use(adminBro.options.rootPath, router);

require("./routes/index")(app);
const run = async () => {
  const mongooseConnection = await mongoose.connect(process.env.MONGO_URL);
  app.listen(8004);
};

run();
