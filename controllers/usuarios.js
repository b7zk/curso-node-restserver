const { response } = require("express");

const usuariosGet = (req = request, res = response) => {
  const { q, nombre = "No name", apikey, page = 1, limit } = req.query;
  res.json({
    msg: "get API - controlador (archivo independiente)",
    q,
    nombre,
    apikey,
    page,
    limit,
  });
};
const usuariosPost = (req, res = response) => {
  const { nombre, edad } = req.body;

  res.json({
    msg: "post API - controlador (archivo independiente)",
    nombre,
    edad,
  });
};

const usuariosPut = (req, res = response) => {
  const id = req.params.id;

  res.json({
    msg: "put API - controlador (archivo independiente)",
    id,
  });
};

const usuariosDelete = (req, res = response) => {
  res.json({
    msg: "delete API - controlador (archivo independiente)",
  });
};
const usuariosPatch = (req, res = response) => {
  res.json({
    msg: "patch API - controlador (archivo independiente)",
  });
};

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
  usuariosPost,
};
