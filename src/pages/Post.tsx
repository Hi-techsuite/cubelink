import { useParams, useSearchParams } from "react-router";
import { useEffect, useState } from "react";

export default function Post() {
  const { postId } = useParams<{ postId: string }>();
  const [searchParams] = useSearchParams();

  const [isMobile, setIsMobile] = useState(false);

  // Extract shared data from URL
  const sharedText = searchParams.get("text");
  const sharedImagesParam = searchParams.get("images");

  // Parse images safely
  let images: string[] = [];
  if (sharedImagesParam) {
    try {
      images = JSON.parse(decodeURIComponent(sharedImagesParam));
      if (!Array.isArray(images)) images = [];
    } catch (e) {
      console.warn("Failed to parse images from URL");
      images = [];
    }
  }

  // Use shared data if available, otherwise fallback
  const content = sharedText
    ? decodeURIComponent(sharedText)
    : "This is a shared post from Cube.";
  const hasMedia = images.length > 0;

  useEffect(() => {
    setIsMobile(/Android|iPhone|iPad|iPod/i.test(navigator.userAgent));
  }, []);

  const openApp = () => {
    window.location.href = `cubeapp://post/${postId}`;
    setTimeout(() => {
      window.location.href = `https://cubechat.org/p/${postId}`;
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#dff1e8,#e8f0ff,#ffffff)] px-4 flex justify-center">
      <div className="w-full max-w-sm pt-[14vh] pb-12">
        <div className="bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-6 flex flex-col gap-4">
          {/* Author (you can enhance this later with real user data) */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2AABEE] to-[#229ED9] flex items-center justify-center text-white font-bold text-lg">
              C
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-neutral-900">
                Cube User
              </p>
              <p className="text-xs text-neutral-500">@cubeapp</p>
            </div>
          </div>

          {/* Post Text */}
          <p className="text-sm text-neutral-800 leading-relaxed whitespace-pre-wrap">
            {content}
          </p>

          {/* Images Grid */}
          {hasMedia && (
            <div
              className={`grid ${
                images.length === 1 ? "grid-cols-1" : "grid-cols-2"
              } gap-2 mt-2`}
            >
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Shared media ${i + 1}`}
                  className="rounded-lg object-cover w-full h-full max-h-80"
                  loading="lazy"
                />
              ))}
            </div>
          )}

          {/* Timestamp */}
          <p className="text-xs text-neutral-400">Just now</p>

          {/* Actions */}
          <div className="flex flex-col gap-3 mt-4">
            {isMobile && (
              <button
                onClick={openApp}
                className="w-full py-3 rounded-xl bg-[#2AABEE] hover:bg-[#229ED9] transition text-white font-semibold text-base"
              >
                Open in Cube App
              </button>
            )}

            <a
              href={`https://cubechat.org/p/${postId}`}
              className="w-full py-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 transition text-center font-semibold text-neutral-900"
            >
              View on Web
            </a>
          </div>

          {/* Footer */}
          <p className="text-xs text-neutral-500 text-center mt-4">
            Shared via <span className="font-semibold">Cube</span>
          </p>
        </div>
      </div>
    </div>
  );
}
