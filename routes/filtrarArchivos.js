const express = require("express");
const router = express.Router();
const buscarArchivoController = require("../controllers/buscarArchivoController");

router.get("/", buscarArchivoController.handleBuscarArchivo);

module.exports = router;
