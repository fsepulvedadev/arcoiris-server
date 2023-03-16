const path = require("path");

const handleDescargarArchivos = async (req, res) => {
  const { file } = req.params;

  const archivoPath = path.join(__dirname, "../files", file);

  console.log(archivoPath);
  try {
    res.download(archivoPath);
  } catch {
    res.status(500).json({ status: "error", message: error.message });
  }
};

module.exports = { handleDescargarArchivos };
