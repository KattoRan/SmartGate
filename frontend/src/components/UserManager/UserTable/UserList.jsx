import { useEffect, useState } from "react";
import "./style.css";
import { Table } from "react-bootstrap";
import { getAllUser, searchUser } from "../../../services/user-service";
import TableRow from "./TableRow";
import { FaSearch } from "react-icons/fa";

const UserManager = () => {
  const [currentUsers, setCurrentUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [, setResult] = useState([]);
  const fetchUsers = async () => {
    try {
      const response = await getAllUser();
      //console.log("user:", response);
      setCurrentUsers(response.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  const handleUserDeleted = (id) => {
    setCurrentUsers((prev) => prev.filter((user) => user.id !== id));
  };

  useEffect(() => {
    fetchUsers(); // Gọi khi component mount
  }, []);
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchText.trim() !== "") {
        const searchResponse = await searchUser({ searchText });
        setCurrentUsers(searchResponse.users);
      } else {
        setResult([]); // nếu không có gì thì xoá kết quả
      }
    }, 300); // 300ms debounce

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
          placeholder=""
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
    </div>
  );
};

export default UserManager;
