const express = require("express");
const router = express.Router();
const mostrarListaArchivosController = require("../controllers/mostrarListaArchivosController");

router.get("/", mostrarListaArchivosController.handleMostrarArchivos);

module.exports = router;
