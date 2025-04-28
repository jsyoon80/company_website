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
            우리 회사는 AI비전 에이전트 글로벌 리더로써 <br/>
            최고의 기술을 제공하기 위해 정성을 다하여 <br/>
            노력하고 있습니다.
          </p>
        </div>

        <div>
        <h3 className='text-xl font-bold mb-4'>바로 가기</h3>
        <ul className='space-y-2'>
        <li><Link to="/" onClick={scrollToTop} className="hover:text-white transition-colors">홈</Link></li>
        <li><Link to="/about" onClick={scrollToTop} className="hover:text-white transition-colors">회사 소개</Link></li>
        <li><Link to="/product" onClick={scrollToTop} className="hover:text-white transition-colors">제품 소개</Link></li>
        <li><Link to="/our-services" onClick={scrollToTop} className="hover:text-white transition-colors">기술 서비스</Link></li>
        <li><Link to="/contact" onClick={scrollToTop} className="hover:text-white transition-colors">제품 문의</Link></li>
        <li><Link to="/board" onClick={scrollToTop} className="hover:text-white transition-colors">고객 센터</Link></li>
        </ul>
        </div>
        <div>
            <h3 className="text-xl font-bold mb-4">연락처</h3>
            <ul className="space-y-2 text-gray-400">
              <li>서울특별시 강남구</li>
              <li>테헤란로 79길 6, JS타워</li>
              <li>전화: 02-2277-5700</li>
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
      <div className="border-t border-gray-700 mt-6 pt-6 text-center text-gray-400 text-sm md:text-base">
        <p className="mb-0 px-4 text-xm md:text-base">
          본 사이트의 모든 이미지 및 컨텐츠의 저작권은 iRDA컴파니에 있으며 무단으로 사용을 금합니다.
        </p>
        <p className="mb-0">
          &copy; 2025 iRDA Company. All rights reserved.
        </p>
      </div>




    </footer>
  )
}

export default Footer
