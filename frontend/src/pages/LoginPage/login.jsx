import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { loginUser } from "../../services/auth-service.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const data = { email, password };
    if (!email) setError("Vui lòng nhập email");
    else if (!password) setError("Vui lòng nhập mật khẩu");
    else {
      try {
        const userData = await loginUser(data);
        console.log("Đăng nhập thành công:", userData);
        sessionStorage.setItem("token", userData.token);
        localStorage.setItem("user", JSON.stringify(userData.user));
        navigate("/home");
      } catch (error) {
        setError(error.message || "Đăng nhập thất bại");
      }
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="title">SmartGate</h1>

        {error && <p className="text-danger">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Hãy nhập email của bạn"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="password-input-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Hay nhập mật khẩu của bạn"
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

          <button type="submit" className="btn primary">
            Đăng Nhập
          </button>
        </form>

        <hr className="divider" />

        <button className="btn secondary" onClick={handleRegister}>
          Đăng Ký Ngay
        </button>
      </div>

      <div className="right-avatar">
        <img
          src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
          alt="avatar"
        />
      </div>

      <div className="background-shape" />
    </div>
  );
};

export default Login;
