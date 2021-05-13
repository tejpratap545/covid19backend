const express = require("express");
const { check } = require("express-validator");
const multer = require("multer");

const HelpDesk = require("../controllers/helpdesk");
const router = express.Router();
const apiKey = require("../middlewares/api-key");

router.get("/", HelpDesk.index);
router.get("/:helpdeskid-:userid", HelpDesk.join);
router.post("/", apiKey, HelpDesk.store);
router.get("/:id", apiKey, HelpDesk.show);
router.put("/:id", apiKey, HelpDesk.update);
router.delete("/:id", apiKey, HelpDesk.destroy); 

module.exports = router;