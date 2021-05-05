const express = require("express");
const { check } = require("express-validator");
const multer = require("multer");

const Status = require("../controllers/status");
var upload = multer({ dest: "uploads/" });
const apiKey = require("../middlewares/api-key");
const router = express.Router();

router.get("/", Status.index);
router.post("/", apiKey, Status.store);
router.get("/:id", apiKey, Status.show);
router.put("/:id", apiKey, Status.update);
router.delete("/:id", apiKey, Status.destroy);

module.exports = router;
