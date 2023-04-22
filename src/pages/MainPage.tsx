import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

function MainPage() {
  return (
    <div className="h-screen grid grid-cols-sidebar overflow-hidden">
      <div className="h-screen">
        <Sidebar />
      </div>
      <div className="h-screen px-4 py-10 shadow-detailShadow">
        <Outlet />
      </div>
    </div>
  );
}

export default MainPage;
