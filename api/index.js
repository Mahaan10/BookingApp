const jsonServer = require("json-server");

const server = jsonServer.create();
const router = jsonServer.router("./db.json"); // ensure path is correct relative to this file
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

module.exports = (req, res) => {
  server(req, res);
};
