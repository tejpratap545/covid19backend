const express = require("express");
const { check } = require("express-validator");
const multer = require("multer");

const Resource = require("../controllers/resource");
var upload = multer({ dest: "uploads/" });
const router = express.Router();

router.get("/", Resource.index);
router.post("/", Resource.store);
router.get("/:id", Resource.show);
router.put("/:id", Resource.update);
router.delete("/:id", Resource.destroy);

module.exports = router;
