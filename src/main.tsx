import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Home from "./pages/Home.tsx";
// import Chat from "./pages/Chat.tsx";
import Channel from "./pages/Channel.tsx";
import Profile from "./pages/Profile.tsx";
import Post from "./pages/Post.tsx";
import Group from "./pages/Group.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      {/* <Route path="chat/:chatId" element={<Chat />} /> */}
      <Route path="c/:channelId" element={<Channel />} />
      <Route path="u/:username" element={<Profile />} />
      <Route path="p/:postId" element={<Post />} />
      <Route path="g/:groupId" element={<Group />} />
    </Route>
  )
);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />,
  </StrictMode>
);
