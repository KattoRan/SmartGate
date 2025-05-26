const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());
const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Routes
const authRoutes = require("./routes/auth-routes");
app.use("/api/auth", authRoutes);
const userRoutes = require("./routes/user-routes");
app.use("/api/user", userRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Sever is running on http://localhost:${PORT}` || 5000)
);
