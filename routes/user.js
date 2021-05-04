const express = require("express");
const { check } = require("express-validator");
const multer = require("multer");

const User = require("../controllers/user");
var upload = multer({ dest: "uploads/" });
const router = express.Router();

router.get("/", User.index);
router.post("/", User.store);
router.get("/:id", User.show);
router.put("/:id", User.update);
router.delete("/:id", User.destroy);

module.exports = router;
