const express = require("express");
const router = express.Router();
const guardarArchivoController = require("../controllers/guardarArchivoController");

router.post("/", guardarArchivoController.handleNewArchivo);

module.exports = router;
