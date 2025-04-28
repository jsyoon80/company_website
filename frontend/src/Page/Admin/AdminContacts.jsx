import axios from "axios";
import React, { useEffect, useMemo, useState, useCallback } from "react";
import Swal from "sweetalert2";

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("name");
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchContacts = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/contact", {
        withCredentials: true,
      });
      setContacts(response.data);
    } catch (error) {
      console.error("문의글 가져오기 실패: ", error);
      Swal.fire("에러", "문의글을 가져오는 데 실패했습니다.", "error");
    }
  }, []);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const handleEdit = (contact) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedContact(null);
  };

  const handleStatusUpdate = async (newStatus) => {
    try {
      await axios.put(
        `http://localhost:3000/api/contact/${selectedContact._id}`,
        { status: newStatus },
        { withCredentials: true }
      );
      await fetchContacts();
      closeModal();
      Swal.fire("수정 완료!", "상태가 성공적으로 수정되었습니다.", "success");
    } catch (error) {
      console.error("수정 실패: ", error);
      Swal.fire("에러", "상태 수정 중 문제가 발생했습니다.", "error");
      await fetchContacts();
    }
  };

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
        await axios.delete(`http://localhost:3000/api/contact/${id}`, {
          withCredentials: true,
        });
        await fetchContacts();
        Swal.fire("삭제 완료!", "문의가 성공적으로 삭제되었습니다.", "success");
      } catch (error) {
        console.error("삭제 실패: ", error);
        Swal.fire("에러", "삭제 중 문제가 발생했습니다.", "error");
        await fetchContacts();
      }
    }
  };

  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) => {
      let value = "";

      if (searchType === "createdAt") {
        value = contact.createdAt
          ? new Date(contact.createdAt).toISOString().slice(0, 10)
          : "";
      } else {
        value = contact[searchType]?.toLowerCase() || "";
      }

      const matchesSearch = value.includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || contact.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [contacts, searchTerm, searchType, statusFilter]);

  const totalPages = Math.ceil(filteredContacts.length / pageSize);

  const paginatedContacts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredContacts.slice(start, start + pageSize);
  }, [filteredContacts, currentPage, pageSize]);

  const statusOptions = [
    { key: "pending", label: "대기중", bg: "bg-blue-100", text: "text-blue-800", hover: "hover:bg-blue-200" },
    { key: "in progress", label: "진행중", bg: "bg-yellow-100", text: "text-yellow-800", hover: "hover:bg-yellow-200" },
    { key: "completed", label: "완료", bg: "bg-green-100", text: "text-green-800", hover: "hover:bg-green-200" },
  ];

  return (
    <div className="p-4 mx-auto max-w-[1400px]">
      <h1 className="text-4xl font-bold mt-6 mb-4">문의 관리</h1>

      {contacts.length === 0 ? (
        <div className="text-center py-8 bg-white rounded-lg shadow">
          <p className="text-2xl font-bold text-gray-800">문의사항이 없습니다.</p>
        </div>
      ) : (
        <>
          {/* 검색 및 필터 */}
          <div className="mb-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex w-full md:w-auto gap-2">
              <select
                className="border rounded px-3 py-2 text-base"
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
              >
                <option value="name">이름</option>
                <option value="email">이메일</option>
                <option value="phone">전화번호</option>
                <option value="message">문의내용</option>
                <option value="createdAt">작성일</option>
              </select>
              <div className="flex-1 md:w-80">
                <input
                  type="text"
                  placeholder={searchType === "createdAt" ? "YYYY-MM-DD 형식으로 입력" : "검색어를 입력하세요"}
                  className="w-full border rounded px-3 py-2 text-base"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="border rounded px-3 py-2 text-base"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">전체 상태</option>
                <option value="pending">대기중</option>
                <option value="in progress">진행중</option>
                <option value="completed">완료</option>
              </select>
            </div>
          </div>

          {/* PC 테이블 */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full bg-white shadow-md rounded-lg overflow-hidden text-sm lg:text-lg font-bold">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left">번호</th>
                  <th className="px-4 py-3 text-left">작성일</th>
                  <th className="px-4 py-3 text-left">이름</th>
                  <th className="px-4 py-3 text-left">이메일</th>
                  <th className="px-4 py-3 text-left">휴대폰</th>
                  <th className="px-4 py-3 text-left">문의내용</th>
                  <th className="px-4 py-3 text-left">상태</th>
                  <th className="px-4 py-3 text-center">관리</th>
                </tr>
              </thead>
              <tbody>
                {paginatedContacts.map((contact, index) => (
                  <tr key={contact._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">{(currentPage - 1) * pageSize + index + 1}</td>
                    <td className="px-4 py-3">{new Date(contact.createdAt).toISOString().slice(0, 10)}</td>
                    <td className="px-4 py-3">{contact.name}</td>
                    <td className="px-4 py-3">{contact.email}</td>
                    <td className="px-4 py-3">{contact.phone}</td>
                    <td className="px-4 py-3">{contact.message}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        contact.status === "pending"
                          ? "bg-blue-100 text-blue-800"
                          : contact.status === "in progress"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}>
                        {contact.status === "in progress" ? "진행중" : contact.status === "pending" ? "대기중" : "완료"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center space-x-2">
                        <button onClick={() => handleEdit(contact)} className="px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600">
                          수정
                        </button>
                        <button onClick={() => handleDelete(contact._id)} className="px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600">
                          삭제
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 모바일 카드형 레이아웃 */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {paginatedContacts.map((contact, index) => (
              <div key={contact._id} className="p-4 border rounded-lg bg-white shadow-md text-base font-bold">
                <div className="flex justify-between mb-2">
                  <div>
                    #{(currentPage - 1) * pageSize + index + 1} ({new Date(contact.createdAt).toISOString().slice(0, 10)})
                  </div>
                  <div className={`px-2 py-1 rounded-full text-sm ${
                    contact.status === "pending"
                      ? "bg-blue-100 text-blue-800"
                      : contact.status === "in progress"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}>
                    {contact.status === "in progress" ? "진행중" : contact.status === "pending" ? "대기중" : "완료"}
                  </div>
                </div>
                <div>이름: {contact.name}</div>
                <div>이메일: {contact.email}</div>
                <div>휴대폰: {contact.phone}</div>
                <div>문의내용: {contact.message}</div>
                <div className="flex justify-end space-x-2 mt-4">
                  <button onClick={() => handleEdit(contact)} className="px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600">
                    수정
                  </button>
                  <button onClick={() => handleDelete(contact._id)} className="px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600">
                    삭제
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* 페이지네이션 */}
          <div className="mt-6 flex justify-center space-x-2 text-lg font-bold">
            <button
              className="px-3 py-1 rounded border disabled:opacity-50"
              onClick={() => setCurrentPage((p) => p - 1)}
              disabled={currentPage === 1}
            >
              이전
            </button>
            <span className="px-3 py-1">
              {currentPage} / {totalPages}
            </span>
            <button
              className="px-3 py-1 rounded border disabled:opacity-50"
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={currentPage === totalPages}
            >
              다음
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminContacts;
