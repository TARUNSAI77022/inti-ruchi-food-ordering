import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

const BackgroundVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // For this demo, we'll use a high-quality atmospheric slow-motion cooking video.
    // In a real scenario, this would be the custom-shot Andhra kitchen footage.
    const hlsUrl = 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8'; // Placeholder HLS
    // A better one for a restaurant would be a cinematic food video
    const videoSrc = 'https://assets.mixkit.co/videos/preview/mixkit-vegetables-and-herbs-on-a-table-4040-large.mp4'; 

    if (videoRef.current) {
      if (Hls.isSupported() && hlsUrl.endsWith('.m3u8')) {
        const hls = new Hls();
        hls.loadSource(hlsUrl);
        hls.attachMedia(videoRef.current);
      } else {
        videoRef.current.src = videoSrc;
      }
    }
  }, []);

  return (
    <div className="fixed inset-0 z-0 w-full h-full overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover opacity-60 scale-110"
        style={{ filter: 'brightness(0.4) contrast(1.2)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80" />
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
    </div>
  );
};

export default BackgroundVideo;
