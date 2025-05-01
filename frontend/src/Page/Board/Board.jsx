import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import BoardLocale from "../../Locale/Board.json";

const Board = () => {
  const [posts, setPosts] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("title");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [language, setLanguage] = useState(localStorage.getItem("language") || "ko");

  const navigate = useNavigate();

  useEffect(() => {
    const handleLanguageChange = () => {
      setLanguage(localStorage.getItem("language") || "ko");
    };
    window.addEventListener("languageChange", handleLanguageChange);
    return () => window.removeEventListener("languageChange", handleLanguageChange);
  }, []);

  const t = (key) => key.split(".").reduce((obj, k) => obj[k], BoardLocale[language]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/post")
      .then(res => setPosts(res.data))
      .catch(err => console.error("게시글 가져오기 실패: ", err));
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const value = post[searchType]?.toLowerCase() || "";
      const matchesSearch = value.includes(searchTerm.toLowerCase());

      const postDate = new Date(post.createdAt).getTime();
      const start = startDate ? new Date(startDate).getTime() : null;
      const end = endDate ? new Date(endDate).getTime() : null;

      const matchesDate = (!start || postDate >= start) && (!end || postDate <= end);
      return matchesSearch && matchesDate;
    });
  }, [posts, searchTerm, searchType, startDate, endDate]);

  const totalPages = pageSize > 0 ? Math.ceil(filteredPosts.length / pageSize) : 1;

  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredPosts.slice(start, start + pageSize);
  }, [filteredPosts, currentPage, pageSize]);

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.1 },
    }),
  };

  return (
    <div className="py-20 px-4 max-w-7xl mx-auto">
      {/* 제목 */}
      <motion.h1 className="text-3xl sm:text-4xl font-bold text-center mb-10" initial="hidden" animate="visible" variants={fadeIn}>
        {t("board.title")}
      </motion.h1>

      {/* 검색 영역 */}
      <motion.div
        className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-8"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="flex gap-2 w-full md:w-auto">
          <select
            className="border rounded px-3 py-2 text-sm"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="title">{t("board.search.type")}</option>
          </select>
          <input
            type="text"
            placeholder={t("board.search.placeholder")}
            className="w-full border rounded px-3 py-2 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          <label className="text-sm">{t("board.search.startDate")}</label>
          <input type="date" className="border rounded px-2 py-1 text-sm" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          <label className="text-sm">{t("board.search.endDate")}</label>
          <input type="date" className="border rounded px-2 py-1 text-sm" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          <label className="text-sm">{t("board.search.pageSize")}</label>
          <select className="border rounded px-2 py-1 text-sm" value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}>
            {[10, 25, 50, 100].map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* 📋 PC 테이블 뷰 */}
      <motion.div className="hidden md:block overflow-x-auto" initial="hidden" animate="visible" variants={fadeIn}>
        <table className="min-w-full bg-white rounded shadow">
          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="p-3">{t("board.table.number")}</th>
              <th className="p-3 text-left">{t("board.table.title")}</th>
              <th className="p-3 text-left">{t("board.table.date")}</th>
              <th className="p-3">{t("board.table.views")}</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y">
            {paginatedPosts.length === 0 ? (
              <tr><td colSpan={4} className="text-center p-6 text-gray-400">{t("board.search.noPosts")}</td></tr>
            ) : (
              paginatedPosts.map((post, i) => (
                <motion.tr
                  key={post._id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => navigate(`/post/${post._id}`)}
                  initial="hidden"
                  animate="visible"
                  custom={i}
                  variants={fadeIn}
                >
                  <td className="text-center">{(currentPage - 1) * pageSize + i + 1}</td>
                  <td className="px-4 py-2">{post.title}</td>
                  <td className="px-4">{new Date(post.createdAt).toLocaleDateString()}</td>
                  <td className="text-center">{post.views}</td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </motion.div>

      {/* 📱 모바일 카드 뷰 */}
      <div className="md:hidden grid grid-cols-1 gap-4 mt-4">
        {paginatedPosts.length === 0 ? (
          <div className="text-center text-gray-500">{t("board.search.noPosts")}</div>
        ) : (
          paginatedPosts.map((post, i) => (
            <motion.div
              key={post._id}
              className="bg-white shadow rounded-lg p-4 hover:shadow-md transition"
              onClick={() => navigate(`/post/${post._id}`)}
              initial="hidden"
              animate="visible"
              custom={i}
              variants={fadeIn}
            >
              <h3 className="font-bold text-base truncate">{post.title}</h3>
              <p className="text-sm text-gray-500 mt-2">{t("board.card.date")}: {new Date(post.createdAt).toLocaleDateString()}</p>
              <p className="text-sm text-gray-500">{t("board.card.views")}: {post.views}</p>
            </motion.div>
          ))
        )}
      </div>

      {/* ⏩ 페이지네이션 */}
      <motion.div className="flex justify-center gap-4 mt-10 font-semibold text-sm" initial="hidden" animate="visible" variants={fadeIn}>
        <button
          className="px-3 py-1 rounded border hover:bg-gray-100 disabled:opacity-50"
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          {t("board.pagination.prev")}
        </button>
        <span className="px-3 py-1">{`${currentPage} / ${totalPages || 1}`}</span>
        <button
          className="px-3 py-1 rounded border hover:bg-gray-100 disabled:opacity-50"
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={currentPage >= totalPages}
        >
          {t("board.pagination.next")}
        </button>
      </motion.div>
    </div>
  );
};

export default Board;
