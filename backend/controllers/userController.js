const { Op } = require("sequelize");
const User = require("../models/UserModel");
exports.getAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await User.findAndCountAll({
      limit,
      offset,
      order: [["createdAt", "DESC"]], // tuỳ sắp xếp theo nhu cầu
    });

    if (!rows || rows.length === 0) {
      return res
        .status(400)
        .json({ message: "Không có dữ liệu trong database" });
    }

    const totalPages = Math.ceil(count / limit);

    res.status(200).json({
      users: rows,
      totalItems: count,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server khi lấy dữ liệu" });
  }
};

exports.getOne = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const user = await User.findOne({ where: { id: id } });
    //console.log("user:", users);
    if (!user) {
      return res.status(400).json({ message: "Không tìm thấy người dùng" });
    }

    // Trả về mảng users luôn
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server khi lấy dữ liệu" });
  }
};
exports.searchUser = async (req, res) => {
  const { searchText = "" } = req.query;

  try {
    const users = await User.findAll({
      where: {
        [Op.or]: [
          {
            full_name: {
              [Op.like]: `%${searchText}%`,
            },
          },
          {
            email: {
              [Op.like]: `%${searchText}%`,
            },
          },
          {
            address: {
              [Op.like]: `%${searchText}%`,
            },
          },
        ],
      },
    });

    res.status(200).json({ users });
  } catch (error) {
    console.error("Lỗi khi tìm kiếm lớp:", error);
    res.status(500).json({ error: "Lỗi server" });
  }
};
exports.updateUser = async (req, res) => {
  const id = req.params.id;
  const { full_name, phone, dob, address, gender } = req.body;
  let avatar = req.file ? `/uploads/${req.file.filename}` : null; // Lấy đường dẫn ảnh từ file upload
  if (!avatar) {
    avatar = null; // Nếu không có file, đặt avatar là null
  }
  try {
    const user = await User.findOne({ where: { id: id } });
    if (!user) {
      return res.status(400).json({ message: "Không tìm thấy người dùng" });
    }

    // Cập nhật thông tin người dùng
    user.full_name = full_name || user.full_name;
    user.phone = phone || user.phone;
    user.dob = dob || user.dob;
    user.address = address || user.address;
    user.avatar = avatar || user.avatar;
    user.gender = gender || user.gender;

    await user.save();

    res.status(200).json({ message: "Cập nhật thành công", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server khi cập nhật người dùng" });
  }
};
exports.createUser = async (req, res) => {
  const {
    full_name,
    email,
    phone,
    dob,
    address,
    gender,
    citizen_id,
    password,
  } = req.body;
  let avatar = req.file ? `/uploads/${req.file.filename}` : null; // Lấy đường dẫn ảnh từ file upload
  if (!avatar) {
    avatar = null; // Nếu không có file, đặt avatar là null
  }

  try {
    const user = await User.create({
      full_name,
      email,
      phone,
      dob,
      address,
      gender,
      avatar,
      password,
      citizen_id,
      role: "user", // Mặc định là user, có thể thay đổi nếu cần
    });

    res.status(201).json({ message: "Tạo người dùng thành công", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server khi tạo người dùng" });
  }
};
