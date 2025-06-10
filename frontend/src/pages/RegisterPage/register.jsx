import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { registerUser } from "../../services/auth-service";

function Register() {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState("");
  const [citizenId, setCitizenId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !citizenId || !password || !confirmPassword || !file) {
      setError("Bạn cần nhập đủ thông tin còn thiếu!");
      return;
    }

    if (password.length < 8) {
      setError("Password phải có ít nhất 8 ký tự!");
      return;
    }

    if (password !== confirmPassword) {
      setError("Mật khẩu nhập lại sai! Vui lòng nhập lại...");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);
    formData.append("email", email);
    formData.append("citizenId", citizenId);
    formData.append("password", password);

    try {
      const response = await registerUser(formData);
      console.log("Đăng ký thành công:", response);
      alert("Đăng ký thành công");
      navigate("/login");
    } catch (error) {
      setError(error.message || "Đăng ký thất bại");
    }
  };

  const handleLogin = () => {
    navigate("/");
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h1 className="title">SmartGate</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Hãy nhập email của bạn"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Hãy nhập mật khẩu của bạn"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Hãy nhập lại mật khẩu của bạn"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>

          <div className="form-group">
            <label>Citizen ID Number</label>
            <input
              type="text"
              maxLength={12}
              value={citizenId}
              placeholder="Hãy nhập số CMND/CCCD của bạn"
              onChange={(e) => setCitizenId(e.target.value)}
              required
            />
          </div>

          <div className="form-group-upload">
            <label>Upload Photo</label>
            <div className="upload-group">
              {preview ? (
                <img src={preview} alt="preview" className="avatar-preview" />
              ) : (
                <img
                  src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
                  alt="avatar"
                  className="avatar-preview empty"
                />
              )}
              <label className="btn secondary">
                Upload
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  id="avatar"
                  onChange={handleImageUpload}
                  hidden
                />
              </label>
            </div>
          </div>

          {error && <p className="text-danger">{error}</p>}

          <button type="submit" className="btn primary">
            Đăng Ký
          </button>
        </form>

        <hr className="divider" />
        <button className="btn secondary" onClick={handleLogin}>
          Đăng Nhập Ngay
        </button>
      </div>
    </div>
  );
}

export default Register;
