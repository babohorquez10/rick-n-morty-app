import Sidebar from "../components/Sidebar/Sidebar";

function MainPage() {
  return (
    <div className="h-screen grid grid-cols-sidebar">
      <div className="bg-gray-200">
        <Sidebar />
      </div>
      <div>Main</div>
    </div>
  );
}

export default MainPage;
