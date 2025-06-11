import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Navbar, Nav, Offcanvas } from "react-bootstrap";
import logo from "../../assets/logo.png";
import {
  BsHouseDoorFill,
  BsPeopleFill,
  BsCreditCard2FrontFill,
  BsBarChartFill,
  BsGearFill,
  BsShieldLockFill,
  BsQuestionCircleFill,
  BsPersonCircle,
} from "react-icons/bs";
import "./Sidebar.css";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  // Lấy role từ localStorage khi component mount
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setIsAdmin(parsedUser.role === "admin");
      } catch (err) {
        console.error("Lỗi phân tích dữ liệu user từ localStorage", err);
      }
    }
  }, []);

  const isActive = (to, exact = false) => {
    return exact ? location.pathname === to : location.pathname.startsWith(to);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <Navbar expand="lg" className="sidebar-navbar">
      <div className="sidebar-header">
        <Navbar.Brand
          as={Link}
          to="/admin/home/dashboard"
          className="sidebar-brand"
        >
          <img
            src={logo}
            alt="SmartGate Logo"
            className="d-inline-block align-top logo"
          />
        </Navbar.Brand>
      </div>
      <Navbar.Offcanvas
        id="sg-sidebar"
        aria-labelledby="sg-sidebar-label"
        placement="start"
        className="bg-body border-end"
      >
        <Offcanvas.Body>
          <hr className="divider" />
          <Nav className="sidebar-nav flex-column">
            <Nav.Link
              as={Link}
              to="/admin/home/dashboard"
              active={isActive("/admin/home/dashboard", true)}
            >
              <BsHouseDoorFill size={18} /> Dashboard
            </Nav.Link>
          </Nav>

          {isAdmin && (
            <>
              <hr className="divider" />
              <Nav className="sidebar-nav flex-column">
                <Nav.Link
                  as={Link}
                  to="/admin/users"
                  active={isActive("/admin/users")}
                >
                  <BsPeopleFill size={18} /> Người dùng
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/admin/cards"
                  active={isActive("/admin/cards")}
                >
                  <BsCreditCard2FrontFill size={18} /> Thẻ ra vào
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/admin/stats"
                  active={isActive("/admin/stats")}
                >
                  <BsBarChartFill size={18} /> Thống kê
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/admin/settings"
                  active={isActive("/admin/settings")}
                >
                  <BsGearFill size={18} /> Cấu hình
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/admin/security"
                  active={isActive("/admin/security")}
                >
                  <BsShieldLockFill size={18} /> Quản trị
                </Nav.Link>
              </Nav>
            </>
          )}

          <hr className="divider" />
          <div className="sidebar-footer">
            <Nav className="flex-column">
              <Nav.Link as={Link} to="/help" active={isActive("/help", true)}>
                <BsQuestionCircleFill size={18} /> Hỗ trợ
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/account"
                active={isActive("/account", true)}
              >
                <BsPersonCircle size={18} /> Tài khoản
              </Nav.Link>
              <Nav.Link onClick={handleLogout} style={{ cursor: "pointer" }}>
                <BsShieldLockFill size={18} /> Đăng xuất
              </Nav.Link>
            </Nav>
          </div>
        </Offcanvas.Body>
      </Navbar.Offcanvas>
    </Navbar>
  );
}

export default Sidebar;
