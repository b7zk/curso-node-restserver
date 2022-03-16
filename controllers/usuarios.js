const { response } = require("express");
//encriptar pass
const bcryptjs = require("bcryptjs");
//requerir modelo de usuario
const Usuario = require("../models/usuario");

//
const usuariosGet = async (req = request, res = response) => {
  const { limit = 5, desde = 0 } = req.query; //requerimientos de url
  const q = { estado: true }; //condicion

  /* const usuarios = await Usuario.find(q) //almacena todos los usuarios de la DB
    .skip(Number(desde)) //desde
    .limit(Number(limit)); //limite de Usuario

  const total = await Usuario.countDocuments(q); //contar */

  //COLECCION DE PROMESAS v
  //destructuracion de arreglo
  const [total, usuarios] = await Promise.all([
    //promesa 1
    Usuario.countDocuments(q), //contar */
    //promesa 2
    Usuario.find(q) //almacena todos los usuarios de la DB
      .skip(Number(desde)) //desde
      .limit(Number(limit)), //limite de Usuario
  ]);
  res.json({
    total,
    usuarios,
  });
};
const usuariosPost = async (req, res = response) => {
  //REVISAR /models/usuario

  //se puede destructurar usando el ...resto
  const { nombre, correo, password, rol } = req.body;

  const usuario = new Usuario({ nombre, correo, password, rol }); //crea la instancia del modelo de usuario

  const salt = bcryptjs.genSaltSync(); //encriptar password //dentro del parentesis se especifica el n de vueltas, el v por defecto es 10

  usuario.password = bcryptjs.hashSync(password, salt); //encriptacion hash:

  await usuario.save(); //registro en la db

  res.json({
    usuario,
  });
};

const usuariosPut = async (req, res = response) => {
  const { id } = req.params;

  //se quita _id para que no choque con la DB
  const { _id, password, google, correo, ...resto } = req.body; //destrucutrar cosas que no se deben actualizar facilmente

  //Se re-encripta la contraseña
  if (password) {
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }
  //Se actualiza en la DB
  const usuario = await Usuario.findByIdAndUpdate(id, resto);
  res.json(usuario);
};

const usuariosDelete = async (req, res = response) => {
  const { id } = req.params;

  /* //borrado fisicamente
  const usuario = await Usuario.findByIdAndDelete(id); */
  //borrado referenciado (cambia el estado a false)
  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
  res.json(usuario);
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
