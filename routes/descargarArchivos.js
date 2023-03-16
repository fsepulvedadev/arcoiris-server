const express = require("express");
const router = express.Router();
const descargarArchivoController = require("../controllers/descargarArchivoController");

router.get("/:file", descargarArchivoController.handleDescargarArchivos);

module.exports = router;
