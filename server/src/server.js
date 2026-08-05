import http from "http";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import socketHandler from "./sockets/socketHandler.js";
import app from "./app.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

io.use((socket, next) => {
  try {
    const token = socket.handshake.auth.token;

    if (token) {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      socket.user = decoded;

      return next();
    }

    const displayKey =
      socket.handshake.auth.displayKey;

    if (
      displayKey &&
      displayKey === process.env.DISPLAY_KEY
    ) {
      socket.user = {
        role: "display",
      };

      return next();
    }

    return next(
      new Error("Authentication required")
    );
  } catch (error) {
    console.error(
      "Socket authentication failed:",
      error.message
    );

    return next(
      new Error("Invalid authentication")
    );
  }
});

socketHandler(io);

server.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT}`
  );
});