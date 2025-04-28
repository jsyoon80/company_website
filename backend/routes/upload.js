const express = require("express");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");

const router = express.Router();

// ✅ S3 클라이언트 설정
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// ✅ Multer 설정
const imageUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

const fileUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
});

// ✅ 토큰 검증
const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ success: false, message: "인증되지 않은 요청입니다." });
  }
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    return res.status(403).json({ success: false, message: "유효하지 않은 토큰입니다." });
  }
};

// ✅ 이미지 업로드
router.post("/image", verifyToken, imageUpload.single("image"), async (req, res) => {
  try {
    const file = req.file;
    const fileExtension = file.originalname.split(".").pop();
    const fileName = `${uuidv4()}.${fileExtension}`;

    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `post-images/${fileName}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const command = new PutObjectCommand(uploadParams);
    await s3Client.send(command);

    const imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/post-images/${fileName}`;

    res.json({ success: true, imageUrl });
  } catch (error) {
    console.error('이미지 업로드 실패:', error);
    res.status(500).json({ success: false, message: "이미지 업로드 중 에러가 발생했습니다." });
  }
});

// ✅ 파일 업로드
router.post("/file", verifyToken, fileUpload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    const originalName = req.body.originalName;
    const decodedFileName = decodeURIComponent(originalName);

    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `post-files/${decodedFileName}`,
      Body: file.buffer,
      ContentType: file.mimetype,
      ContentDisposition: `attachment; filename*=UTF-8''${encodeURIComponent(decodedFileName)}`,
    };

    const command = new PutObjectCommand(uploadParams);
    await s3Client.send(command);

    const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/post-files/${decodedFileName}`;

    res.json({ success: true, fileUrl });
  } catch (error) {
    console.error('파일 업로드 실패:', error);
    res.status(500).json({ success: false, message: "파일 업로드 중 에러가 발생했습니다." });
  }
});

module.exports = router;
