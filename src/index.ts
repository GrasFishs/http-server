import { HttpServer } from "./core/Http";

const server = new HttpServer();

server.createServer((req, res) => {
  console.log(req.uri);
  console.log(req.bodyRaw)
  console.log(req.header.toMessage())
  if (req.uri === "/a") {
    res.json({ fuck: "a" });
  } else if (req.uri === "/b") {
    res.json({ fuck: "b" });
  }
});

server.listen(3000, () => {
  console.log("listening at http://localhost:3000");
});
