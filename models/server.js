const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = "/api/usuarios";

    //conexion DB
    this.conectarDB();
    //Middlewares funciones que añaden funcionalidades (se ejecutan siempre que se levante el server)
    //Middleware es una funcion que se ejecuta antes de llamar a un controlador o la ejecucion de peticiones
    this.middlewares();
    //Rutas de la aplicacion
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    //cors
    this.app.use(cors());

    //Lectura y Parseo del body
    this.app.use(express.json());
    //directorio Public
    this.app.use(express.static("public"));
    //.use (es un middleware)
  }
  routes() {
    this.app.use(this.usuariosPath, require("../routes/usuarios"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", this.port);
    });
  }
}

module.exports = Server;
