import express, { Express } from "express";
import gastosRoutes from "../routes/gastosRoute";
import usuarioRoutes from "../routes/usuariosRoutes";
import { conectarDB } from "../database/config";

export class Server {
    app: Express
    constructor(){
        this.app = express()
        this.conexionDB()
        this.middlewares()
        this.routes()
    }

    async conexionDB():Promise<void>{
        await conectarDB()
    }

    middlewares(): void {
        this.app.use(express.json())
    }

    routes(): void {
        this.app.use("/gastos", gastosRoutes)
        this.app.use("/usuarios", usuarioRoutes)
    }

    listen() : void {
        this.app.listen(8080, ()=>{console.log("Utilizando puerto 8080.");})
    }
}
