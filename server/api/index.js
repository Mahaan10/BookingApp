import jsonServer from "json-server";

const server = jsonServer.create();
const router = jsonServer.router("./db.json"); // Adjust path if needed
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

export default (req, res) => {
  server(req, res);
};
