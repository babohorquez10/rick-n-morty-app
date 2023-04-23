import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

function MainPage() {
  return (
    <div className="h-screen md:grid md:grid-cols-sidebar overflow-hidden md:block">
      <div className="h-screen">
        <Sidebar />
      </div>
      <div className="h-screen shadow-detailShadow hidden md:block">
        <Outlet />
      </div>
    </div>
  );
}

export default MainPage;
