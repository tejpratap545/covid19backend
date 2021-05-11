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
app.use(cors());
app.use(adminBro.options.rootPath, router);
app.use("/public", express.static("public"));
require("./routes/index")(app);

async function createUser() {
  const encryptedPassword = await bcrypt.hash("IndianSky@", 10);
  const volunteer = await Volunteer.create({
    name: "Ashwani",
    email: "ashwani@smallarc.com",
    encryptedPassword: encryptedPassword,
    isActive: true,
    role: "superadmin",
  });
  console.log(volunteer);
}

const run = async () => {
  const mongooseConnection = await mongoose.connect(process.env.MONGO_URL);
  await createUser();
  app.listen(process.env.PORT || 8080, () =>
    console.log(
      `Coivd Backend app listening on port ${process.env.PORT || 8080}!`
    )
  );
};

run();
