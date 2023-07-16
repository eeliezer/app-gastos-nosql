import { Request, Response } from "express";
import Usuario, { IUsuario } from "../models/usuario";

export const createUsuario =async (req:Request, res: Response) => {
    try{
    const userData: IUsuario = req.body
    
    const {user, address, email} = userData;
    
    if(!user || !address || !email){
        res.json({
            msj: "Faltan datos necesarios en la petición"
        })
        return
    }
    
    const userExist = await Usuario.findOne({user: user})
    if(userExist){
        res.json({
            msj: "El usuario ya está registrado"
        })
        return
    }

    const usuario = new Usuario(userData)

    await usuario.save()

    res.json({
        msj: "Usuario Registrado",
        usuario
    })

    }catch(error){
        console.error('Error al obtener los gastos:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

export const getUsuarios =async ({}, res:Response) => {
    const condicion = { activo: true}

    const usuarios: IUsuario[] = await Usuario.find(condicion)

    res.json({
        usuarios
    })
}

export const getByUser =async (req:Request, res:Response) => {
    try {
    const { user } = req.params
    const usuario: IUsuario | null = await Usuario.findOne({user:user})
    .populate("user")

    if (usuario) {
        res.json({
            usuario
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