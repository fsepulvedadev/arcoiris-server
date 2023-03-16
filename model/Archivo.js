const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const archivoSchema = new Schema({
  archivo: String,
  ubicacion: String,
  autorPersonalAsientoPrincipal: {
    autor: {
      type: String,
      required: true,
    },
  },
  autorPersonalAsientoSecundario: [
    {
      autor: { type: String },
      function: { type: String },
    },
  ],

  autorInstitucionalAsientoPrincipal: [
    {
      entidad: {
        type: String,
      },
      entidadSubordinada: {
        type: String,
      },
      sigla: {
        type: String,
      },
    },
  ],
  autorInstitucionalAsientoSecundario: [
    {
      entidad: String,
      entidadSubordinada: String,
      sigla: String,
    },
  ],
  conferencia: {
    conferencia: {
      type: String,
    },
    numero: {
      type: Number,
    },
    fecha: {
      type: Date,
    },
    lugar: {
      type: String,
    },
  },
  titulo: {
    titulo: {
      type: String,
    },
    numero: {
      type: Number,
    },
    dgm: {
      type: String,
      enum: ["Local", "Remoto"],
      required: true,
    },
    subtitulo: {
      type: String,
      unique: true,
    },
  },
  publicacion: [
    {
      lugar: {
        type: String,
      },
      editor: {
        type: String,
      },
      fecha: {
        type: Date,
      },
    },
  ],
  descripcionFisica: [
    {
      extensionDEM: {
        type: String,
      },
    },
  ],
  coleccion: [
    {
      titulo: {
        type: String,
      },
      subserie: {
        type: String,
      },
      volumen: {
        type: String,
      },
    },
  ],
  terminoDeMateriaControlado: [
    {
      terminoControlado: {
        type: String,
      },
    },
  ],
  terminoDeMateriaGeografico: [
    {
      terminoDeMateriaGeografico: {
        type: String,
      },
    },
  ],
  terminoDeMateriaPropuesto: [
    {
      terminoPropuesto: {
        type: String,
      },
    },
  ],
  terminoDeMateriaNombreDePersona: [
    {
      nombre: {
        type: String,
      },
    },
  ],
  tema: {
    tema: {
      type: String,
    },
  },
  notaGeneral: [
    {
      nota: {
        type: String,
      },
    },
  ],
  nivel: [
    {
      nivel: {
        type: String,
      },
    },
  ],
  resumen: [
    {
      resumen: {
        type: String,
      },
    },
  ],
  direccionElectronica: [
    {
      nombre: {
        type: String,
      },
      direccion: {
        type: String,
      },
    },
  ],
  localizacionAccesoControl: {
    inventario: {
      type: String,
    },
    procedencia: {
      type: String,
    },
    proveedor: {
      type: String,
    },
    estado: {
      type: String,
      enum: ["Alta", "Baja"],
      required: true,
    },
  },
});

module.exports = mongoose.model("Archivo", archivoSchema);
