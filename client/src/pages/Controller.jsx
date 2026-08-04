import socket from "../services/socket";
import { useEffect, useState } from "react";
export default function Controller() {
  const [displayCount, setDisplayCount] = useState(0);
  const videos = [
  "sample1",
  "sample2",
  "sample3",
];
const [selectedVideo, setSelectedVideo] = useState("sample1");
const handlePause = () => {
  socket.emit("pause");
}
const handleRestart = () => {
    socket.emit("restart");
};

const handleForward = () => {
  socket.emit("forward");
};

const handleBackward = () => {
  socket.emit("backward");
  console.log("Backward requested");
};
useEffect(() => {

  socket.emit("register", {
    role: "controller",
  });

  const handleDisplayCount = (count) => {
    setDisplayCount(count);
  };

  socket.on("display-count", handleDisplayCount);

  return () => {
    socket.off("display-count", handleDisplayCount);
  };
}, []);
  return (
   <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8">

        <h1 className="text-3xl font-bold text-center text-slate-800">
          Video Controller
        </h1>

        <p className="text-center text-slate-500 mt-2">
          Manage synchronized playback across displays
        </p>

        <div className="mt-8 bg-blue-50 rounded-xl p-5 text-center">
          <p className="text-gray-600">Connected Displays</p>
          <h2 className="text-5xl font-bold text-blue-600 mt-2">
            {displayCount}
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-8">

          <button
            onClick={() => socket.emit("play")}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition"
          >
            ▶ Play
          </button>

          <button
            onClick={() => socket.emit("pause")}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-xl transition"
          >
            ⏸ Pause
          </button>

          <button
            onClick={() => socket.emit("restart")}
            className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 rounded-xl transition"
          >
            ⏮ Restart
          </button>

        <button
    onClick={handleBackward}
    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md transition duration-200"
  >
    ⏪ Backward 5s
  </button>

  <button
    onClick={handleForward}
    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md transition duration-200"
  >
    Forward 5s ⏩
  </button>
        </div>

        <div className="mt-10">
          <label className="block mb-2 font-semibold text-gray-700">
            Select Video
          </label>

          <select
            value={selectedVideo}
            onChange={(e) => setSelectedVideo(e.target.value)}
            className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {videos.map((video) => (
              <option key={video} value={video}>
                {video}
              </option>
            ))}
          </select>

          <button
            onClick={() =>
              socket.emit("change-video", {
                videoId: selectedVideo,
              })
            }
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition"
          >
            🎬 Load Video
          </button>
        </div>
      </div>
    </div>
  );
}
