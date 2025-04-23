import React, { useState } from "react";

const Board = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const dummyPosts = [
    {
      _id: 1,
      number: 1,
      title: "업무관련 공지사항",
      createdAt: "2025-01-01T10:00:00",
      views: 120,
    },
    {
      _id: 2,
      number: 2,
      title: "신규프로젝트 공지사항",
      createdAt: "2025-02-05T11:30:00",
      views: 95,
    },
    {
      _id: 3,
      number: 3,
      title: "신규 고객관련 공지사항",
      createdAt: "2025-02-10T14:00:00",
      views: 70,
    },
    {
      _id: 4,
      number: 4,
      title: "네 번째 게시물",
      createdAt: "2025-03-15:45:00",
      views: 50,
    },
    {
      _id: 5,
      number: 5,
      title: "전시회관련 공지사항",
      createdAt: "2025-04-20T09:15:00",
      views: 30,
    },
  ];

  const indexOfLastPage = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPage - itemsPerPage;
  const currentPosts = dummyPosts.slice(indexOfFirstPost, indexOfLastPage);

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto py-32 md:py-32">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 md:mb-8 text-center">
        공지사항 게시판
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg text-xs sm:text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider w-[8%]">번호</th>
              <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">제목</th>
              <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider w-[15%]">작성일</th>
              <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider w-[8%]">조회수</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentPosts.map((post) => (
              <tr key={post._id} className="hover:bg-gray-50 cursor-pointer">
                <td className="px-6 py-4 whitespace-nowrap text-xs sm:text-sm">{post.number}</td>
                <td className="px-6 py-4 whitespace-nowrap text-xs sm:text-sm">{post.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-xs sm:text-sm">{post.createdAt}</td>
                <td className="px-6 py-4 whitespace-nowrap text-xs sm:text-sm">{post.views}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
};

export default Board;
