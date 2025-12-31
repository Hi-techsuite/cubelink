import { useParams } from "react-router";
import { useEffect, useState } from "react";

export default function Post() {
  const { postId } = useParams();
  const [isMobile, setIsMobile] = useState(false);

  // Mocked post data (replace with API later)
  const post = {
    id: postId,
    author: {
      name: "Cube User",
      username: "cubeuser",
      avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=cubeuser",
    },
    content:
      "This is a shared post preview. It looks clean, minimal, and very Telegram-like.",
    timestamp: "2 hours ago",
  };

  useEffect(() => {
    setIsMobile(/Android|iPhone|iPad|iPod/i.test(navigator.userAgent));
  }, []);

  const openApp = () => {
    window.location.href = `cubeapp://post/${postId}`;
    setTimeout(() => {
      window.location.href = `https://cubechat.org/post/${postId}`;
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#dff1e8,#e8f0ff,#ffffff)] px-4 flex justify-center items-start">
      {/* Optical centering wrapper */}
      <div className="w-full max-w-sm mt-[12vh] md:mt-[14vh]">
        <div className="bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-6 flex flex-col gap-4">
          {/* Author */}
          <div className="flex items-center gap-3">
            <img
              src={post.author.avatar}
              alt="avatar"
              className="w-10 h-10 rounded-full bg-neutral-100"
            />
            <div>
              <p className="text-sm font-semibold text-neutral-900 leading-none">
                {post.author.name}
              </p>
              <p className="text-xs text-neutral-500">
                @{post.author.username}
              </p>
            </div>
          </div>

          {/* Content */}
          <p className="text-sm text-neutral-700 leading-relaxed">
            {post.content}
          </p>

          {/* Timestamp */}
          <p className="text-xs text-neutral-400">{post.timestamp}</p>

          {/* Actions */}
          <div className="flex flex-col gap-3 mt-4">
            {isMobile && (
              <button
                onClick={openApp}
                className="w-full py-3 rounded-xl bg-[#2AABEE] hover:bg-[#229ED9] transition text-white font-semibold"
              >
                Open in App
              </button>
            )}

            <a
              href={`https://cubechat.org/post/${postId}`}
              className="w-full py-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 transition text-center font-semibold text-neutral-900"
            >
              Open Web
            </a>
          </div>

          {/* Footer */}
          <p className="text-xs text-neutral-500 text-center mt-2">
            View this post on Cube
          </p>
        </div>
      </div>
    </div>
  );
}
