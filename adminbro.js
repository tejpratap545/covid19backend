// Requirements
const mongoose = require("mongoose");
const express = require("express");
const AdminBro = require("admin-bro");
const AdminBroExpressjs = require("@admin-bro/express");
const bcrypt = require("bcrypt");

// We have to tell AdminBro that we will manage mongoose resources with it
AdminBro.registerAdapter(require("@admin-bro/mongoose"));

// express server definition
const app = express();

// Resources definitions
const User = mongoose.model("User", {
  email: { type: String, required: true },
  encryptedPassword: { type: String, required: true },
  role: { type: String, enum: ["admin", "restricted"], required: true },
});

// Cars collection
const Cars = mongoose.model("Car", {
  name: String,
  color: { type: String, enum: ["black"], required: true }, // Henry Ford
  ownerId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

// RBAC functions
const canEditCars = ({ currentAdmin, record }) => {
  return (
    currentAdmin &&
    (currentAdmin.role === "admin" ||
      currentAdmin._id === record.param("ownerId"))
  );
};
const canModifyUsers = ({ currentAdmin }) =>
  currentAdmin && currentAdmin.role === "admin";

// Pass all configuration settings to AdminBro
const adminBro = new AdminBro({
  resources: [
    {
      resource: Cars,
      options: {
        properties: {
          ownerId: {
            isVisible: { edit: false, show: true, list: true, filter: true },
          },
        },
        actions: {
          edit: { isAccessible: canEditCars },
          delete: { isAccessible: canEditCars },
          new: {
            before: async (request, { currentAdmin }) => {
              request.payload = {
                ...request.payload,
                ownerId: currentAdmin._id,
              };
              return request;
            },
          },
        },
      },
    },
    {
      resource: User,
      options: {
        properties: {
          encryptedPassword: { isVisible: false },
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
          new: {
            before: async (request) => {
              if (request.payload.password) {
                console.log(request.payload);
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
          edit: { isAccessible: canModifyUsers },
          delete: { isAccessible: canModifyUsers },
          new: { isAccessible: canModifyUsers },
        },
      },
    },
  ],
  rootPath: "/admin",
});

const ADMIN = {
  email: process.env.ADMIN_EMAIL || "admin@covid.com",
  password: process.env.ADMIN_PASSWORD || "password",
  role: "admin",
};
// Build and use a router which will handle all AdminBro routes
const router = AdminBroExpressjs.buildAuthenticatedRouter(adminBro, {
  authenticate: async (email, password) => {
    if (ADMIN.password === password && ADMIN.email === email) {
      return ADMIN;
    }
    return null;
  },
  cookiePassword: "some-secret-password-used-to-secure-cookie",
});

app.use(adminBro.options.rootPath, router);

// Running the server
const run = async () => {
  await mongoose.connect("mongodb://localhost:27017/adminbrotest", {
    useNewUrlParser: true,
  });
  await app.listen(8002, () =>
    console.log(`Example app listening on port 8080!`)
  );
};

run();
