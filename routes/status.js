const express = require("express");
const { check } = require("express-validator");
const multer = require("multer");

const Status = require("../controllers/status");
var upload = multer({ dest: "uploads/" });
const router = express.Router();

router.get("/", Status.index);
router.post("/", Status.store);
router.get("/:id", Status.show);
router.put("/:id", Status.update);
router.delete("/:id", Status.destroy);

module.exports = router;
