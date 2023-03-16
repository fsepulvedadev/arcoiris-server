require("dotenv").config();
const Archivo = require("./model/Archivo");
const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const cors = require("cors");
const filesPayloadExists = require("./middleware/filesPayloadExists");
const fileSizeLimiter = require("./middleware/fileSizeLimiter");
const fileExtLimiter = require("./middleware/fileExtLimiter");
const connectDB = require("./config/dbConn");
const mongoose = require("mongoose");
const app = express();
const corsOptions = require("./config/corsOptions");
const PORT = process.env.PORT || 3000;
mongoose.set("strictQuery", false);

connectDB();

app.use(cors());

app.use(express.json());

// rutas

app.use("/agregar", require("./routes/agregar"));
app.use("/buscar", require("./routes/filtrarArchivos"));
app.use("/archivos", require("./routes/mostrarTodos"));
app.use("/borrar", require("./routes/borrarArchivo.js"));
app.use("/descargar", require("./routes/descargarArchivos.js"));

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post(
  "/upload",
  fileUpload({ createParentPath: true }),
  filesPayloadExists,
  fileExtLimiter([
    ".png",
    ".PNG",
    ".jpg",
    ".jpeg",
    ".pdf",
    ".doc",
    ".docx",
    ".mp4",
  ]),
  fileSizeLimiter,

  async (req, res) => {
    for (const element in req.body) {
      console.log(JSON.parse(req.body[element]));
    }
    for (const key in req.body) {
      // Verificar si el valor de la propiedad es un string JSON
      if (
        typeof req.body[key] === "string" /* &&
        req.body[key].startsWith("{") &&
        req.body[key].endsWith("}") */
      ) {
        // Parsear el string JSON y reemplazar el valor de la propiedad con el objeto resultante
        req.body[key] = JSON.parse(req.body[key]);
      }
    }

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

    const files = req.files;

    Object.keys(files).forEach(async (key) => {
      const filepath = path.join(__dirname, "files", files[key].name);

      try {
        const duplicado = await Archivo.findOne({
          archivo: files[key].name,
        });
        if (duplicado) {
          console.log("duplicado", duplicado);
          return res.status(409).json({
            status: "error",
            message: `El archivo ${duplicado.archivo} ya se encuentra en la base de datos.`,
          }); //Conflict
        }

        const result = await Archivo.create({
          autorPersonalAsientoPrincipal,
          archivo: files[key].name,
          ubicacion: filepath,
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

        files[key].mv(filepath, (err) => {
          if (err)
            return res.status(500).json({ status: "error", message: err });
        });
        return res.json({
          status: "success",
          message: files[key].name + " subido exitosamente",
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
      }
    });
  }
);
