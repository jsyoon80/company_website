const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    number: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200, // 제목 최대 200자 제한
    },
    content: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    fileUrl: [{
      type: String,
      validate: {
        validator: function (v) {
          return /^https?:\/\//.test(v); // URL 형식 검사
        },
        message: props => `${props.value} 는 유효한 URL이 아닙니다!`,
      },
      trim: true,
    }],
    views: {
      type: Number,
      default: 0,
      min: 0, // 조회수는 0 이상
    },
    viewLogs: [{
      ip: String,
      userAgent: String,
      timestamp: {
        type: Date,
        default: Date.now,
      }
    }],
    updatedAt: {
      type: Date,
      default: Date.now,
    }
  },
  {
    timestamps: true, // createdAt, updatedAt 자동 관리
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
