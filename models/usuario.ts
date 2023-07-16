import {Model, Schema, model} from "mongoose"

export interface IUsuario {
    user: string;
    email: string;
    address: string;
    activo: boolean;
}

const UsuarioSchema = new Schema<IUsuario>({
    user: {
        type:String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    activo: {
        type: Boolean,
        default: true,
    }
})

const Usuario: Model<IUsuario> = model<IUsuario>("Usuario", UsuarioSchema)

export default Usuario