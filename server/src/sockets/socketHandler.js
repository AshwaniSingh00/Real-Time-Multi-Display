import { displays } from "../state/clients.js";
import { playbackState, THRESHOLD,getExpectedTime } from "../state/playbackState.js";
export default function handleSocketConnection(io) {
io.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id}`);

  socket.on("register", ({ role }) => {
  if (role === "display") {
    displays.set(socket.id, {
      socketId: socket.id,
    });

    io.emit("display-count", displays.size);
  }

  if (role === "controller") {
    socket.emit("display-count", displays.size);
  }

  console.log(`${role} registered (${socket.id})`);
});

  socket.on("disconnect", () => {
    displays.delete(socket.id);

    io.emit("display-count", displays.size);

    console.log(`Client disconnected: ${socket.id}`);
  });

  socket.on("play", () => {
    console.log("Play requested");

    playbackState.isPlaying = true;
    playbackState.updatedAt = Date.now();

    io.emit("play");
  });

  socket.on("pause", () => {
    console.log("Pause requested");

    if (playbackState.isPlaying) {
      playbackState.currentTime +=
        (Date.now() - playbackState.updatedAt) / 1000;
    }

    playbackState.isPlaying = false;
    playbackState.updatedAt = Date.now();

    io.emit("pause");
  });

  socket.on("restart", () => {
    console.log("Restart requested");

    playbackState.currentTime = 0;
    playbackState.updatedAt = Date.now();

    io.emit("restart");
  });

  socket.on("seek", ({ currentTime }) => {
    console.log(`Seek requested to ${currentTime}`);

    playbackState.currentTime = currentTime;
    playbackState.updatedAt = Date.now();

    io.emit("seek", { currentTime });
  });
    socket.on("forward", () => {
  playbackState.currentTime = getExpectedTime() + 5;
  playbackState.updatedAt = Date.now();

  io.emit("seek", {
    currentTime: playbackState.currentTime,
  });

  console.log("Forward 5 seconds");
});

socket.on("backward", () => {
    console.log("Backward requested");
  playbackState.currentTime = Math.max(getExpectedTime() - 5, 0);
  playbackState.updatedAt = Date.now();

  io.emit("seek", {
    currentTime: playbackState.currentTime,
    
  });
});

  socket.on("playback-status", ({ currentTime }) => {
    const expectedTime = getExpectedTime();

    const drift = Math.abs(expectedTime - currentTime);

    console.log(
      `Display ${socket.id} | Expected: ${expectedTime.toFixed(
        2
      )}s | Actual: ${currentTime.toFixed(2)}s | Drift: ${drift.toFixed(2)}s`
    );

    if (drift > THRESHOLD) {
      console.log(`Syncing display ${socket.id}`);

      socket.emit("sync", {
        videoId: playbackState.videoId,
        currentTime: expectedTime,
        isPlaying: playbackState.isPlaying,
      });
    }
  });
  socket.on("change-video", ({ videoId }) => {
  console.log(`Video changed to ${videoId}`);

  playbackState.videoId = videoId;
  playbackState.currentTime = 0;
  playbackState.isPlaying = false;
  playbackState.updatedAt = Date.now();

  io.emit("change-video", {
    videoId,
  });

});
});
}