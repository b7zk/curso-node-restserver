//ROLES
const Role = require("../models/role");
const Usuario = require("../models/usuario");

//verifica si el rol es valido
const esRoleValido = async (rol = "") => {
  //busca si existe en la DB
  const existeRol = await Role.findOne({ rol });
  //si existe:
  if (!existeRol) {
    throw new Error(`El rol: ${rol} no esta registrado en la DB`);
  }
};

//validacion personalizada
const emailExiste = async (correo = "") => {
  //verificar si el correo existe

  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error(`El correo: ${correo} ya esta registrado en la DB`);
  }
};

const usuarioExistePorId = async (id) => {
  //verificar si el Id existe

  const existeUser = await Usuario.findById(id);
  if (!existeUser) {
    throw new Error(`El id: ${id} no existe en la DB`);
  }
};

module.exports = {
  esRoleValido,
  emailExiste,
  usuarioExistePorId,
};
