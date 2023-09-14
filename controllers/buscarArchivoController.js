const Archivo = require("../model/Archivo");

const handleBuscarArchivo = async (req, res) => {
  const { busqueda, campo } = req.query;
  console.log(busqueda);

  let encontrado;
  if (busqueda === "") {
    return res.status(400).json({});
  } else {
    const regex = new RegExp(busqueda, "i");

    switch (campo) {
      case "titulo":
        encontrado = await Archivo.find({ "titulo.titulo": regex });
        break;
      case "autor":
        encontrado = await Archivo.find({
          "autorPersonalAsientoPrincipal.autor": regex,
        });
        break;
      case "tema":
        encontrado = await Archivo.find({ "tema.tema": regex });
        break;
      case "lugar":
        encontrado = await Archivo.find({
          publicacion: {
            $elemMatch: {
              lugar: regex,
            },
          },
        });
        break;
      case "coleccion":
        encontrado = await Archivo.find({
          coleccion: {
            $elemMatch: {
              titulo: regex,
            },
          },
        });
        break;
      case "nombre":
        encontrado = await Archivo.find({
          terminoDeMateriaNombreDePersona: {
            $elemMatch: {
              nombre: regex,
            },
          },
        });
        break;
      case "nivel":
        encontrado = await Archivo.find({
          nivel: {
            $elemMatch: {
              nivel: regex,
            },
          },
        });
        break;
      case "fecha":
        encontrado = await Archivo.find({
          publicacion: {
            $elemMatch: {
              fecha: new Date(busqueda),
            },
          },
        });
        break;
      default:
        return res.status(400).json({});
    }

    console.log(encontrado);

    res.send(encontrado);
  }
};

module.exports = { handleBuscarArchivo };
