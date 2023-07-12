import { Router } from "express";
import { createGastos, getGastoId, getGastos } from "../controllers/gastos";

const router = Router()

router.post("/", createGastos)
router.get("/", getGastos)
router.get("/:id", getGastoId)

export default router