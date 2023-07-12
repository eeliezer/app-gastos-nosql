import { Request, Response } from "express";
import Gasto, { IGasto } from "../models/gastos";

export const createGastos =async (req:Request, res:Response) => {
    const gastosData:IGasto = req.body

    const gasto = new Gasto(gastosData)

    await gasto.save()

    res.json({
        msj:"GASTO AGREGADO",
        gasto
    })
}

export const getGastos = async ({}, res:Response) => {
    const condicion = { estado: true}
    const gastos: IGasto[] = await Gasto.find(condicion)

    res.json({
        gastos
    })
}

export const getGastoId = async (req:Request, res:Response) => {
    const { id } = req.params
    const gasto: IGasto | null = await Gasto.findOne({id:id})

    res.json({
        gasto
    })
}