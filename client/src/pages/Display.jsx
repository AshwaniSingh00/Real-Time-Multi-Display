import { useEffect, useRef, useState } from "react";
import socket from "../services/displaySocket";

export default function Display() {
  const videoRef = useRef(null);
  const isActivatedRef = useRef(false);

  const [videoSrc, setVideoSrc] = useState(
    "/videos/sample1.mp4"
  );

  const [isSynced, setIsSynced] = useState(true);
  const [isConnected, setIsConnected] = useState(
    socket.connected
  );
  const [isActivated, setIsActivated] = useState(false);

  const activateDisplay = async () => {
    if (!videoRef.current) return;

    try {
      await videoRef.current.play();
      videoRef.current.pause();

      isActivatedRef.current = true;
      setIsActivated(true);

      console.log("Display activated");
    } catch (error) {
      console.error(
        "Display activation failed:",
        error
      );
    }
  };

  const handlePlay = async () => {
    if (!videoRef.current) return;

    if (!isActivatedRef.current) {
      console.log("Display is not activated");
      return;
    }

    try {
      await videoRef.current.play();

      console.log("Remote play received");
    } catch (error) {
      console.error(
        "Remote play failed:",
        error
      );
    }
  };

  const handlePause = () => {
    if (!videoRef.current) return;

    videoRef.current.pause();

    console.log("Remote pause received");
  };

  const handleRestart = () => {
    if (!videoRef.current) return;

    videoRef.current.currentTime = 0;

    console.log("Remote restart received");
  };

  const handleSeek = ({ currentTime }) => {
    if (!videoRef.current) return;

    videoRef.current.currentTime = currentTime;

    console.log(
      "Remote seek received:",
      currentTime
    );
  };

  const handleSync = async ({
    videoId,
    currentTime,
    isPlaying,
  }) => {
    if (!videoRef.current) return;

    if (videoId) {
      setVideoSrc(
        `/videos/${videoId}.mp4`
      );
    }

    videoRef.current.currentTime =
      currentTime;

    setIsSynced(true);

    if (isPlaying) {
      if (!isActivatedRef.current) {
        console.log(
          "Display is not activated for sync playback"
        );
        return;
      }

      try {
        await videoRef.current.play();
      } catch (error) {
        console.error(
          "Sync play failed:",
          error
        );
      }
    } else {
      videoRef.current.pause();
    }
  };

  const handleVideoChange = ({ videoId }) => {
    setVideoSrc(
      `/videos/${videoId}.mp4`
    );

    setIsSynced(true);

    console.log(
      "Video changed:",
      videoId
    );
  };

  useEffect(() => {
    const handleConnect = () => {
      console.log(
        "Display connected:",
        socket.id
      );

      setIsConnected(true);

      socket.emit("register");
    };

    const handleDisconnect = () => {
      console.log(
        "Display disconnected"
      );

      setIsConnected(false);
    };

    socket.on(
      "connect",
      handleConnect
    );

    socket.on(
      "disconnect",
      handleDisconnect
    );

    socket.on(
      "play",
      handlePlay
    );

    socket.on(
      "pause",
      handlePause
    );

    socket.on(
      "restart",
      handleRestart
    );

    socket.on(
      "seek",
      handleSeek
    );

    socket.on(
      "sync",
      handleSync
    );

    socket.on(
      "change-video",
      handleVideoChange
    );

    if (socket.connected) {
      socket.emit("register");
    }

    const interval = setInterval(() => {
      if (!videoRef.current) return;

      if (videoRef.current.paused) return;

      socket.emit(
        "playback-status",
        {
          currentTime:
            videoRef.current.currentTime,
          isPlaying: true,
        }
      );
    }, 1000);

    return () => {
      socket.off(
        "connect",
        handleConnect
      );

      socket.off(
        "disconnect",
        handleDisconnect
      );

      socket.off(
        "play",
        handlePlay
      );

      socket.off(
        "pause",
        handlePause
      );

      socket.off(
        "restart",
        handleRestart
      );

      socket.off(
        "seek",
        handleSeek
      );

      socket.off(
        "sync",
        handleSync
      );

      socket.off(
        "change-video",
        handleVideoChange
      );

      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [videoSrc]);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-10 relative overflow-hidden">

      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto">

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

              <span
                className={`w-2 h-2 rounded-full ${
                  isConnected
                    ? "bg-green-400 animate-pulse"
                    : "bg-red-400"
                }`}
              />

              <span
                className={`text-sm ${
                  isConnected
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {isConnected
                  ? "Display Connected"
                  : "Display Disconnected"}
              </span>

            </div>

            {!isActivated && (
              <button
                onClick={activateDisplay}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 font-semibold transition shadow-lg shadow-blue-500/20"
              >
                Activate Display
              </button>
            )}

            {isActivated && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20">

                <span className="w-2 h-2 rounded-full bg-blue-400" />

                <span className="text-sm text-blue-400">
                  Display Activated
                </span>

              </div>
            )}

          </div>

        </div>

        <div className="mb-8">

          <p className="text-blue-400 text-sm font-medium mb-2">
            DISPLAY
          </p>

          <h1 className="text-4xl md:text-5xl font-bold">
            Synchronized Display
          </h1>

          <p className="text-slate-400 mt-3 max-w-2xl">
            This display receives real-time
            playback commands from the
            SyncStream controller.
          </p>

        </div>

        {!isActivated && (
          <div className="mb-6 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-5">

            <p className="text-yellow-400 font-semibold">
              Display activation required
            </p>

            <p className="text-sm text-yellow-400/70 mt-1">
              Click "Activate Display" once
              before controlling playback
              from the Controller.
            </p>

          </div>
        )}

        <div className="bg-white/[0.04] border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl">

          <div className="aspect-video bg-black">

            <video
              ref={videoRef}
              src={videoSrc}
              className="w-full h-full object-contain"
              controls
              playsInline
            />

          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-5 mt-6">

          <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6">

            <p className="text-slate-400 text-sm">
              Current Video
            </p>

            <h2 className="text-xl font-semibold mt-2">
              {videoSrc
                .split("/")
                .pop()
                ?.replace(".mp4", "")}
            </h2>

          </div>

          <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6">

            <p className="text-slate-400 text-sm">
              Synchronization
            </p>

            <div className="flex items-center gap-3 mt-3">

              <span
                className={`w-3 h-3 rounded-full ${
                  isSynced
                    ? "bg-green-400"
                    : "bg-yellow-400"
                }`}
              />

              <span className="font-semibold">
                {isSynced
                  ? "Synced"
                  : "Synchronizing"}
              </span>

            </div>

          </div>

        </div>

        <div className="mt-8 flex flex-col md:flex-row justify-between gap-3 text-xs text-slate-600">

          <p>
            SyncStream • Real-Time
            Multi-Display System
          </p>

          <p>
            Powered by React • Node.js •
            Socket.IO
          </p>

        </div>

      </div>

    </div>
  );
}