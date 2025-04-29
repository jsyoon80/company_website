import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import DOMPurify from "dompurify";
import {
  Container,
  Paper,
  Typography,
  Divider,
  Box,
  Chip,
  Skeleton,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShareIcon from "@mui/icons-material/Share";
import { format } from "date-fns";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const PostHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(2),
  gap: theme.spacing(2),
}));

const SinglePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/post/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error("게시글 로딩 실패:", error);
        setError("게시글을 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const handleFileDownload = (fileUrl) => {
    if (fileUrl) {
      window.open(fileUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setOpenSnackbar(true);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 14 }}>
        <StyledPaper elevation={2}>
          <Skeleton variant="text" height={50} width="30%" />
          <Skeleton variant="text" height={30} width="60%" />
          <Divider sx={{ my: 3 }} />
          <Skeleton variant="rounded" height={300} sx={{ my: 4 }} />
        </StyledPaper>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 14 }}>
        <StyledPaper elevation={2}>
          <Alert severity="error">{error}</Alert>
        </StyledPaper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 14 }}>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <IconButton onClick={handleBack} aria-label="뒤로가기">
          <ArrowBackIcon />
        </IconButton>
        <IconButton onClick={handleShare} aria-label="공유하기">
          <ShareIcon />
        </IconButton>
      </Box>

      <StyledPaper elevation={2}>
        <PostHeader>
          <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                No. {post.number}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <VisibilityIcon sx={{ fontSize: 18, color: "text.secondary" }} />
                <Typography variant="body2" color="text.secondary">
                  {post.views}
                </Typography>
              </Box>
            </Box>
            <Typography variant="h5" component="h1" gutterBottom>
              {post.title}
            </Typography>
            <Box sx={{ display: "flex", gap: 2, color: "text.secondary" }}>
              <Typography variant="body2">
                {format(new Date(post.createdAt), "yyyy-MM-dd HH:mm:ss")}
              </Typography>
            </Box>
          </Box>
        </PostHeader>

        <Divider sx={{ my: 3 }} />

        {/* ✅ 모바일에서 폰트 1rem, 태블릿 이상 1.2rem 적용 */}
        <Box sx={{ my: 4 }}>
          <Box
            sx={{
              lineHeight: 1.8,
              fontSize: {
                xs: '1rem',   // 모바일
                sm: '1.2rem', // 태블릿 이상
              },
            }}
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.renderedContent) }}
          />
        </Box>

        {post.fileUrl && post.fileUrl.length > 0 && (
          <Box sx={{ mt: 4, p: 2, bgcolor: "grey.50", borderRadius: 1 }}>
            <Typography variant="subtitle2" gutterBottom>
              첨부파일
            </Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {post.fileUrl.map((file, index) => (
                <Chip
                  key={index}
                  label={file.split("/").pop()}
                  variant="outlined"
                  clickable
                  onClick={() => handleFileDownload(file)}
                  icon={<FileDownloadIcon />}
                  sx={{
                    "&:hover": { bgcolor: "grey.200" },
                    "& .MuiChip-icon": { fontSize: 20 },
                  }}
                />
              ))}
            </Box>
          </Box>
        )}
      </StyledPaper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        message="URL이 클립보드에 복사되었습니다"
      />
    </Container>
  );
};

export default SinglePost;
