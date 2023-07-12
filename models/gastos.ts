import { Model, Schema, model } from "mongoose";

export interface IGasto {
    id: string;
    producto: string;
    cantidad: number,
    monto: number;
    fecha: Date;
    estado: boolean;
}

const GastosSchema = new Schema<IGasto>({
    id: {
        type: String,
        required: true
    },
    producto: {
        type: String,
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    },
    monto: {
        type: Number,
        required: true
    },
    fecha: {
        date: { type: Date, default: Date.now },
    },
    estado: {
        type: Boolean,
        required: true,
        default: true
    }
})

const Gasto: Model<IGasto> = model<IGasto>("Gasto", GastosSchema)

export default Gasto