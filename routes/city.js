const express = require("express");
const { check } = require("express-validator");
const multer = require("multer");

const City = require("../controllers/city");
var upload = multer({ dest: "uploads/" });
const router = express.Router();

router.get("/", City.index);
router.post("/", City.store);
router.get("/:id", City.show);
router.put("/:id", City.update);
router.delete("/:id", City.destroy);

module.exports = router;
