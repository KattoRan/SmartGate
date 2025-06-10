import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Thêm useNavigate
import { getUser, updateUser } from "../../../services/user-service";
import "./UserDetail.css";

export default function UserProfile() {
  const { id } = useParams();
  const navigate = useNavigate(); // Khởi tạo navigate
  const [profile, setProfile] = useState({});
  const [editedProfile, setEditedProfile] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUser(id);
      setProfile(res.user);
      setEditedProfile(res.user);
    };
    fetchUser();
  }, [id]);

  const avatarSrc =
    previewImage || profile.avatar || "/images/default_avatar.png";

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    setIsEditing(false);
    setEditedProfile(profile);
    setPreviewImage(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      // bạn có thể upload ảnh tại đây nếu cần
    }
  };

  const handleSave = async () => {
    try {
      const res = await updateUser(id, editedProfile);
      if (res.data.EC === 0) {
        setProfile(editedProfile);
        setIsEditing(false);
        alert("Cập nhật thành công!");
      } else {
        alert("Cập nhật thất bại: " + res.data.EM);
      }
    } catch (error) {
      console.error("Update failed:", error);
      alert("Lỗi hệ thống khi cập nhật.");
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = () => {
    const { oldPassword, newPassword, confirmPassword } = passwordData;
    let newErrors = {};
    if (!oldPassword) newErrors.oldPassword = "Không được để trống";
    if (newPassword.length < 6) newErrors.newPassword = "Tối thiểu 6 ký tự";
    if (newPassword !== confirmPassword)
      newErrors.confirmPassword = "Mật khẩu không khớp";
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      // gọi API đổi mật khẩu tại đây
      alert("Đổi mật khẩu thành công (giả lập)");
      setShowPasswordModal(false);
    }
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-content-container">
        <div className="profile-content">
          {/* Nút Back và Change Password cùng hàng, bên phải */}
          <div className="profile-header-actions">
            <button
              className="profile-back-button"
              onClick={() => navigate(-1)}
              type="button"
            >
              ← Back
            </button>
            <button
              className="profile-change-password-fixed"
              onClick={() => setShowPasswordModal(true)}
              type="button"
            >
              Change Password
            </button>
          </div>

          <div className="profile-header">
            <img
              src={avatarSrc}
              alt={profile.username || "User"}
              className="profile-avatar-small"
              onError={(e) => {
                e.target.src = "/images/default_avatar.png"; // Đặt ảnh mặc định nếu không tải được
              }}
            />
            <div className="profile-info">
              <h2>
                {profile.username || profile.full_name || "Không xác định"}
              </h2>
              <p>{profile.email || "Not provided"}</p>
            </div>
          </div>
          <div className="profile-details">
            <div className="detail-section left-column">
              <div>
                <label>Full Name</label>
                <input
                  type="text"
                  name="full_name"
                  value={editedProfile.full_name || ""}
                  onChange={handleChange}
                  className="profile-edit-input"
                  readOnly={!isEditing}
                />
              </div>
              <div>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email || ""}
                  className="profile-edit-input"
                  readOnly
                />
              </div>
              <div>
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={editedProfile.phone || ""}
                  onChange={handleChange}
                  className="profile-edit-input"
                  readOnly={!isEditing}
                />
              </div>
              <div>
                <label>Citizen ID</label>
                <input
                  type="text"
                  name="citizen_id"
                  value={profile.citizen_id || ""}
                  className="profile-edit-input"
                  readOnly
                />
              </div>
              <div>
                <label>Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={profile.dob || ""}
                  className="profile-edit-input"
                  readOnly={!isEditing}
                />
              </div>
              <div>
                <label>Gender</label>
                <select
                  name="gender"
                  value={editedProfile.gender || ""}
                  onChange={handleChange}
                  className="profile-edit-input"
                  disabled={!isEditing}
                >
                  <option value="">-- Select --</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={editedProfile.address || ""}
                  onChange={handleChange}
                  className="profile-edit-input"
                  readOnly={!isEditing}
                />
              </div>
            </div>

            <div className="detail-section right-column">
              <label>Avatar</label>
              {isEditing ? (
                <div>
                  <input
                    type="file"
                    name="avatar"
                    onChange={handleAvatarChange}
                    className="profile-edit-input"
                    accept="image/*"
                  />
                  <div className="profile-avatar-preview-container">
                    <img
                      src={avatarSrc}
                      alt="Preview"
                      className="profile-avatar-preview"
                    />
                  </div>
                </div>
              ) : (
                <img
                  src={avatarSrc}
                  alt="Avatar"
                  className="profile-avatar-preview"
                />
              )}
            </div>
          </div>

          <div className="profile-actions">
            {isEditing ? (
              <>
                <button
                  className="profile-cancel-button"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button className="profile-done-button" onClick={handleSave}>
                  Done
                </button>
              </>
            ) : (
              <>
                <button className="profile-edit-button" onClick={handleEdit}>
                  Edit
                </button>
                {/* Nút Change Password đã ghim ở trên, có thể bỏ ở đây nếu muốn */}
              </>
            )}
          </div>

          {showPasswordModal && (
            <div className="profile-modal">
              <div className="profile-modal-content">
                <h3>Change your password</h3>
                {["oldPassword", "newPassword", "confirmPassword"].map(
                  (field) => (
                    <div className="profile-modal-section" key={field}>
                      <label>
                        {field === "oldPassword"
                          ? "Old"
                          : field === "newPassword"
                          ? "New"
                          : "Confirm"}{" "}
                        Password
                      </label>
                      <input
                        type="password"
                        name={field}
                        className="profile-modal-label"
                        value={passwordData[field]}
                        onChange={handlePasswordChange}
                        placeholder={`Enter ${field.replace(
                          /Password/,
                          " password"
                        )}`}
                      />
                      {errors[field] && (
                        <p className="profile-error-message">{errors[field]}</p>
                      )}
                    </div>
                  )
                )}
                <div className="profile-modal-actions">
                  <button onClick={() => setShowPasswordModal(false)}>
                    Cancel
                  </button>
                  <button onClick={handlePasswordSubmit}>Set Password</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
