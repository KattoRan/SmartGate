// frontend/vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "localhost", // hoặc '0.0.0.0' nếu muốn truy cập từ mạng LAN
    port: 3000, // thay đổi cổng tại đây
    open: false, // tự động mở trình duyệt khi chạy
    historyApiFallback: true,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
    },
    cors: {
      origin: "http://localhost:3000", // cho phép frontend truy cập
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    },
  },
});
