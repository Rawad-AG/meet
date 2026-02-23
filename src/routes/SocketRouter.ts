import { Server } from "socket.io";
import httpServer from "./../app.js";
import { clientMessage, joinRoom } from "./../controllers/SocketController.js";

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("join_room", (roomName) => {
    joinRoom(socket, roomName);
  });

  socket.on("client_message", clientMessage);
});

export default io;
