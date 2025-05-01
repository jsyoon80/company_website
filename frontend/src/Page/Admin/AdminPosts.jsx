import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";

const AdminPosts = () => {
  const [posts, setPosts] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("title");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/post");
        setPosts(response.data);
      } catch (error) {
        console.log("게시글 가져오기 실패: ", error);
      }
    };
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "삭제하시겠습니까?",
      text: "이 작업은 되돌릴 수 없습니다!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3000/api/post/${id}`, {
          withCredentials: true,
        });
        setPosts(posts.filter((post) => post._id !== id));
        Swal.fire("삭제완료!", "게시글이 성공적으로 삭제되었습니다.", "success");
      } catch (error) {
        console.error("삭제 실패:", error);
        Swal.fire("오류 발생!", "삭제 중 문제가 발생했습니다.", "error");
      }
    }
  };

  const getFileNameFromUrl = (url) => {
    if (!url) return "";
    if (typeof url !== "string") return "";
    const parts = url.split("/");
    return parts[parts.length - 1];
  };

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const value = post[searchType]?.toLowerCase() || "";
      return value.includes(searchTerm.toLowerCase());
    });
  }, [posts, searchTerm, searchType]);

  const totalPages = pageSize > 0 ? Math.ceil(filteredPosts.length / pageSize) : 1;

  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredPosts.slice(start, start + pageSize);
  }, [filteredPosts, currentPage, pageSize]);

  return (
    <div className="p-4 mx-auto max-w-[1700px]">
      <h1 className="text-2xl md:text-4xl font-bold mt-6 mb-4">게시글 관리</h1>

      <div className="mb-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex w-full md:w-auto gap-2">
          <select
            className="border rounded px-3 py-2 text-base"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="title">제목</option>
            <option value="content">글 내용</option>
          </select>
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            className="w-full md:w-80 border rounded px-3 py-2 text-base"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <a
          href="/admin/create-post"
          className="w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-center"
        >
          추가하기
        </a>
      </div>

      <div className="mb-4 flex justify-between items-center">
        <div className="text-base md:text-lg font-bold text-gray-600">
          총 {filteredPosts.length}개의 게시물
        </div>
        <div className="flex items-center space-x-2">
          <label className="text-base font-bold text-gray-600">페이지당 표시:</label>
          <select
            className="border rounded px-3 py-2"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            {[10, 25, 50, 100].map((size) => (
              <option key={size} value={size}>{`${size}개`}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="hidden md:block overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white divide-y divide-gray-200 text-sm md:text-base">
          <thead className="bg-gray-50 text-gray-600 font-semibold">
            <tr>
              <th className="px-4 py-3 text-left">번호</th>
              <th className="px-4 py-3 text-left">제목</th>
              <th className="px-4 py-3 text-left">내용</th>
              <th className="px-4 py-3 text-left">조회수</th>
              <th className="px-4 py-3 text-left">파일</th>
              <th className="px-4 py-3 text-left">작성일</th>
              <th className="px-4 py-3 text-left">수정일</th>
              <th className="px-4 py-3 text-left">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedPosts.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-4 py-6 text-center text-gray-500">
                  게시글이 없습니다.
                </td>
              </tr>
            ) : (
              paginatedPosts.map((post, index) => (
                <tr key={post._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{(currentPage - 1) * pageSize + index + 1}</td>
                  <td className="px-4 py-3 truncate max-w-[180px]">{post.title}</td>
                  <td className="px-4 py-3 truncate max-w-[300px]">{post.content}</td>
                  <td className="px-4 py-3">{post.views}</td>
                  <td className="px-4 py-3">
                    {Array.isArray(post.fileUrl) ? post.fileUrl.map((url, i) => (
                      <div key={i} className="truncate text-blue-600 hover:underline cursor-pointer" onClick={() => window.open(url)}>
                        {getFileNameFromUrl(url)}
                      </div>
                    )) : post.fileUrl && (
                      <div className="truncate text-blue-600 hover:underline cursor-pointer" onClick={() => window.open(post.fileUrl)}>
                        {getFileNameFromUrl(post.fileUrl)}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">{new Date(post.createdAt).toLocaleString()}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{new Date(post.updatedAt).toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <button onClick={() => window.location.href=`/admin/edit-post/${post._id}`} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm">수정</button>
                      <button onClick={() => handleDelete(post._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm">삭제</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="md:hidden grid grid-cols-1 gap-4 mt-4">
        {paginatedPosts.length === 0 ? (
          <div className="text-center text-gray-500">게시글이 없습니다.</div>
        ) : (
          paginatedPosts.map((post, index) => (
            <div key={post._id} className="bg-white rounded-lg shadow-md p-4">
              <div className="text-sm text-gray-500 mb-1">#{(currentPage - 1) * pageSize + index + 1}</div>
              <h3 className="text-lg font-bold text-gray-800 mb-2 truncate">{post.title}</h3>
              <p className="text-sm text-gray-600 truncate mb-2">{post.content}</p>
              <p className="text-xs text-gray-500 mb-1">조회수: {post.views}</p>
              <p className="text-xs text-gray-500 mb-1">작성: {new Date(post.createdAt).toLocaleString()}</p>
              <p className="text-xs text-gray-500 mb-2">수정: {new Date(post.updatedAt).toLocaleString()}</p>
              <div className="text-xs text-blue-600 mb-2">
                {Array.isArray(post.fileUrl)
                  ? post.fileUrl.map((url, i) => (
                      <div key={i} className="truncate hover:underline cursor-pointer" onClick={() => window.open(url)}>
                        {getFileNameFromUrl(url)}
                      </div>
                    ))
                  : post.fileUrl && (
                      <div className="truncate hover:underline cursor-pointer" onClick={() => window.open(post.fileUrl)}>
                        {getFileNameFromUrl(post.fileUrl)}
                      </div>
                    )}
              </div>
              <div className="flex gap-2">
                <button onClick={() => window.location.href=`/admin/edit-post/${post._id}`} className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 text-sm">수정</button>
                <button onClick={() => handleDelete(post._id)} className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600 text-sm">삭제</button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-6 flex justify-center space-x-2 text-lg font-bold">
        <button
          className="px-3 py-1 rounded border disabled:opacity-50"
          onClick={() => setCurrentPage((p) => p - 1)}
          disabled={currentPage === 1}
        >
          이전
        </button>
        <span className="px-3 py-1">
          {totalPages > 0 ? `${currentPage} / ${totalPages}` : "0 / 0"}
        </span>
        <button
          className="px-3 py-1 rounded border disabled:opacity-50"
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={currentPage >= totalPages}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default AdminPosts;