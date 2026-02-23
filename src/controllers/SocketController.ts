import io from "../routes/SocketRouter.js";

export function clientMessage(data: { room: string; msg: string }) {
  console.log(`Message for ${data.room}:`, data.msg);

  io.to(data.room).emit("server_message", data.msg);
}

export function joinRoom(socket: any, roomName: string) {
  socket.join(roomName);
  console.log(`User ${socket.id} joined room: ${roomName}`);

  socket
    .to(roomName)
    .emit("server_message", `User ${socket.id} joined the room!`);
}
