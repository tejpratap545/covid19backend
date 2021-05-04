const express = require("express");
const { check } = require("express-validator");
const multer = require("multer");

const ResourceType = require("../controllers/resource-type");
var upload = multer({ dest: "uploads/" });
const router = express.Router();

router.get("/", ResourceType.index);
router.post("/", ResourceType.store);
router.get("/:id", ResourceType.show);
router.put("/:id", ResourceType.update);
router.delete("/:id", ResourceType.destroy);

module.exports = router;
