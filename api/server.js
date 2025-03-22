const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("api/db.json"); // Updated path
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

module.exports = server;


//67de04328561e97a50f08650 BIN ID
//$2a$10$TBqDhkor5AXsjSEnFG1x0u6vZTONJ4UBkBVnve/FP6a82AMsIlZSO API KEY