import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiMenu, HiX } from "react-icons/hi";

const menuItems = [
  { path: "/", label: "홈" },
  { path: "/about", label: "회사 정보" },
  { path: "/product", label: "제품 소개" },
  { path: "/board", label: "공지 사항" },
  { path: "/our-services", label: "기술 지원" },
  { path: "/contact", label: "사업 문의" },
];

const MenuItem = ({ path, label, onClick }) => (
  <li>
    <Link
      to={path}
      className="hover:text-blue-600 transition duration-300"
      onClick={onClick}
    >
      {label}
    </Link>
  </li>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState("ko");  // ✅ 오타 수정

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white text-black p-4 shadow-lg z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* 로고 */}
        <h1 className="text-xl lg:text-2xl font-bold lg:ml-12 lg:mr-8">
          <Link to="/">
            <span className="text-blue-500">i</span>
            <span className="text-green-500">R</span>
            <span className="text-red-500">D</span>
            <span className="text-yellow-700">A</span>
            {/* <span className="text-gray-500">-</span>
            <span className="text-blue-500">A</span>
            <span className="text-green-500">I</span> */}
            <span className="text-black"> Company</span>
          </Link>
        </h1>

        {/* 데스크톱 메뉴 */}
        <div className="hidden lg:flex flex-1 justify-center">
          <ul className="flex gap-8 text-lg">
            {menuItems.map((item) => (
              <MenuItem key={item.path} {...item} />
            ))}
          </ul>
        </div>

        {/* 데스크톱 언어 선택 */}
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="hidden lg:block px-3 ml-8 border rounded-md bg-white hover:border-blue-500 transition duration-300"
        >
          <option value="ko">한국어</option>
          <option value="en">English</option>
          <option value="cn">中文</option>
        </select>

        {/* 모바일 메뉴 버튼 */}
        <button className="lg:hidden text-2xl" onClick={toggleMenu} aria-label="메뉴">
          {isOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* 모바일 메뉴 드로어 */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white text-black transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } lg:hidden`}
      >
        <div className="p-4">
          <button className="text-2xl mb-8 float-right" onClick={toggleMenu} aria-label="닫기">
            <HiX />
          </button>
          <ul className="clear-both space-y-4 pt-8 text-lg">
            {menuItems.map((item) => (
              <MenuItem
                key={item.path}
                {...item}
                onClick={() => {
                  setIsOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            ))}
          </ul>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="mt-6 w-full px-3 py-1 border rounded-md bg-white hover:border-blue-500 transition duration-300"
          >
            <option value="ko">한국어</option>
            <option value="en">English</option>
            <option value="cn">中文</option>
          </select>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
