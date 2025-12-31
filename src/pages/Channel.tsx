import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { RESOLVE_USERNAME } from "../services/resolve";

interface ChannelProps {
  businessId: string;
  businessName: string;
  TokenName: string;
  image: string;
  businessDescription: string;
  businessStatus: string;
  username: string;
  createdBy: string;
  createdAt: string;
  subscribers?: number;
}

export default function Channel() {
  const { channelId } = useParams();
  const [isMobile, setIsMobile] = useState(false);
  const [channel, setChannel] = useState<ChannelProps>();

  useEffect(() => {
    if (!channelId) return;

    RESOLVE_USERNAME({
      username: channelId,
      isBusiness: true,
    }).then((res) => {
      if (res?.success) setChannel(res.finalResult);
    });
  }, [channelId]);

  useEffect(() => {
    setIsMobile(/Android|iPhone|iPad|iPod/i.test(navigator.userAgent));
  }, []);

  const openApp = () => {
    // ChannelScreen/:channelId/:username?
    window.location.href = `cubeapp://ChannelScreen/${channel?.businessId}/${channel?.username}`;
    setTimeout(() => {
      window.location.href = `https://cubechat.org/channel/${channelId}`;
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#dff1e8,#e8f0ff,#ffffff)] px-4 flex justify-center items-start">
      {/* Optical centering wrapper */}
      <div className="w-full max-w-sm mt-[12vh] md:mt-[14vh]">
        <div className="bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-6 flex flex-col items-center gap-4">
          {/* Avatar */}
          <img
            src={channel?.image}
            alt="channel avatar"
            className="w-24 h-24 rounded-full bg-neutral-100 object-cover"
          />

          {/* Channel identity */}
          <div className="text-center">
            <h1 className="text-xl font-semibold text-neutral-900">
              {channel?.businessName}
            </h1>
            <p className="text-sm text-neutral-500">@{channel?.username}</p>

            {channel?.subscribers && (
              <p className="text-xs text-neutral-400 mt-1">
                {channel.subscribers.toLocaleString()} subscribers
              </p>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-neutral-700 text-center leading-relaxed">
            {channel?.businessDescription}
          </p>

          {/* Actions */}
          {/* <div className="w-full flex flex-col gap-3 mt-4">
            {isMobile && (
              <button
                onClick={openApp}
                className="w-full py-3 rounded-xl bg-[#2AABEE] hover:bg-[#229ED9] transition text-white font-semibold"
              >
                Open in App
              </button>
            )}

            <a
              href={`https://cubechat.org/channel/${channelId}`}
              className="w-full py-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 transition text-center font-semibold text-neutral-900"
            >
              Open Web
            </a>
          </div> */}

          {/* Footer */}
          <p className="text-xs text-neutral-500 mt-2">
            View this channel on Cube
          </p>
        </div>
      </div>
    </div>
  );

  //
}
