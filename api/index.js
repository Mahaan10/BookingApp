import jsonServer from "json-server";

const server = jsonServer.create();
// 2nd argument { readOnly: true } ensures no write operations
const router = jsonServer.router("db.json", { readOnly: true });
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

export default (req, res) => {
  server(req, res);
};
