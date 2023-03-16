const Archivo = require("../model/Archivo");

const handleBuscarArchivo = async (req, res) => {
  const { name } = req.query;
  console.log(name);

  let encontrado;
  if (name === "") {
    encontrado = await Archivo.find();
    res.send(encontrado);
  } else {
    const regex = new RegExp(name, "i");
    encontrado = await Archivo.find({ archivo: regex });

    res.send(encontrado);
  }
};

module.exports = { handleBuscarArchivo };
