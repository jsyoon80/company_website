import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4 },
  }),
};

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("name");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/contact", { withCredentials: true })
      .then((res) => setContacts(res.data))
      .catch((err) => console.error("문의글 가져오기 실패: ", err));
  }, []);

  const handleEdit = (contact) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  const handleStatusUpdate = async (newStatus) => {
    try {
      await axios.put(`http://localhost:3000/api/contact/${selectedContact._id}`, { status: newStatus }, { withCredentials: true });
      setContacts((prev) =>
        prev.map((c) => (c._id === selectedContact._id ? { ...c, status: newStatus } : c))
      );
      setIsModalOpen(false);
      Swal.fire("수정 완료", "상태가 변경되었습니다.", "success");
    } catch (err) {
      Swal.fire("오류 발생", "상태 변경 중 문제가 발생했습니다.", "error");
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "삭제하시겠습니까?",
      text: "삭제 후 복구할 수 없습니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3000/api/contact/${id}`, { withCredentials: true });
        setContacts((prev) => prev.filter((c) => c._id !== id));
        Swal.fire("삭제 완료", "성공적으로 삭제되었습니다.", "success");
      } catch (err) {
        Swal.fire("오류 발생", "삭제 중 문제가 발생했습니다.", "error");
      }
    }
  };

  const filteredContacts = useMemo(() => {
    return contacts.filter((c) => {
      const value = (c[searchType] || "").toLowerCase();
      const matchesSearch = value.includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || c.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [contacts, searchTerm, searchType, statusFilter]);

  const totalPages = Math.ceil(filteredContacts.length / pageSize);
  const paginatedContacts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredContacts.slice(start, start + pageSize);
  }, [filteredContacts, currentPage, pageSize]);

  return (
    <div className="p-4 mx-auto max-w-7xl">
      <h1 className="text-3xl sm:text-4xl font-bold mt-6 mb-4">제품 문의 관리</h1>

      {/* 검색 및 필터 */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <select className="border px-3 py-2 rounded" value={searchType} onChange={(e) => setSearchType(e.target.value)}>
            <option value="name">이름</option>
            <option value="email">이메일</option>
            <option value="phone">전화번호</option>
            <option value="region">지역</option>
            <option value="inquiryType">문의분야</option>
            <option value="message">문의내용</option>
          </select>
          <input type="text" className="border px-3 py-2 rounded flex-1 min-w-[150px]" placeholder="검색어" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <select className="border px-3 py-2 rounded" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">전체</option>
            <option value="pending">대기중</option>
            <option value="in progress">진행중</option>
            <option value="completed">완료</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-600">표시 수:</span>
          <select className="border px-2 py-1 rounded" value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}>
            {[10, 25, 50, 100].map((s) => <option key={s} value={s}>{s}개</option>)}
          </select>
        </div>
      </div>

      {/* 📋 PC 테이블 */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm bg-white shadow rounded-lg">
          <thead className="bg-gray-50 text-gray-700 font-semibold">
            <tr>
              <th className="p-3">번호</th>
              <th className="p-3">이름</th>
              <th className="p-3">이메일</th>
              <th className="p-3">전화번호</th>
              <th className="p-3">지역</th>
              <th className="p-3">문의분야</th>
              <th className="p-3">문의내용</th>
              <th className="p-3">상태</th>
              <th className="p-3 text-center">관리</th>
            </tr>
          </thead>
          <tbody>
            {paginatedContacts.map((contact, i) => (
              <motion.tr key={contact._id} className="border-t hover:bg-gray-50" custom={i} initial="hidden" animate="visible" variants={fadeIn}>
                <td className="p-3 text-center">{(currentPage - 1) * pageSize + i + 1}</td>
                <td className="p-3">{contact.name}</td>
                <td className="p-3">{contact.email}</td>
                <td className="p-3">{contact.phone}</td>
                <td className="p-3">{contact.region}</td>
                <td className="p-3">{contact.inquiryType}</td>
                <td className="p-3">{contact.message}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    contact.status === "pending" ? "bg-blue-100 text-blue-700" :
                    contact.status === "in progress" ? "bg-yellow-100 text-yellow-700" :
                    "bg-green-100 text-green-700"
                  }`}>
                    {contact.status === "pending" ? "대기중" : contact.status === "in progress" ? "진행중" : "완료"}
                  </span>
                </td>
                <td className="p-3 text-center space-x-1">
                  <button onClick={() => handleEdit(contact)} className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">수정</button>
                  <button onClick={() => handleDelete(contact._id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">삭제</button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 📱 모바일 카드 */}
      <div className="md:hidden grid grid-cols-1 gap-4 mt-6">
        {paginatedContacts.map((contact, i) => (
          <motion.div key={contact._id} className="bg-white rounded-lg shadow p-4" initial="hidden" animate="visible" custom={i} variants={fadeIn}>
            <div className="font-semibold text-lg">#{(currentPage - 1) * pageSize + i + 1}</div>
            <div>이름: {contact.name}</div>
            <div>이메일: {contact.email}</div>
            <div>전화번호: {contact.phone}</div>
            <div>문의내용: {contact.message}</div>
            <div className="mt-2 flex justify-end gap-2">
              <button onClick={() => handleEdit(contact)} className="bg-blue-500 text-white px-3 py-1 rounded">수정</button>
              <button onClick={() => handleDelete(contact._id)} className="bg-red-500 text-white px-3 py-1 rounded">삭제</button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="mt-6 flex justify-center items-center gap-4 text-sm font-semibold">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50">이전</button>
        <span>{currentPage} / {totalPages}</span>
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50">다음</button>
      </div>

      {/* 모달 */}
      <AnimatePresence>
        {isModalOpen && selectedContact && (
          <motion.div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="bg-white rounded-xl p-6 w-full max-w-md" initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}>
              <h2 className="text-xl font-bold mb-4">문의 상태 변경</h2>
              <div className="space-y-2">
                {["pending", "in progress", "completed"].map((status) => (
                  <button key={status} onClick={() => handleStatusUpdate(status)} className={`w-full px-4 py-2 rounded text-sm font-semibold ${
                    status === "pending" ? "bg-blue-100 text-blue-800 hover:bg-blue-200" :
                    status === "in progress" ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200" :
                    "bg-green-100 text-green-800 hover:bg-green-200"
                  }`}>
                    {status === "pending" ? "대기중" : status === "in progress" ? "진행중" : "완료"}
                  </button>
                ))}
              </div>
              <button onClick={() => setIsModalOpen(false)} className="mt-4 w-full px-4 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200">취소</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminContacts;
