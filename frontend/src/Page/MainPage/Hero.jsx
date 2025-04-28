import React from 'react'
import HeroImage from "../../assets/Hero.png";

const Hero = () => {
  return (
    <div className="relative min-h-[110vh] bg-gradient-to-b from-gray-50 to-white pb-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-28 lg:py-36">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* 이미지 먼저 (왼쪽) */}
          <div className="flex-1 w-full max-w-2xl lg:max-w-none">
            <div className="relative">
              <img
                src={HeroImage}
                alt="AI Vision Hero"
                className="relative rounded-2xl shadow-2xl w-full object-cover transform hover:scale-[0.8] transition-transform duration-300"
              />
            </div>
          </div>

          {/* 텍스트 나중 (오른쪽) */}
          <div className="flex-1 text-center lg:text-right">
          <h1 className="text-xl sm:text-4xl 2xl:text-5xl font-bold text-gray-900 leading-tight mb-6 lg:mb-12">
              AI비전 에이전트 전문가와 함께
              <span className="block text-blue-600 mt-2">
                미래를 만들어갑니다.
              </span>
            </h1>

            {/* ✅ p 태그 텍스트 오른쪽 정렬 */}
            <p className="text-ls sm:text-3xl text-gray-800 font-semibold mb-8 max-w-2xl mx-auto lg:text-right">
              효율적인 AI비전 솔루션 개발부터 설치와 <br/>
              유지보수까지 전문가들이 함께합니다.
            </p>

            {/* ✅ 버튼 오른쪽 정렬 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="http://localhost:5173/product"
                className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 text-lg font-semibold shadow-lg hover:shadow-xl text-center"
              >
                제품 소개 바로가기
              </a>
              <a
                href="http://localhost:5173/our-services"
                className="px-8 py-4 bg-white text-blue-600 rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors duration-300 text-lg font-semibold text-center"
              >
                기술 지원 바로가기
              </a>
            </div>


          </div>

        </div>
      </div>

      {/* 통계 숫자 영역 */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
          {[
            { number: "20+", label: "설치 완료" },
            { number: "100%", label: "고객 만족도" },
            { number: "1년+", label: "업계 경력" },
            { number: "365/24", label: "기술 지원" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {stat.number}
              </div>
              <div className="text-gray-900">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* 문구 추가 영역 */}
        <div className="text-center mt-20">
          <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold">
            <span className="text-blue-600">AI</span>{" "}
            <span className="text-green-600">Vision</span>{" "}
            <span className="text-red-600">Agents</span>{" "}
            <span className="text-gray-700">Global</span>{" "}
            <span className="text-blue-600">Leader</span>
          </h2>
        </div>
      </div>
    </div>
  )
}

export default Hero
