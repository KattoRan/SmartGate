// models/User.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const bcrypt = require("bcryptjs");
const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    full_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    dob: {
      type: DataTypes.DATEONLY,
    },
    gender: {
      type: DataTypes.ENUM("Male", "Female", "Other"),
    },
    address: {
      type: DataTypes.STRING(255),
    },
    citizen_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    avatar: {
      type: DataTypes.TEXT, // base64 hoặc URL ảnh
    },
    email: {
      type: DataTypes.STRING(100),
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    role: {
      type: DataTypes.ENUM("admin", "user"),
      defaultValue: "user",
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true, // hoặc false nếu muốn bắt buộc nhập
      validate: {
        is: /^[0-9+\-() ]*$/i, // regex cơ bản cho số điện thoại
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "users", // nếu muốn rõ tên bảng trong DB
    timestamps: true, // tạo tự động createdAt và updatedAt
    underscored: true, // tên cột theo kiểu snake_case
  }
);
// ✅ Tự động hash password trước khi lưu
User.beforeCreate(async (user, options) => {
  user.password = await bcrypt.hash(user.password, 10);
});

// ✅ So sánh password khi login
User.prototype.comparePassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};
module.exports = User;
