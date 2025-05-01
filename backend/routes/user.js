const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ✅ 로그인
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).select("+password");

    if (!user) return res.status(401).json({ message: "사용자를 찾을 수 없습니다." });
    if (!user.isActive) return res.status(401).json({ message: "비활성화된 계정입니다." });
    if (user.isLoggedIn) return res.status(401).json({ message: "이미 로그인 중입니다." });

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      user.failedLoginAttempts += 1;
      user.lastLoginAttempt = new Date();
      if (user.failedLoginAttempts >= 5) {
        user.isActive = false;
        await user.save();
        return res.status(401).json({ message: "비밀번호 5회 오류, 계정 비활성화." });
      }
      await user.save();
      return res.status(401).json({
        message: "비밀번호 오류",
        remainingAttempts: 5 - user.failedLoginAttempts,
      });
    }

    // 로그인 성공 처리
    user.failedLoginAttempts = 0;
    user.lastLoginAttempt = new Date();
    user.isLoggedIn = true;
    await user.save();

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // ✅ cross-origin, secure 대응 쿠키 설정
    const isHttps = req.headers.origin?.startsWith("https://");
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" || isHttps,
      sameSite: process.env.NODE_ENV === "production" || isHttps ? "None" : "Lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    res.json({ user: userWithoutPassword });
  } catch (error) {
    console.log("로그인 오류:", error.message);
    res.status(500).json({ message: "서버 오류" });
  }
});

// ✅ 로그아웃
router.post("/logout", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(400).json({ message: "이미 로그아웃됨" });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId);
      if (user) {
        user.isLoggedIn = false;
        await user.save();
      }
    } catch (error) {
      console.log("토큰 검증 실패:", error.message);
    }

    const isHttps = req.headers.origin?.startsWith("https://");
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" || isHttps,
      sameSite: process.env.NODE_ENV === "production" || isHttps ? "None" : "Lax",
    });

    res.json({ message: "로그아웃 완료" });
  } catch (error) {
    res.status(500).json({ message: "서버 오류" });
  }
});

// ✅ 토큰 유효성 확인
router.post("/verify-token", (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(400).json({ isValid: false, message: "토큰 없음" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({ isValid: true, user: decoded });
  } catch (error) {
    return res.status(401).json({ isValid: false, message: "유효하지 않은 토큰" });
  }
});

module.exports = router;
