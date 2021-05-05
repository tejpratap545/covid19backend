const express = require("express");
const { check } = require("express-validator");
const multer = require("multer");

const User = require("../controllers/user");
var upload = multer({ dest: "uploads/" });
const apiKey = require("../middlewares/api-key");
const router = express.Router();

router.get("/", User.index);
router.post("/", apiKey, User.store);
router.get("/:id", apiKey, User.show);
router.put("/:id", apiKey, User.update);
router.delete("/:id", apiKey, User.destroy);

module.exports = router;
