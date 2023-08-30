import { Server } from "socket.io";

const io = new Server(3000);

let data = [];
let count = 0;

io.on("connection", (socket) => {
  // recieve a message to the client
  socket.on("From client", ({ answer, uniqueId }) => {
    data[count] = { answer, uniqueId };
    count += 1;
    console.log(`Number of messages recieved: ${count}`);
    io.emit("From server", data.pop());
  });
});
