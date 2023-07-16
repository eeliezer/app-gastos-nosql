import { Router } from "express";
import { createGastos, deleteGasto, getGastoId, getGastos, updateGasto } from "../controllers/gastos";

const router = Router()

router.post("/", createGastos)
router.get("/", getGastos)
router.get("/:id", getGastoId)
router.put("/:id", updateGasto)
router.delete("/:id", deleteGasto)

export default router