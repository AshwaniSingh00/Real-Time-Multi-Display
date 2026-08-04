import { useEffect, useRef, useState } from "react";
import socket from "../services/socket";

export default function Display() {
  const videoRef = useRef(null);
  const [videoSrc, setVideoSrc] = useState("/videos/sample1.mp4");

  const handlePlay = async () => {
    if (!videoRef.current) return;

    try {
      await videoRef.current.play();
      console.log("Video started");
    } catch (err) {
      console.error("Play failed:", err);
    }
  };

  const handlePause = () => {
    if (!videoRef.current) return;

    videoRef.current.pause();
    console.log("Video paused");
  };

  const handleRestart = () => {
    if (!videoRef.current) return;

    videoRef.current.currentTime = 0;
    console.log("Video restarted");
  };

  const handleSeek = ({ currentTime }) => {
    if (!videoRef.current) return;

    videoRef.current.currentTime = currentTime;
  };

const handleSync = async ({ videoId, currentTime, isPlaying }) => {
  if (!videoRef.current) return;

  if (videoId) {
    setVideoSrc(`/videos/${videoId}.mp4`);
  }

  videoRef.current.currentTime = currentTime;

  if (isPlaying) {
    try {
      await videoRef.current.play();
    } catch (err) {
      console.error(err);
    }
  } else {
    videoRef.current.pause();
  }
};

  const handleVideoChange = ({ videoId }) => {
    setVideoSrc(`/videos/${videoId}.mp4`);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [videoSrc]);

  useEffect(() => {
    socket.emit("register", {
      role: "display",
    });

    socket.on("play", handlePlay);
    socket.on("pause", handlePause);
    socket.on("restart", handleRestart);
    socket.on("seek", handleSeek);
    socket.on("sync", handleSync);
    socket.on("change-video", handleVideoChange);

 const interval = setInterval(() => {
  if (!videoRef.current) return;

  if (videoRef.current.paused) return;

  socket.emit("playback-status", {
    currentTime: videoRef.current.currentTime,
    isPlaying: true,
  });
}, 1000);

    return () => {
      socket.off("play", handlePlay);
      socket.off("pause", handlePause);
      socket.off("restart", handleRestart);
      socket.off("seek", handleSeek);
      socket.off("sync", handleSync);
      socket.off("change-video", handleVideoChange);

      clearInterval(interval);
    };
  }, []);

  return (

    <div className="min-h-screen bg-black flex flex-col">

    <div className="flex items-center justify-between bg-slate-900 px-8 py-4 border-b border-slate-700">

      <h1 className="text-2xl font-bold text-white">
        📺 Display Screen
      </h1>

      <span className="px-4 py-2 rounded-full bg-green-600 text-white text-sm font-medium">
        Connected
      </span>

    </div>

    <div className="flex-1 flex items-center justify-center p-8">


       <video
  ref={videoRef}
  src={videoSrc}
  width="900"
  controls
  controlsList="nodownload noplaybackrate"
  disablePictureInPicture
  muted
  onPlay={(e) => e.preventDefault()}
  onPause={(e) => e.preventDefault()}
/>


    </div>

    <div className="bg-slate-900 border-t border-slate-700 px-8 py-4 flex justify-between text-slate-300">

      <span>
        🎬 {videoSrc.split("/").pop()}
      </span>

      <span>
        Synchronized Playback
      </span>

    </div>

  </div>
  );
}