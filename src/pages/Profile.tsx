import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { RESOLVE_USERNAME } from "../services/resolve";

interface UserObject {
  id: number;
  username: string;
  firstName: string | null;
  lastName: string | null;
  profilePic: string | null;
  phone: string;
}
export default function Profile() {
  const { username } = useParams();
  // const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [user, setUser] = useState<UserObject>();

  console.log(isMobile, "isMobile");
  // Mocked profile data (replace later with API)
  // const profile = {
  //   name: "Cube User",
  //   username,
  //   bio: "Building cool things with Cube 🚀",
  //   avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=" + username,
  // };

  // resolver

  const process = async () => {
    const res = await RESOLVE_USERNAME({
      username: username!,
      isBusiness: false,
    });

    if (!res?.success) return;

    setUser(res?.finalResult);
    console.log(res, "obstruction");
  };

  useEffect(() => {
    process();
  }, [username]);

  useEffect(() => {
    setIsMobile(/Android|iPhone|iPad|iPod/i.test(navigator.userAgent));
  }, []);

  // const openApp = () => {
  //   const deepLink = `cubeapp://ProfileScreen/${user?.id}`;
  //   const fallback = `https://cubechat.org/user/${username}`;

  //   window.location.href = deepLink;

  //   setTimeout(() => {
  //     window.location.href = fallback;
  //   }, 1200);
  // };

  const normalizedName = () => {
    if (user?.firstName === null || user?.lastName === null)
      return user?.username;

    if (user?.firstName === undefined || user?.lastName === undefined)
      return user?.username || "##";
    return `${user?.firstName} ${user?.lastName}`;
  };
  return (
    <div className="min-h-screen bg-linear-to-b from-[#e7f0fd] via-[#f6f8fc] to-[#ffffff]">
      {/* Content */}
      <div className="flex justify-center px-4 py-8">
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center gap-4">
          {/* Avatar */}
          <img
            src={user?.profilePic!}
            alt="avatar"
            className="w-24 h-24 rounded-full bg-neutral-100"
          />

          {/* Name & username */}
          <div className="text-center">
            <h1 className="text-xl font-semibold text-neutral-900">
              {normalizedName()}
            </h1>
            <p className="text-sm text-neutral-500">@{user?.username}</p>
          </div>

          {/* Bio */}
          {/* <p className="text-sm text-neutral-700 text-center">{profile.bio}</p> */}

          {/* Actions */}
          {/* <div className="w-full flex flex-col gap-3 mt-4">
            {isMobile && (
              <button
                onClick={openApp}
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition text-white font-medium"
              >
                Open in App
              </button>
            )}

            <a
              href={`https://cubechat.org/user/${username}`}
              className="w-full py-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 transition text-center font-medium text-neutral-900"
            >
              Open Web
            </a>
          </div> */}

          {/* Footer */}
          <p className="text-xs text-neutral-500 mt-2">
            View this profile on CubeÏ
          </p>
        </div>
      </div>
    </div>
  );
}
