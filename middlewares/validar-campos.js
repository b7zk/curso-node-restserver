//validador
const { validationResult } = require("express-validator");

//errores guardados por el middleware
//next se invoca si el middleware pasa
const validarCampos = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  next();
};

module.exports = {
  validarCampos,
};
