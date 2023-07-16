import {Request, Response} from "express"

import Gasto, { IGasto } from "../models/gasto"
import Usuario from "../models/usuario"

export const createGastos =async (req:Request, res: Response) => {
    try {
    const GastoData:IGasto = req.body

    const {id, cantidad, user, precio, producto} = GastoData

    if(!id || !user || !user || !cantidad || !precio || !producto){
        res.json({
            msj: "Faltan datos necesarios para ingresar el gasto"
        })
        return
    }
    
    const usuarioData = await Usuario.findOne({user:user})

    if(!usuarioData){
        res.json({
            msj: "El usuario no se encuentra registrado"
        })
        return
    }
    
    const gastoEnDB = await Gasto.findOne({id:id})
    if(gastoEnDB){
        res.json({
            msj: "El gasto ya está registrado utilice otro ID"
        })
        return
    }

    const gasto = new Gasto({
        id, cantidad, user:usuarioData?._id, precio, producto
    })

    await gasto.save()
    
    res.json({
        msj:"Todo ok",
        gasto
    })
    }catch(error){
        console.error('Error al obtener los gastos:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

export const getGastos =async ({}, res:Response) => {
    const condicion = { estado: true}

    const gastos: IGasto[] = await Gasto.find(condicion)

    res.json({
        gastos
    })
}

export const getGastoId =async (req:Request, res:Response) => {
    try {
    const { id } = req.params
    const gasto: IGasto | null = await Gasto.findOne({id:id})
    .populate("user"/* , "user" */)

    if (gasto) {
        res.json({
            gasto
        })
    }else{
        res.json({
            msj: "No hay gasto asociado con ID especificado"
        })
    }
    }catch(error){
        console.error('Error al obtener los gastos:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}


export const updateGasto = async (req: Request, res: Response) => {
    try {
    const { id } = req.params;

    const {estado, user, ...data} = req.body;

    const gasto = await Gasto.findOneAndUpdate({id: id}, data,{new:true} );

    res.json({
        gasto
    })
    }catch(error){
        console.error('Error al obtener los gastos:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const deleteGasto = async (req: Request, res: Response) => {
    try {
    const { id } = req.params;

    const gasto = await Gasto.findOneAndUpdate(
        {id:id},
        {estado: false},
        {new: true}
    )

    if(gasto?.estado === false) {
        res.json({
            msg: "El gasto no está registrado"
        })
        return
    }

    res.json({
        gasto
    })    
    }catch(error){
        console.error('Error al obtener los gastos:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}