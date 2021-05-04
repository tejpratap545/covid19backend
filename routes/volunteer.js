const express = require("express");
const { check } = require("express-validator");
const multer = require("multer");

const Volunteer = require("../controllers/status");
var upload = multer({ dest: "uploads/" });
const router = express.Router();

router.get("/", Volunteer.index);
router.post("/", Volunteer.store);
router.get("/:id", Volunteer.show);
router.put("/:id", Volunteer.update);
router.delete("/:id", Volunteer.destroy);

module.exports = router;
