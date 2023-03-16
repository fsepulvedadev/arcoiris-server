const Archivo = require("../model/Archivo");
const fs = require("fs");

const handleBorrarArchivo = async (req, res) => {
  try {
    const borrado = await Archivo.findByIdAndDelete(req.query.id);
    console.log(borrado);
    const path = borrado.ubicacion;
    fs.unlink(path, (err) => {
      if (err) {
        console.log(err);
        res.send({
          status: "error",
          message: "Ha ocurrido un error, el archivo no ha sido borrado",
        });
        return;
      } else {
        res.send({
          status: "success",
          message: `El archivo ${borrado.file} ha sido borrado`,
        });
      }
    });
  } catch (e) {
    console.log("%cError al borrar", "color: yellow", e);
    res.send(500, {
      status: "error",
      message: "Ha ocurrido un error, el archivo no ha sido borrado",
    });
  }
};

module.exports = { handleBorrarArchivo };
