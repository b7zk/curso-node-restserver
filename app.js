require("dotenv").config();

const Server = require("./models/server");

//levanta el puerto
const server = new Server();

server.listen();
