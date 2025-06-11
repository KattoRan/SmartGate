const fs = require("fs");
const path = require("path");
const express = require("express");
const multer = require("multer");
const router = express.Router();
const userController = require("../controllers/userController");
const verifyToken = require("../middleware/verify-token");
// Cấu hình multer lưu file tạm vào thư mục uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, "..", "uploads"); // ./backend/uploads
    fs.mkdirSync(dir, { recursive: true }); // tạo nếu chưa có
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });
router.get("/", verifyToken, userController.getAll);
router.post(
  "/",
  verifyToken,
  upload.single("avatar"),
  userController.createUser
);
router.get("/search", userController.searchUser);
router.get("/:id", userController.getOne);
router.put(
  "/:id",
  verifyToken,
  upload.single("avatar"),
  userController.updateUser
);

module.exports = router;
