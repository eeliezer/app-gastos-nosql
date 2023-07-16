import { Model, ObjectId, Schema, model } from "mongoose";

export interface IGasto {
    id: Number;
    user: ObjectId;
    producto: String;
    cantidad: Number;
    precio: Number;
    date: Date;
    estado: boolean;
}

const GastoSchema = new Schema<IGasto>({
    id:{
        type: Number,
        required: true,
        unique:true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "Usuario",
        required:true
    },
    producto: {
        type:String,
        required: true,
    },
    cantidad: {
        type: Number,
        required: true,
    },
    precio: {
        type: Number,
        required: true,
    },
    date: {
        date: { type: Date, default: Date.now },
    },
    estado: {
        type: Boolean,
        default: true
    }
})

const Gasto: Model<IGasto> = model<IGasto>("Gasto", GastoSchema)

export default Gasto