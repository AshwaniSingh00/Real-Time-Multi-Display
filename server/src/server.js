import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import socketHandler from "./sockets/socketHandler.js";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  },
});
socketHandler(io);
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});