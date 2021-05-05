const express = require("express");
const { check } = require("express-validator");
const multer = require("multer");

const Volunteer = require("../controllers/status");
var upload = multer({ dest: "uploads/" });
const apiKey = require("../middlewares/api-key");
const router = express.Router();

router.get("/", Volunteer.index);
router.post("/", apiKey, Volunteer.store);
router.get("/:id", apiKey, Volunteer.show);
router.put("/:id", apiKey, Volunteer.update);
router.delete("/:id", apiKey, Volunteer.destroy);

module.exports = router;
