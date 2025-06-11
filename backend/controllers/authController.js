const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const createToken = (user) => {
  return jwt.sign(
    { id: user.user_id, email: user.email },
    process.env.JWT_SECRET || "secret-key",
    { expiresIn: "1d" }
  );
};
exports.login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "Tài khoản không tồn tại" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch && user.password !== password) {
      return res.status(400).json({ message: "Mật khẩu không chính xác" });
    }

    const token = createToken(user);
    res.status(200).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.full_name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server khi đăng nhập" });
  }
};
exports.register = async (req, res) => {
  try {
    const { email, citizenId, password } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: "Chưa upload ảnh!" });
    }
    const fileName = req.file.filename;
    const imageUrl = `/uploads/${fileName}`;
    await User.create({
      email: email,
      citizen_id: citizenId,
      password: password,
      avatar: imageUrl,
    });
    res.status(200).json({ message: "Đăng ký tài khoản thành công" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server khi đăng ký" });
  }
};
