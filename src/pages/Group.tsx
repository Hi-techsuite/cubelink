// src/pages/Group.tsx (or wherever you keep it)
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { RESOLVE_GROUP } from "../services/resolve";

interface memberProps {
  user: number;
  role: string;
  joinedAt: string;
  _id: string;
}
interface GroupProps {
  groupId: string;
  groupName: string;
  TokenName?: string;
  image: string;
  groupDescription: string;
  groupStatus: string;
  username: string;
  createdBy: string;
  createdAt: string;
  membersCount?: number;
  members: [memberProps];
  _id?: string;
  avatar?: {
    url: string;
  };
  name?: string;
  description?: string;
}

export default function Group() {
  const { groupId } = useParams<{ groupId: string }>();
  const [group, setGroup] = useState<GroupProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Better mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Fetch group data
  useEffect(() => {
    if (!groupId) {
      setError("No group ID provided");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    RESOLVE_GROUP(groupId)
      .then((res) => {
        console.log(res, "opium");
        if (res?.success && res.group) {
          setGroup(res.group);
        } else {
          setError(res?.message || "Failed to load group");
        }
      })
      .catch((err) => {
        console.error("Error fetching group:", err);
        setError("Network error. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [groupId]);

  const openApp = () => {
    if (!group) return;

    const deepLink = `cubeapp://ChatScreen/${group?._id}/group`;
    window.location.href = deepLink;

    // Optional fallback for browsers that don't handle custom schemes well
    setTimeout(() => {
      if (!document.hidden) {
        // If app didn't open, redirect to App Store / Play Store
        const isAndroid = /Android/i.test(navigator.userAgent);
        const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

        if (isAndroid) {
          window.location.href =
            "https://play.google.com/store/apps/details?id=your.app.package";
        } else if (isIOS) {
          window.location.href = "https://apps.apple.com/app/idYOUR_APP_ID";
        }
      }
    }, 1000);
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#dff1e8] via-[#e8f0ff] to-white flex justify-center items-start px-4">
        <div className="w-full max-w-sm mt-[15vh]">
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center gap-6 animate-pulse">
            <div className="w-24 h-24 bg-gray-200 rounded-full" />
            <div className="h-6 w-48 bg-gray-200 rounded" />
            <div className="h-4 w-32 bg-gray-200 rounded" />
            <div className="h-16 w-full bg-gray-100 rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error || !group) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#dff1e8] via-[#e8f0ff] to-white flex flex-col justify-center items-center px-4">
        <div className="text-center">
          <p className="text-lg font-medium text-red-600 mb-2">Oops!</p>
          <p className="text-neutral-600">{error || "Group not found"}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-3 bg-[#2AABEE] text-white rounded-xl font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#dff1e8] via-[#e8f0ff] to-white px-4 flex justify-center items-start">
      {/* Centered responsive card */}
      <div className="w-full max-w-sm mt-[12vh] md:mt-[16vh]">
        <div className="bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] p-8 flex flex-col items-center gap-6">
          {/* Avatar */}
          <img
            src={group?.avatar?.url || "/fallback-avatar.png"}
            alt={`${group.groupName} avatar`}
            className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/fallback-avatar.png";
            }}
          />

          {/* Group Info */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-neutral-900">
              {group.name}
            </h1>
            {/* <p className="text-sm text-neutral-500 mt-1">@{group?.name}</p> */}
            {group.members && (
              <p className="text-xs text-neutral-400 mt-2">
                {group.members.length.toLocaleString()} member(s)
              </p>
            )}
          </div>

          {/* Description */}
          {group.description ? (
            <p className="text-sm text-neutral-700 text-center leading-relaxed max-w-xs">
              {group.description}
            </p>
          ) : (
            <p className="text-sm text-neutral-400 italic">
              {group?.description}
            </p>
          )}

          {/* Action Button */}
          <div className="w-full mt-6">
            {isMobile ? (
              <button
                onClick={openApp}
                className="w-full py-4 rounded-xl bg-[#2AABEE] hover:bg-[#229ED9] active:scale-95 transition-all text-white font-semibold text-lg shadow-lg"
              >
                Open in Cube App
              </button>
            ) : (
              <div className="text-center">
                <p className="text-neutral-600 mb-4">
                  Open this link on your phone to join the group in the Cube app
                </p>
                <div className="bg-gray-100 rounded-lg p-4 font-mono text-sm break-all">
                  Open on Web
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <p className="text-xs text-neutral-500 mt-4">
            Powered by Cube • Join the conversation
          </p>
        </div>
      </div>
    </div>
  );
}
