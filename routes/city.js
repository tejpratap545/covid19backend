const express = require("express");
const { check } = require("express-validator");
const multer = require("multer");

const City = require("../controllers/city");
var upload = multer({ dest: "uploads/" });
const router = express.Router();
const apiKey = require("../middlewares/api-key");
router.get("/", City.index);
router.post("/", apiKey, City.store);
router.get("/:id", apiKey, City.show);
router.put("/:id", apiKey, City.update);
router.delete("/:id", apiKey, City.destroy);

module.exports = router;
