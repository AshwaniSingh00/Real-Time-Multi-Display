import socket from "../services/socket";
import { useEffect, useState } from "react";

export default function Controller() {
  const [displayCount, setDisplayCount] = useState(0);

  const videos = ["sample1", "sample2", "sample3"];

  const [selectedVideo, setSelectedVideo] = useState("sample1");

  const handlePause = () => {
    socket.emit("pause");
  };

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    socket.disconnect();

    window.location.href = "/login";
  };

  useEffect(() => {
    socket.emit("register");

    const handleDisplayCount = (count) => {
      setDisplayCount(count);
    };

    socket.on("display-count", handleDisplayCount);

    return () => {
      socket.off("display-count", handleDisplayCount);
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-10 relative overflow-hidden">

      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

          <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xl shadow-lg shadow-blue-500/20">
              ▶
            </div>

            <div>
              <h1 className="text-xl font-bold">
                SyncStream
              </h1>

              <p className="text-xs text-slate-500">
                Real-Time Video Synchronization
              </p>
            </div>

          </div>

          <div className="flex items-center gap-3">

            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">

              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />

              <span className="text-sm text-green-400">
                Controller Online
              </span>

            </div>

            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition"
            >
              Logout
            </button>

          </div>

        </div>

        <div className="mb-8">

          <p className="text-blue-400 text-sm font-medium mb-2">
            CONTROL CENTER
          </p>

          <h1 className="text-4xl md:text-5xl font-bold">
            Video Controller
          </h1>

          <p className="text-slate-400 mt-3 max-w-2xl">
            Manage synchronized video playback across all connected
            displays from a single control center.
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-5 mb-8">

          <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 backdrop-blur-xl">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-slate-400 text-sm">
                  Connected Displays
                </p>

                <h2 className="text-5xl font-bold text-blue-400 mt-2">
                  {displayCount}
                </h2>
              </div>

              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-2xl">
                🖥️
              </div>

            </div>

          </div>

          <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 backdrop-blur-xl">

            <p className="text-slate-400 text-sm">
              System Status
            </p>

            <div className="flex items-center gap-3 mt-4">

              <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />

              <span className="text-xl font-semibold">
                Operational
              </span>

            </div>

            <p className="text-xs text-slate-500 mt-2">
              Real-time synchronization active
            </p>

          </div>

          <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 backdrop-blur-xl">

            <p className="text-slate-400 text-sm">
              Current Video
            </p>

            <h2 className="text-xl font-semibold mt-4 truncate">
              {selectedVideo}
            </h2>

            <p className="text-xs text-slate-500 mt-2">
              Selected playback source
            </p>

          </div>

        </div>

        <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-xl">

          <div className="flex items-center gap-3 mb-6">

            <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
              🎮
            </div>

            <div>
              <h2 className="text-xl font-semibold">
                Playback Controls
              </h2>

              <p className="text-sm text-slate-500">
                Control playback across connected displays
              </p>
            </div>

          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">

            <button
              onClick={() => socket.emit("play")}
              className="py-3 rounded-xl bg-green-500/90 hover:bg-green-500 text-white font-semibold transition"
            >
              ▶ Play
            </button>

            <button
              onClick={handlePause}
              className="py-3 rounded-xl bg-yellow-500/90 hover:bg-yellow-500 text-white font-semibold transition"
            >
              ⏸ Pause
            </button>

            <button
              onClick={handleRestart}
              className="py-3 rounded-xl bg-purple-600/90 hover:bg-purple-600 text-white font-semibold transition"
            >
              ⮮ Restart
            </button>

            <button
              onClick={handleBackward}
              className="py-3 rounded-xl bg-indigo-600/90 hover:bg-indigo-600 text-white font-semibold transition"
            >
              ⏪ Back 5s
            </button>

            <button
              onClick={handleForward}
              className="py-3 rounded-xl bg-indigo-600/90 hover:bg-indigo-600 text-white font-semibold transition"
            >
              Forward 5s ⏩
            </button>

          </div>

        </div>

        <div className="mt-6 bg-white/[0.04] border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-xl">

          <div className="flex items-center gap-3 mb-6">

            <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              🎬
            </div>

            <div>
              <h2 className="text-xl font-semibold">
                Video Source
              </h2>

              <p className="text-sm text-slate-500">
                Select the video to broadcast to displays
              </p>
            </div>

          </div>

          <div className="flex flex-col md:flex-row gap-4">

            <select
              value={selectedVideo}
              onChange={(e) => setSelectedVideo(e.target.value)}
              className="flex-1 bg-slate-950/70 border border-white/10 text-white rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            >
              {videos.map((video) => (
                <option
                  key={video}
                  value={video}
                  className="bg-slate-900"
                >
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
              className="md:w-48 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 font-semibold transition shadow-lg shadow-blue-500/10"
            >
              🎬 Load Video
            </button>

          </div>

        </div>

        <div className="mt-8 flex flex-col md:flex-row justify-between gap-3 text-xs text-slate-600">

          <p>
            SyncStream • Real-Time Multi-Display System
          </p>

          <p>
            Powered by React • Node.js • Socket.IO
          </p>

        </div>

      </div>
    </div>
  );
}