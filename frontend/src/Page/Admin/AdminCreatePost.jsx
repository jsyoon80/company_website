import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";

const AdminCreatePost = () => {
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    files: [],
    fileList: [],
  });
  const [uploadProgress, setUploadProgress] = useState({});
  const [currentUpload, setCurrentUpload] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const editorContent = editorRef.current.getContent();
    setShowUploadModal(true);

    try {
      const uploadedFiles = await Promise.all(
        formData.files.map(async (file) => {
          setCurrentUpload(file.name);
          const fileFormData = new FormData();
          const encodedFileName = encodeURIComponent(file.name);
          fileFormData.append("file", file);
          fileFormData.append("originalName", encodedFileName);

          const response = await axios.post("http://localhost:3000/api/upload/file", fileFormData, {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
            onUploadProgress: (e) => {
              const percent = Math.round((e.loaded * 100) / e.total);
              setUploadProgress((prev) => ({ ...prev, [file.name]: percent }));
            },
          });

          return response.data.fileUrl;
        })
      );

      await axios.post(
        "http://localhost:3000/api/post",
        {
          title: formData.title,
          content: editorContent,
          fileUrl: uploadedFiles,
        },
        { withCredentials: true }
      );

      setShowUploadModal(false);
      navigate("/admin/posts");
    } catch (err) {
      console.error("게시물 업로드 실패:", err);
      setShowUploadModal(false);
    }
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const newFileList = newFiles.map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      file,
    }));
    setFormData((prev) => ({
      ...prev,
      files: [...prev.files, ...newFiles],
      fileList: [...prev.fileList, ...newFileList],
    }));
  };

  const handleFileDelete = (id) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => prev.fileList[i].id !== id),
      fileList: prev.fileList.filter((f) => f.id !== id),
    }));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
  };

  const UploadModal = ({ progress, fileName }) =>
    showUploadModal && (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center px-4">
        <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">파일 업로드 중...</h3>
          <p className="text-sm text-gray-600 mb-4 truncate">{fileName}</p>
          <div className="relative pt-1">
            <div className="overflow-hidden h-2 mb-2 text-xs flex rounded bg-gray-200">
              <div
                style={{ width: `${progress}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
              ></div>
            </div>
            <div className="text-sm text-center text-gray-600">{progress.toFixed(0)}%</div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">게시글 작성</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block font-medium text-gray-700 mb-2">
              제목
            </label>
            <input
              type="text"
              id="title"
              required
              className="w-full border border-gray-300 rounded-lg p-3 text-base focus:ring-indigo-500 focus:border-indigo-500"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-2">내용</label>
            <Editor
              apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue={formData.content}
              init={{
                height: 400,
                menubar: true,
                plugins: ["advlist autolink lists link image charmap preview anchor", "searchreplace visualblocks code fullscreen", "insertdatetime media table code help wordcount"],
                toolbar: "undo redo | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | image | code",
                content_style: "body { font-family:Arial,sans-serif; font-size:14px }",
              }}
            />
          </div>

          <div>
            <label htmlFor="files" className="block font-medium text-gray-700 mb-2">첨부파일</label>
            <input
              type="file"
              id="files"
              multiple
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
            {formData.fileList.length > 0 && (
              <ul className="mt-4 divide-y rounded-lg border border-gray-200 bg-gray-50">
                {formData.fileList.map((file) => (
                  <li key={file.id} className="flex justify-between items-center px-4 py-3">
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6M5 7h14l1 1v11a2 2 0 01-2 2H6a2 2 0 01-2-2V8l1-1z" />
                      </svg>
                      <div>
                        <p className="text-sm font-medium">{file.name}</p>
                        <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <button type="button" onClick={() => handleFileDelete(file.id)} className="text-red-500 hover:text-red-700 transition">
                      삭제
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-end gap-3 pt-4">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              저장
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/posts")}
              className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-semibold transition"
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

export default AdminCreatePost;
