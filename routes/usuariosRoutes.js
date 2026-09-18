import { Router } from "express";

import { listar, crear, actualizar, eliminar } from "../controllers/usuariosController.js";
import { verificarToken } from "../middleware/verificarToken.js";
import { soloAdmin } from "../middleware/soloAdmin.js";

const router = Router();

router.use(verificarToken);
router.use(soloAdmin);

router.get("/", listar);
router.post("/", crear);
router.put("/:id", actualizar);
router.delete("/:id", eliminar);

export default router;
