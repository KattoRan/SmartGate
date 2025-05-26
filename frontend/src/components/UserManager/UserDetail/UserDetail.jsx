import { Container, Image, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUser, updateUser } from "../../../services/user-service";
import "./UserDetail.css";

export default function UserProfile() {
  const { id } = useParams(); // lấy id từ URL
  const navigate = useNavigate(); // dùng để quay lại
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const res = await getUser(id);
        setUser(res.user);
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserDetail();
  }, [id]);
  const handleUpdateUser = async () => {
    try {
      const res = await updateUser(id, user);
      if (res.data.EC === 0) {
        alert("Cập nhật thành công!");
      } else {
        alert("Cập nhật thất bại: " + res.data.EM);
      }
    } catch (error) {
      console.error("Update failed:", error);
      alert("Lỗi hệ thống khi cập nhật.");
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <p>Không tìm thấy người dùng.</p>
      </div>
    );
  }
  return (
    <Container fluid className="user-profile-wrapper">
      <h2>User Profile</h2>
      <div className="user-box">
        <div className="profile-row">
          <div className="profile-left">
            <Image src={user.avatar} roundedCircle className="profile-img" />
            <div className="info-detail">
              <div className="group-info-gr">
                <p className="group-name-gr">{user.full_name}</p>
              </div>
              <div className="group-info-gr">
                <p className="group-name-gr">{user.email}</p>
              </div>
              <div className="group-info-gr">
                <p className="group-name-gr">{user.phone}</p>
              </div>
            </div>
          </div>
          <div className="profile-right">
            <button className="btn-upload">Upload New Photo</button>
            <button className="btn-delete">Delete</button>
          </div>
        </div>
      </div>

      <form className="user-form">
        <div className="form-row">
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" value={user.full_name} readOnly />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={user.email} readOnly />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>CitizenID</label>
            <input type="text" value={user.citizen_id} readOnly />
          </div>
          <div>
            <div className="form-group">
              <label>Gender</label>
              <input type="text" value={user.gender} readOnly />
            </div>

            <div className="form-group">
              <label>Birthday</label>
              <input type="date" value={user.dob} readOnly />
            </div>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Address</label>
            <input
              type="email"
              value={user.address}
              readOnly={!editMode}
              onChange={(e) => setUser({ ...user, address: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              value={user.phone}
              readOnly={!editMode}
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
            />
          </div>
        </div>
      </form>
      <div className="button-row">
        <button
          className={`btn ${editMode ? "btn-success" : "btn-primary"}`}
          onClick={async () => {
            if (editMode) {
              await handleUpdateUser();
            }
            setEditMode(!editMode);
          }}
        >
          {editMode ? "Save" : "Edit"}
        </button>

        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    </Container>
  );
}
