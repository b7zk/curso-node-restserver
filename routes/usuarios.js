const { Router } = require("express");
const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch,
} = require("../controllers/usuarios");
const router = Router();

router.get("/", usuariosGet);

//actualizando data (registro)
router.put("/:id", usuariosPut);
//crear recursos
router.post("/", usuariosPost);
//borrar registro
router.delete("/", usuariosDelete);
//patch
router.patch("/", usuariosPatch);

module.exports = router;
