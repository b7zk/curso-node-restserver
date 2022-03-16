const { Router } = require("express");
const { check } = require("express-validator");
const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch,
} = require("../controllers/usuarios");

//verificador de rol
const {
  esRoleValido,
  emailExiste,
  usuarioExistePorId,
} = require("../helpers/db-validators");

const router = Router();

const { validarCampos } = require("../middlewares/validar-campos");

router.get("/", usuariosGet);

//actualizando data (registro)
router.put(
  "/:id",
  [
    check("id", "No es id un valido").isMongoId(), //comprueba que el id sea valido
    check("id").custom(usuarioExistePorId), //MW personalizado verifica si el id existe DB
    check("rol").custom(esRoleValido),
    validarCampos, //Muestra los errores guardados por los MW
  ],
  usuariosPut
);
//crear recursos
//middleware se envia en segunda posicion, y si se envian varios, se mandan como arreglo

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(), //not.empty valida que el nombre este
    check("password", "El password debe tener más de 6 letras").isLength({
      min: 6,
    }), //isLenght valida que la contraseña tenga más de 6 nums
    check("correo", "El correo no es valido").isEmail(), //isEmail valida que tenga formato de mail
    check("correo").custom(emailExiste), //custom es para llamar middlewares propios
    // En una funcion o callback cuyo primer argumento es el mismo que recibe, se puede obviar y mandar la ref a la funcion directa
    check("rol").custom(esRoleValido), //SE CHECA SI EL ROL ES VALIDO

    validarCampos, //Muestra los errores guardados por los MW
  ],
  usuariosPost
);
//borrar registro
router.delete(
  "/:id",
  [
    check("id", "No es id un valido").isMongoId(), //comprueba que el id sea valido
    check("id").custom(usuarioExistePorId),
    validarCampos,
  ],
  usuariosDelete
);
//patch
router.patch("/", usuariosPatch);

module.exports = router;
