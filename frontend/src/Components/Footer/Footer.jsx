import React from 'react'
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';


const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };


  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">회사 소개</h3>
            <p className="text-gray-400">
            우리 회사는 AI Vision Agent Global Leader로써 최고의 기술을 제공하기 위해 노력하고 있습니다.
          </p>
        </div>

        <div>
        <h3 className='text-xl font-bold mb-4'>바로 가기</h3>
        <ul className='space-y-2'>
        <li><Link to="/" onClick={scrollToTop} className="hover:text-white transition-colors">홈</Link></li>
        <li><Link to="/about" onClick={scrollToTop} className="hover:text-white transition-colors">회사 소개</Link></li>
        <li><Link to="/product" onClick={scrollToTop} className="hover:text-white transition-colors">제품 소개</Link></li>
        <li><Link to="/board" onClick={scrollToTop} className="hover:text-white transition-colors">공지 사항</Link></li>
        <li><Link to="/our-services" onClick={scrollToTop} className="hover:text-white transition-colors">기술 지원</Link></li>
        <li><Link to="/contact" onClick={scrollToTop} className="hover:text-white transition-colors">사업 문의</Link></li>
        </ul>
        </div>
        <div>
            <h3 className="text-xl font-bold mb-4">연락처</h3>
            <ul className="space-y-2 text-gray-400">
              <li>서울특별시 강남구</li>
              <li>테헤란로 79길 6, JS타워</li>
              <li>전화: 1888-2882</li>
              <li>이메일: info@irda-ai.com</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">소셜 미디어</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 iRDA Company. All rights reserved.</p>
        </div>

    </footer>
  )
}

export default Footer
