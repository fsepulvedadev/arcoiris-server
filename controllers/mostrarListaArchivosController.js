const Archivo = require("../model/Archivo");

const handleMostrarArchivos = async (req, res) => {
  if (req.query.total === "true") {
    const total = await Archivo.countDocuments({});
    return res.send({ total });
  } else {
    const todos = await Archivo.find();

    res.send(todos);
  }
};

module.exports = { handleMostrarArchivos };
