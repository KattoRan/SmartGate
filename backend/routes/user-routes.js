const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const verifyToken = require("../middleware/verify-token");

router.get("/", verifyToken, userController.getAll);
router.get("/search", userController.searchUser);
router.get("/:id", userController.getOne);

module.exports = router;
