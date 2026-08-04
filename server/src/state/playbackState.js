export const playbackState = {
  isPlaying: false,
  currentTime: 0,
  videoId: "sample1",
  updatedAt: Date.now(),
};

export const THRESHOLD = 1;

export function getExpectedTime() {
  let currentTime = playbackState.currentTime;

  if (playbackState.isPlaying) {
    currentTime +=
      (Date.now() - playbackState.updatedAt) / 1000;
  }

  return currentTime;
}