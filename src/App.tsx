import { Outlet } from "react-router";
import MainHeader from "./components/MainHeader";

function App({}) {
  return (
    <>
      <MainHeader />
      <Outlet />
    </>
  );
}

export default App;
