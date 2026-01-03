// pages/Post.tsx
import { useParams, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import { POST_BY_ID } from "../services/resolve";
export interface FeedPost {
  _id: string;
  id: string;

  isRepost: boolean | null;
  repostChain: string | null;
  originalPostID: string | null;

  userID: string;
  productID: string | null;
  businessID: string | null;

  isOwner: boolean;

  text: string;
  category: string;

  imageURL: string | null;
  videoURL: string | null;

  resource: {
    thumbnail: string;
    hls: string;
  } | null;

  likeCount: number;
  viewCount: number;
  repostCount: number;

  isDeleted: boolean;
  isLive: boolean;

  liveMeta: {
    roomName: string;
    liveTitle: string;
    liveDesc: string;
    liveToken: string;
    likeCount: number;
    viewCount: number;
    activeViewers: string[];
    liveType: "NORMAL" | string;
    videoPaused: boolean;
    micMuted: boolean;
    giftingPaused: boolean;
    commentMuted: boolean;
  } | null;

  createdAt: string; // ISO date
  updatedAt: string; // ISO date

  __v: number;

  comments: any[]; // you can strongly type this later
  commentCount: number;

  isLiked: boolean;

  displayImg: string;
  username: string;

  isFollowing: boolean | null;
  hasChannel: boolean;

  channelInfo: {
    businessName: string;
    image: string;
  } | null;
}

export default function Post() {
  const { postId } = useParams<{ postId: string }>();
  const [searchParams] = useSearchParams();
  const [post, setPost] = useState<FeedPost>();

  const [isMobile, setIsMobile] = useState(false);

  // Extract and safely decode data from URL
  const rawText = searchParams.get("text");
  const rawImages = searchParams.get("images");
  console.log(postId, "postID", rawText);

  const process = async () => {
    const res = await POST_BY_ID({
      id: postId!,
    });

    if (!res?.success) return;

    setPost(res?.data);
    console.log(res, "obstruction");
  };

  useEffect(() => {
    process();
  }, [postId]);
  const text = rawText
    ? decodeURIComponent(rawText)
    : "This post was shared from Cube.";

  // Parse images array safely
  let images: string[] = [];
  if (rawImages) {
    try {
      const parsed = JSON.parse(decodeURIComponent(rawImages));
      if (Array.isArray(parsed)) {
        images = parsed.filter(
          (url: any) => typeof url === "string" && url.startsWith("http")
        );
      }
    } catch (error) {
      console.warn("Failed to parse images from URL:", error);
    }
  }

  useEffect(() => {
    // Detect if user is on mobile (iOS or Android)
    const mobileRegex = /Android|iPhone|iPad|iPod/i;
    setIsMobile(mobileRegex.test(navigator.userAgent));
  }, []);

  const openApp = () => {
    if (!postId) return;

    // Deep link into the app
    window.location.href = `cubeapp://SubscribedChannels/${postId}`;

    // Fallback to web after 1.2 seconds if app doesn't open
    // setTimeout(() => {
    //   if (document.hasFocus()) {
    //     window.location.href = `https://cubechat.org/p/${postId}`;
    //   }
    // }, 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e7f0fd] via-[#f6f8fc] to-[#ffffff]">
      <div className="flex justify-center px-4 py-8">
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-5">
          {/* Author Section - Simple placeholder (can be enhanced later) */}
          <div className="flex items-center gap-3">
            {/* <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2AABEE] to-[#229ED9] flex items-center justify-center text-white font-bold text-lg">
              C
            </div> */}
            {/* <div>
              <p className="text-sm font-semibold text-neutral-900">
                Cube User
              </p>
              <p className="text-xs text-neutral-500">@cubeapp</p>
            </div> */}
          </div>

          {/* Post Text */}
          <p className="text-sm text-neutral-800 leading-relaxed whitespace-pre-wrap">
            {post?.text}
          </p>
          <img
            // key={index}
            src={post?.resource?.thumbnail}
            alt={`Shared image `}
            className="rounded-lg object-cover w-full h-auto max-h-96"
            loading="lazy"
          />
        

          {/* Timestamp */}
          {/* <p className="text-xs text-neutral-400">Just now</p> */}

          {/* Action Buttons */}
          <div className="w-full flex flex-col gap-3 mt-4">
            {/* Show only on mobile */}
            {isMobile && (
              <button
                onClick={openApp}
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition text-white font-medium text-base"
              >
                Open in App
              </button>
            )}

            {/* Always show web view option */}
            {/* <a
              href={`https://cubechat.org/p/${postId}`}
              className="w-full py-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 transition text-center font-medium text-neutral-900"
            >
              View on Web
            </a> */}
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
