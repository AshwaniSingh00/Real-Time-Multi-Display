import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_SERVER_URL, {
  auth: {
    displayKey: "syncstream_display_2026",
  },
  transports: ["websocket", "polling"],
});

socket.on("connect", () => {
  console.log("Display socket connected:", socket.id);
});

socket.on("connect_error", (error) => {
  console.error(
    "Display socket connection error:",
    error.message
  );
});

socket.on("disconnect", (reason) => {
  console.log(
    "Display socket disconnected:",
    reason
  );
});

export default socket;