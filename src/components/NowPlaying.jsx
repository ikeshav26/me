import { useEffect, useState } from "react";

export default function NowPlaying() {
  const [track, setTrack] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchTrack = async () => {
    try {
      const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${import.meta.env.VITE_LASTFM_USERNAME}&api_key=${import.meta.env.VITE_LASTFM_API_KEY}&format=json&limit=1`;

      const res = await fetch(url);
      const data = await res.json();

      const t = data.recenttracks?.track?.[0];

      if (t) {
        setTrack({
          nowPlaying: t['@attr']?.nowplaying === "true",
          name: t.name,
          artist: t.artist["#text"],
          album: t.album["#text"],
          image: t.image?.[2]["#text"],
          url: t.url
        });
        setError(false);
      } else {
        setError(true);
      }
    } catch (err) {
      console.error('Error fetching Last.fm data:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrack();
    const interval = setInterval(fetchTrack, 15000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-2">
        <div className="text-lg">🎵</div>
        <div className="flex-1 min-w-0">
          <div className="text-[#c8c8c8]/60 text-xs font-[font2]">Music</div>
          <div className="text-[#c8c8c8]/40 text-sm">Loading...</div>
        </div>
      </div>
    );
  }

  if (error || !track) {
    return (
      <div className="flex items-center gap-2">
        <div className="text-lg">🎵</div>
        <div className="flex-1 min-w-0">
          <div className="text-[#c8c8c8]/60 text-xs font-[font2]">Music</div>
          <div className="text-[#c8c8c8]/40 text-sm">Not available</div>
        </div>
      </div>
    );
  }

  return (
    <div
      target="_blank" 
      rel="noopener noreferrer"
      className="flex items-center gap-2"
    >
      <div className="text-lg">🎵</div>
      <div className="flex-1 min-w-0">
        <div className="text-[#c8c8c8]/60 text-xs font-[font2]">
          {track.nowPlaying ? "🎧 Now Playing" : "Last Played"}
        </div>
        <div className="text-white text-sm font-[font1] truncate hover:text-[#00f050] transition-colors">
          {track.name}
        </div>
        <div className="text-[#c8c8c8]/60 text-xs truncate">{track.artist}</div>
      </div>
      {track.image && (
        <img 
          src={track.image} 
          alt={`${track.name} album cover`}
          loading="lazy"
          width="32"
          height="32"
          className="w-8 h-8 rounded shrink-0" 
        />
      )}
    </div>
  );
}
