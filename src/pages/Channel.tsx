import { useParams } from "react-router";
import { useEffect, useState } from "react";

export default function Channel() {
  const { channelId } = useParams();
  const [isMobile, setIsMobile] = useState(false);

  // Mocked channel data (replace with API later)
  const channel = {
    id: channelId,
    name: "Cube Announcements",
    username: "cubechannel",
    description:
      "Official Cube channel for updates, announcements, and new features.",
    avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=cubechannel",
    subscribers: 12432,
  };

  useEffect(() => {
    setIsMobile(/Android|iPhone|iPad|iPod/i.test(navigator.userAgent));
  }, []);

  const openApp = () => {
    const deepLink = `cubeapp://channel/${channelId}`;
    const fallback = `https://cubechat.org/channel/${channelId}`;

    window.location.href = deepLink;

    setTimeout(() => {
      window.location.href = fallback;
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-neutral-900 rounded-2xl shadow-xl p-6 flex flex-col items-center gap-4">
        {/* Avatar */}
        <img
          src={channel.avatar}
          alt="channel avatar"
          className="w-24 h-24 rounded-full bg-neutral-800"
        />

        {/* Channel info */}
        <div className="text-center">
          <h1 className="text-xl font-semibold">{channel.name}</h1>
          <p className="text-sm text-neutral-400">@{channel.username}</p>
          <p className="text-xs text-neutral-500 mt-1">
            {channel.subscribers.toLocaleString()} subscribers
          </p>
        </div>

        {/* Description */}
        <p className="text-sm text-neutral-300 text-center">
          {channel.description}
        </p>

        {/* Actions */}
        <div className="w-full flex flex-col gap-3 mt-4">
          {isMobile && (
            <button
              onClick={openApp}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition font-medium"
            >
              Open in App
            </button>
          )}

          <a
            href={`https://cubechat.org/channel/${channelId}`}
            className="w-full py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 transition text-center font-medium"
          >
            Open Web
          </a>
        </div>

        {/* Footer */}
        <p className="text-xs text-neutral-500 mt-1">
          View this channel on Cube
        </p>
      </div>
    </div>
  );
}
