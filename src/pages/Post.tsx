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
    const deepLink = `cubeapp://post/${postId}`;
    const fallback = `https://cubechat.org/post/${postId}`;

    window.location.href = deepLink;

    setTimeout(() => {
      window.location.href = fallback;
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-neutral-900 rounded-2xl shadow-xl p-6 flex flex-col gap-4">
        {/* Author */}
        <div className="flex items-center gap-3">
          <img
            src={post.author.avatar}
            alt="avatar"
            className="w-10 h-10 rounded-full bg-neutral-800"
          />
          <div>
            <p className="font-medium leading-none">{post.author.name}</p>
            <p className="text-sm text-neutral-400">@{post.author.username}</p>
          </div>
        </div>

        {/* Content */}
        <p className="text-neutral-200 text-sm leading-relaxed">
          {post.content}
        </p>

        {/* Timestamp */}
        <p className="text-xs text-neutral-500">{post.timestamp}</p>

        {/* Actions */}
        <div className="flex flex-col gap-3 mt-2">
          {isMobile && (
            <button
              onClick={openApp}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition font-medium"
            >
              Open in App
            </button>
          )}

          <a
            href={`https://cubechat.org/post/${postId}`}
            className="w-full py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 transition text-center font-medium"
          >
            Open Web
          </a>
        </div>

        {/* Footer */}
        <p className="text-xs text-neutral-500 text-center mt-1">
          View this post on Cube
        </p>
      </div>
    </div>
  );
}
