const { readVisits } = require("../utils/fileManager");

const home = (req, res) => {
  return res.render("home", {
    titulo: "Inicio",
  });
};

const about = (req, res) => {
  return res.render("about", {
    titulo: "Acerca del proyecto",
  });
};

const status = (req, res) => {
  return res.status(200).json({
    ok: true,
    message: "Servidor operativo",
    project: "Proyecto módulo 6",
    timestamp: new Date().toISOString(),
  });
};

const visits = (req, res) => {
  const visitsLog = readVisits();

  return res.status(200).json({
    ok: true,
    message: "Acceso registrado correctamente",
    totalRegistros: visitsLog.length,
    data: visitsLog,
  });
};

module.exports = {
  home,
  about,
  status,
  visits,
};
