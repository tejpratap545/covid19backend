const express = require("express");
const { check } = require("express-validator");
const multer = require("multer");

const Resource = require("../controllers/resource");
const router = express.Router();
const apiKey = require("../middlewares/api-key");

router.get("/", Resource.index);
router.post("/", apiKey, Resource.store);
router.get("/:id", apiKey, Resource.show);
router.put("/:id", apiKey, Resource.update);
router.delete("/:id", apiKey, Resource.destroy);

module.exports = router;
