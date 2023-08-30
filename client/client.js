import { io } from "socket.io-client";
import { createInterface } from "readline";

const socket = io("ws://localhost:3000");

const uniqueId = Math.random().toString(36).substring(7);

//send a message to the server
socket.emit("Hello from client", "invanetha");
// continosly read message from terminal
const rl = createInterface({
  input: process.stdin,
  output: null,
});

function Prompt() {
  rl.question("Send a message or exit:", (answer) => {
    if (answer === "exit") {
      rl.close();
      return;
    } else {
      socket.emit("From client", { answer, uniqueId });
      console.log("Enter a message to send to server or type exit to exit");
      Prompt();
    }
  });
}
console.log("Enter a message to send to server or type exit to exit");
Prompt();

//recieve a message from server
socket.on("From server", (data) => {
  if (data.uniqueId !== uniqueId) {
    console.log(`From server: ${data.answer}`);
    console.log("Enter a message to send to server or type exit to exit");
  }
});
