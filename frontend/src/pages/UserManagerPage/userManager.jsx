// pages/UserListPage.jsx
import Sidebar from "../../components/Sidebar/Sidebar";
import ListAddNavbar from "../../components/UserManager/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import "./style.css";
export default function UserListPage() {
  return (
    <div className="app-content d-flex">
      <Sidebar />

      <div className="flex-grow-1">
        <ListAddNavbar />

        {/* Khu vực nội dung chính */}
        <main className="page-content p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
