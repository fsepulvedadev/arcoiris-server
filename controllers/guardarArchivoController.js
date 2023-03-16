const Archivo = require("../model/Archivo");

const handleNewArchivo = async (req, res) => {
  /* const { name, size, path } = req.body; */
  const {
    autorPersonalAsientoPrincipal,
    autorPersonalAsientoSecundario,
    autorInstitucionalAsientoPrincipal,
    autorInstitucionalAsientoSecundario,
    conferencia,
    titulo,
    localizacionAccesoControl,
    publicacion,
    descripcionFisica,
    coleccion,
    terminoDeMateriaControlado,
    terminoDeMateriaGeografico,
    terminoDeMateriaPropuesto,
    terminoDeMateriaNombreDePersona,
    tema,
    notaGeneral,
    notaDeContenido,
    direccionElectronica,
    nivel,
    resumen,
  } = req.body;

  console.log(autorInstitucionalAsientoSecundario);

  try {
    const result = await Archivo.create({
      autorPersonalAsientoPrincipal,

      autorPersonalAsientoSecundario,
      autorInstitucionalAsientoPrincipal,
      autorInstitucionalAsientoSecundario,
      conferencia,
      titulo,
      publicacion,
      descripcionFisica,
      coleccion,
      terminoDeMateriaControlado,
      terminoDeMateriaGeografico,
      terminoDeMateriaPropuesto,
      terminoDeMateriaNombreDePersona,
      tema,
      notaGeneral,
      nivel,
      resumen,
      notaDeContenido,
      direccionElectronica,
      localizacionAccesoControl,
    });

    console.log(result);
    res.send(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

  /*   if (!name || !size || !path)
    return res.status(400).json({ message: "Faltan completar datos." });

  // check for duplicate usernames in the db
  const duplicate = await Archivo.findOne({ name: name }).exec();
  if (duplicate) return res.sendStatus(409); //Conflict

  try {
    //create and store the new user
    const result = await Archivo.create({
      name: name,
      size: size,
      path: path,
    });

    console.log(result);

    res.status(201).json({ success: `Nuevo archivo ${name} creado!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  } */
};

module.exports = { handleNewArchivo };
