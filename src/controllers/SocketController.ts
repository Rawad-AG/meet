import { Server } from "socket.io";
import httpServer from "./../app.js";

const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
});
