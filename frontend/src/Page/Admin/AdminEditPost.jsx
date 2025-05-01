import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const AdminEditPost = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const editorRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    files: [],
    fileList: [],
    existingFiles: [],
  });

  const [uploadProgress, setUploadProgress] = useState({});
  const [currentUpload, setCurrentUpload] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/post/${id}`).then((res) => {
      setFormData({
        title: res.data.title,
        content: res.data.content,
        files: [],
        fileList: [],
        existingFiles: res.data.fileUrl || [],
      });
    }).catch((err) => {
      console.error("불러오기 실패:", err);
      navigate("/admin/posts");
    });
  }, [id, navigate]);

  const UploadModal = ({ progress, fileName }) => showUploadModal && (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-2">파일 업로드 중...</h3>
        <p className="text-sm text-gray-600 mb-4 truncate">{fileName}</p>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
          <div className="bg-indigo-500 h-full transition-all duration-200" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="text-center text-sm text-gray-600">{progress.toFixed(0)}%</div>
      </div>
    </div>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = editorRef.current.getContent();
    setShowUploadModal(true);

    try {
      const uploadedFiles = await Promise.all(formData.files.map(async (file) => {
        setCurrentUpload(file.name);
        const form = new FormData();
        form.append("file", file);
        form.append("originalName", encodeURIComponent(file.name));

        const res = await axios.post("http://localhost:3000/api/upload/file", form, {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (e) => {
            const percent = Math.round((e.loaded * 100) / e.total);
            setUploadProgress((prev) => ({ ...prev, [file.name]: percent }));
          }
        });

        return res.data.fileUrl;
      }));

      const postData = {
        title: formData.title,
        content,
        fileUrl: [...formData.existingFiles, ...uploadedFiles],
        currentImages: content.match(/https:\/\/[^"']+\.(png|jpg|jpeg|gif)/gi) || [],
      };

      await axios.put(`http://localhost:3000/api/post/${id}`, postData, { withCredentials: true });
      setShowUploadModal(false);
      navigate("/admin/posts");

    } catch (err) {
      console.error("수정 실패:", err);
      setShowUploadModal(false);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const fileList = files.map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      file,
    }));
    setFormData((prev) => ({
      ...prev,
      files: [...prev.files, ...files],
      fileList: [...prev.fileList, ...fileList],
    }));
  };

  const handleFileDelete = (fileId) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => prev.fileList[i].id !== fileId),
      fileList: prev.fileList.filter((file) => file.id !== fileId),
    }));
  };

  const handleExistingFileDelete = (url) => {
    setFormData((prev) => ({
      ...prev,
      existingFiles: prev.existingFiles.filter((u) => u !== url),
    }));
  };

  const formatFileSize = (bytes) => {
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">게시물 수정</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block font-medium text-gray-700 mb-2">제목</label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="w-full p-3 border border-gray-300 rounded-lg text-base focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-2">내용</label>
            <Editor
              apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue={formData.content}
              init={{
                height: 500,
                menubar: true,
                toolbar:
                  "undo redo | bold italic | alignleft aligncenter alignright | bullist numlist | image code",
                plugins: [
                  "advlist autolink lists link image charmap preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table code help wordcount"
                ],
                content_style: "body { font-family:Arial,sans-serif; font-size:14px }",
                images_upload_handler: async (blobInfo) => {
                  const form = new FormData();
                  form.append("image", blobInfo.blob());

                  const res = await axios.post("http://localhost:3000/api/upload/image", form, {
                    withCredentials: true,
                    headers: { "Content-Type": "multipart/form-data" }
                  });

                  return res.data.imageUrl;
                },
              }}
            />
          </div>

          {/* 기존 파일 */}
          {formData.existingFiles.length > 0 && (
            <div>
              <p className="font-medium text-gray-700 mb-2">기존 첨부파일</p>
              <ul className="divide-y border rounded-md bg-gray-50">
                {formData.existingFiles.map((url, idx) => (
                  <li key={idx} className="flex items-center justify-between px-4 py-3">
                    <a href={url} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline truncate">
                      {decodeURIComponent(url.split("/").pop())}
                    </a>
                    <button onClick={() => handleExistingFileDelete(url)} className="text-red-500 hover:text-red-700 text-sm">삭제</button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 새 파일 */}
          <div>
            <label htmlFor="files" className="block font-medium text-gray-700 mb-2">새 파일 추가</label>
            <input
              type="file"
              id="files"
              multiple
              onChange={handleFileChange}
              className="w-full block file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
            {formData.fileList.length > 0 && (
              <ul className="mt-3 divide-y rounded-md border bg-gray-50">
                {formData.fileList.map((file) => (
                  <li key={file.id} className="flex justify-between items-center px-4 py-3">
                    <div>
                      <p className="text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                    </div>
                    <button onClick={() => handleFileDelete(file.id)} className="text-red-500 text-sm hover:text-red-700">삭제</button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6">
            <button
              type="submit"
              className="px-6 py-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold"
            >
              수정
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/posts")}
              className="px-6 py-3 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg font-semibold"
            >
              취소
            </button>
          </div>
        </form>
      </div>

      <UploadModal progress={uploadProgress[currentUpload] || 0} fileName={currentUpload || ""} />
    </div>
  );
};

export default AdminEditPost;
