const express = require("express");
const router = express.Router();
const borrarArchivoController = require("../controllers/borrarArchivoController");

router.delete("/", borrarArchivoController.handleBorrarArchivo);

module.exports = router;
