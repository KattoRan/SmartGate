import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { registerUser } from "../../services/auth-service";

function Register() {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState("");
  const [fullName, setName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
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

    if (
      !email ||
      !fullName ||
      !dob ||
      !gender ||
      !address ||
      !phone ||
      !citizenId ||
      !password ||
      !confirmPassword ||
      !file
    ) {
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
    formData.append("fullName", fullName);
    formData.append("dob", dob);
    formData.append("gender", gender);
    formData.append("address", address);
    formData.append("phone", phone);
    formData.append("citizenId", citizenId);
    formData.append("password", password);

    try {
      const response = await registerUser(formData);
      console.log("Đăng ký thành công:", response);
      alert("Đăng ký thành công");
      navigate("/login");
    } catch (error) {
      setError(error.message || "Register failed");
    }
  };
  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h1 className="title">SmartGate</h1>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            onChange={(e) => setName(e.target.value)}
            value={fullName}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
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

        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm your password"
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

        <div className="form-group">
          <label>Date of Birth</label>
          <input
            type="date"
            onChange={(e) => setDob(e.target.value)}
            value={dob}
            required
          />
        </div>

        <div className="form-group">
          <label>Gender</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={gender === "Male"}
                onChange={(e) => setGender(e.target.value)}
              />{" "}
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={gender === "Female"}
                onChange={(e) => setGender(e.target.value)}
              />{" "}
              Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Other"
                checked={gender === "Other"}
                onChange={(e) => setGender(e.target.value)}
              />{" "}
              Other
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Citizen ID Number</label>
          <input
            type="text"
            maxLength={12}
            value={citizenId}
            placeholder="Enter your Citizen ID Number"
            onChange={(e) => setCitizenId(e.target.value)}
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
                onChange={handleImageUpload}
                hidden
              />
            </label>
          </div>
        </div>
        {error && <p className="text-danger">{error}</p>}

        <button type="submit" className="btn primary" onClick={handleSubmit}>
          Register
        </button>
        <hr className="divider" />
        <button className="btn secondary" onClick={handleLogin}>
          Login Now
        </button>
      </div>
    </div>
  );
}

export default Register;
