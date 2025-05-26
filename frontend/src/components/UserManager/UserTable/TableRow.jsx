import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import "./style.css"; // viết CSS ở dưới vào đây nếu chưa có

const TableRow = ({
  id,
  full_name,
  email,
  address,
  createdAt,
  role,
  onUserDeleted,
}) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("vi-VN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const handleViewDetail = () => {
    navigate(`/users/${id}`);
  };

  const handleDeleteUser = async () => {
    const confirmDelete = window.confirm(
      "Bạn có chắc muốn xoá người dùng này?"
    );
    if (!confirmDelete) return;

    try {
      alert("Xoá thành công!");
      onUserDeleted(id);
    } catch (error) {
      console.error(error);
    }
  };

  // Đóng menu khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <tr>
      <td className="py-3">{full_name}</td>
      <td className="py-3">{email}</td>
      <td className="py-3">{address}</td>
      <td className="py-3">{formatDate(createdAt)}</td>
      <td className="py-3">
        <span className="badge bg-primary text-white">{role}</span>
      </td>
      <td
        className="py-3 text-center"
        style={{ position: "relative" }}
        ref={menuRef}
      >
        <span
          onClick={() => setShowMenu((prev) => !prev)}
          style={{ cursor: "pointer" }}
        >
          <BsThreeDots size={20} />
        </span>

        {showMenu && (
          <div className="custom-dropdown-menu">
            <div className="custom-dropdown-item" onClick={handleViewDetail}>
              Chi tiết
            </div>
            <div
              className="custom-dropdown-item text-danger"
              onClick={handleDeleteUser}
            >
              Xoá
            </div>
          </div>
        )}
      </td>
    </tr>
  );
};

export default TableRow;
