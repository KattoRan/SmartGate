import { useEffect, useState, useCallback } from "react";
import "./style.css";
import { Table } from "react-bootstrap";
import {
  getAllUser,
  searchUser,
  deleteUser,
} from "../../../services/user-service";
import TableRow from "./TableRow";
import { FaSearch } from "react-icons/fa";
import Pagination from "../../Pagination/Pagination.jsx";

const UserManager = () => {
  const [currentUsers, setCurrentUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const fetchUsers = useCallback(async () => {
    try {
      const params = {
        page: currentPage,
        limit: itemsPerPage,
      };

      const response =
        searchText.trim() !== ""
          ? await searchUser({ ...params, searchText })
          : await getAllUser(params);

      setCurrentUsers(response.users);
      setTotalPages(response.totalPages);
      setTotalItems(response.totalItems); // Backend cần trả về totalItems
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, [searchText, currentPage, itemsPerPage]);

  const handleUserDeleted = async (id) => {
    await deleteUser(id);
    setCurrentUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    // load lại danh sách người dùng
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Khi thay đổi text tìm kiếm → reset page về 1
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setCurrentPage(1);
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [searchText]);

  return (
    <div className="p-4 user-manage-container">
      <h2 className="mb-4">User Management</h2>
      <div className="search-box">
        <span className="search-icon">
          <FaSearch />
        </span>
        <input
          type="text"
          className="search-input"
          placeholder="Search user..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <Table className="mt-3">
        <thead>
          <tr>
            <th>FullName</th>
            <th>Email</th>
            <th>Address</th>
            <th>Joined</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, idx) => (
            <TableRow key={idx} {...user} onUserDeleted={handleUserDeleted} />
          ))}
        </tbody>
      </Table>

      {/* Pagination Component */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={(page) => setCurrentPage(page)}
        onItemsPerPageChange={(e) => setItemsPerPage(Number(e.target.value))}
      />
    </div>
  );
};

export default UserManager;
