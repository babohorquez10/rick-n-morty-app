import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

function MainPage() {
  return (
    <div className="h-screen grid grid-cols-sidebar">
      <div className="bg-gray-200">
        <Sidebar />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default MainPage;
