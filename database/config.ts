import mongoose from "mongoose";

export const conectarDB = async () : Promise<void> => {
    try {
        await mongoose.connect("mongodb+srv://eeliezer:hhfNFDd6PXRVPU8j@app-gastos.nf8ejli.mongodb.net/")
        console.log("Conexión establecida.");
    } catch (error) {
        console.log(error);
        throw new Error("No se pudo establecer conexión con la base de datos")
    }
}