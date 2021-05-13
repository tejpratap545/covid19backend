const express = require("express");
const { check } = require("express-validator");
const multer = require("multer");

const Volunteer = require("../controllers/volunteer");
var upload = multer({ dest: "uploads/" });
const apiKey = require("../middlewares/api-key");
const router = express.Router();

router.get("/", Volunteer.index);
router.get("/:id", apiKey, Volunteer.updateRole);

router.post("/", apiKey, Volunteer.store);
router.get("/:id", Volunteer.show);
router.put("/:id", apiKey, Volunteer.update);
router.delete("/:id", apiKey, Volunteer.destroy);

module.exports = router;
