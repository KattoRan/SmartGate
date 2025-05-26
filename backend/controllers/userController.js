const { Op } = require("sequelize");
const User = require("../models/UserModel");
exports.getAll = async (req, res) => {
  try {
    const users = await User.findAll();
    //console.log("user:", users);
    if (!users || users.length === 0) {
      return res
        .status(400)
        .json({ message: "Không có dữ liệu trong database" });
    }

    // Trả về mảng users luôn
    res.status(200).json({ users });
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
