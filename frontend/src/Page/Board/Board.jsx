import React, { useState } from "react";

const Board = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const dummyPosts = [
    {
      _id: 1,
      number: 1,
      title: "[주문]제품 구매 상담은 어디로 하나요?",
      createdAt: "2025-01-01T10:00:00",
      views: 120,
    },
    {
      _id: 2,
      number: 2,
      title: "소모품 주문은 어디로 하나요?",
      createdAt: "2025-02-05T11:30:00",
      views: 95,
    },
    {
      _id: 3,
      number: 3,
      title: "최소 주문가능 수량은 얼마인가요?",
      createdAt: "2025-02-10T14:00:00",
      views: 70,
    },
    {
      _id: 4,
      number: 4,
      title: "배송가능 지역과 배송비는 얼마인가요?",
      createdAt: "2025-03-15T15:45:00",
      views: 50,
    },
    {
      _id: 5,
      number: 5,
      title: "배송은 얼마나 걸리나요?",
      createdAt: "2025-04-20T09:15:00",
      views: 30,
    },
    {
      _id: 6,
      number: 6,
      title: "배송 확인은 어떻게 하나요?",
      createdAt: "2025-04-22T09:15:00",
      views: 30,
    },
    {
      _id: 7,
      number: 7,
      title: "기술 지원은 어떻게 하나요?",
      createdAt: "2025-04-29T09:15:00",
      views: 30,
    },
  ];

  const indexOfLastPage = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPage - itemsPerPage;
  const currentPosts = dummyPosts.slice(indexOfFirstPost, indexOfLastPage);

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto py-32 md:py-32">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 md:mb-8 text-center">
        자주 문는질문
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
