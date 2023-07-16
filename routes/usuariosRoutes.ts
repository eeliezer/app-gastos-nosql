import { Router } from "express";
import { createUsuario, getUsuarios, getByUser } from "../controllers/usuarios";

const router = Router()

router.post("/", createUsuario)
router.get("/", getUsuarios)
router.get("/:user", getByUser)

export default router