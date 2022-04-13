import { default as express } from "express";
import { createServer } from "https";
import { Server } from "socket.io";
import fs from "fs";
const app = express();
const httpsServer = createServer({
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem"),
}, app);
const io = new Server(httpsServer, {}).of("/knowbot-ws");

const port = process.env.PORT || 3000;

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log(`connect ${socket.id}`);

  socket.on("disconnect", (reason) => {
    console.log(`disconnect ${socket.id} due to ${reason}`);
  });
});

httpsServer.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});
