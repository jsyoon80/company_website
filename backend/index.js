require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// 🔽 라우터 모듈 import
const userRoutes = require("./routes/user");
const contactRoutes = require("./routes/contact");
const postRoutes = require("./routes/post");
const uploadRoutes = require("./routes/upload");

// ✅ CORS 설정 (모든 허용 IP + ngrok 주소)
const allowedOrigins = [
  "http://localhost:5173",
  "http://192.168.0.102:5173",
  "http://10.8.8.26:5173",
  "http://172.24.112.1:5173",
  "https://afca-210-87-207-200.ngrok-free.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS 차단됨"));
    }
  },
  credentials: true,
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 🔽 라우터 연결
app.use("/api/auth", userRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/post", postRoutes);
app.use("/api/upload", uploadRoutes);

// 테스트용 기본 라우트
app.get("/", (req, res) => {
  res.send("Hello world");
});

// MongoDB 연결
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB와 연결이 되었습니다."))
  .catch((error) => console.log("❌ MongoDB 연결 실패: ", error));

// 서버 시작
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
