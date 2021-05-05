const express = require("express");
const { check } = require("express-validator");
const multer = require("multer");

const ResourceType = require("../controllers/resource-type");
var upload = multer({ dest: "uploads/" });
const router = express.Router();
const apiKey = require("../middlewares/api-key");
router.get("/", ResourceType.index);
router.post("/", apiKey, ResourceType.store);
router.get("/:id", apiKey, ResourceType.show);
router.put("/:id", apiKey, ResourceType.update);
router.delete("/:id", apiKey, ResourceType.destroy);

module.exports = router;
