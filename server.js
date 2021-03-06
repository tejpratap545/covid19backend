const mongoose = require("mongoose");
const AdminBro = require("admin-bro");
const AdminBroExpress = require("@admin-bro/express");
const AdminBroOptions = require("./admin");
const express = require("express");
const app = express();
const cors = require("cors");
const adminBro = new AdminBro(AdminBroOptions);
const bcrypt = require("bcrypt");
const Volunteer = require("./models/volunteer");
const fileUpload = require("express-fileupload");
require("dotenv").config();

const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  authenticate: async (email, password) => {
    conditions = [{ email: email }, { mobileNumber: email }];

    if (mongoose.Types.ObjectId.isValid(email)) conditions.push({ _id: email });

    const user = await Volunteer.findOne({
      $or: conditions,
    }).populate("superAdmin");
    if (user) {
      const matched = await bcrypt.compare(password, user.encryptedPassword);
      if (matched) {
        return user;
      }
      return false;
    }
    return false;
  },
  cookiePassword: process.env.cookiePassword || "cookiePassword",
});
app.use(
  cors({
    origin: "*",
  })
);

app.use(adminBro.options.rootPath, router);
app.use(fileUpload({ useTempFiles: true }));
app.use("/public", express.static("public"));
require("./routes/index")(app);

const run = async () => {
  const mongooseConnection = await mongoose.connect(process.env.MONGO_URL);

  app.listen(process.env.PORT || 8080, () =>
    console.log(
      `Coivd Backend app listening on port ${process.env.PORT || 8080}!`
    )
  );
};

run();
