import { io } from "socket.io-client";

const token = localStorage.getItem("token");

const socket = io(import.meta.env.VITE_SERVER_URL, {
  auth: {
    token,
    displayKey: "syncstream_display_2026",
  },
});

export default socket;