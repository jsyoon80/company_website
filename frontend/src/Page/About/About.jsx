import React from "react";
import companyImage from "../../assets/Image4.png";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-32 max-w-7xl">
      <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-24">
        <img src={companyImage} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900"></div>
        <div className="absolute bottom-8 left-4 md:bottom-12 md:left-12 text-white">
          <h3 className="text-2xl md:text-4xl font-bold mb-2 md:mb-3">
            iRDA Company
          </h3>
          <p className="text-base md:text-xl font-light">
            혁신과 신뢰로 글로벌 시장을 선도합니다.
          </p>
        </div>
      </div>

      <div className="mb-24 max-w-4xl mx-auto px-4 sm:px-0">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-10 text-slate-800 text-center">
          회사 소개
        </h2>
        <div className="text-base sm:text-lg leading-relaxed text-gray-600 space-y-6">
          <p>
            iRDA Company는 2025년 1월 설립 이래, AI비전 머신카메라 장치 및 제어 시스템 분야에서 
            혁신적인 솔루션을 제공해온 선도적인 AI 비전 에이전트 기업입니다. 
            AI비전 머신카메라(AVMC),피지컬 AI 로봇(VLA Robot),고효율 GPU,TPU,FPGA(임베디드 장치 포함) 
            등의 핵심 제품을 개발 및 생산하고 있으며, LLM 및 Transformer 기반 AI 에이전트를 활용한 
            이커머스 및 클라우드 시스템 구축에도 적극적으로 앞장서고 있습니다.
          </p>
          <p>
            특히 <strong className="text-blue-600">AI 머신비전 카메라와 피치컬AI 솔루션 분야</strong>에서는 
            탁월한 기술력을 바탕으로 국내외 주요 팩토리와 산업 시설에 안정적인 시스템을 구축하며, 
            기술력을 인정받고 있습니다. 지속적인 R&D 투자와 기술 혁신을 통해 에너지 효율 향상 및 전력 품질 개선에 기여하고 있으며, 
            친환경적이고 지속 가능한 미래를 위한 <span className="font-semibold text-indigo-600">AI 에이전트 솔루션</span>을 
            선도해 나가고 있습니다.
          </p>
        </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mb-24 px-4 sm:px-0">
        {[
          { title: "혁신", desc: "끊임없는 도전과 기술혁신으로 미래를 선도합니다" },
          { title: "신뢰", desc: "고객과의 신뢰를 최우선 가치로 삼습니다" },
          { title: "성장", desc: "구성원들의 지속적인 성장을 지원합니다" },
        ].map((value, index) => (
          <div
            key={index}
            className="bg-white p-8 sm:p-10 rounded-2xl shadow-md text-center hover:shadow-2xl transition-all duration-300 border border-gray-100"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-4 text-indigo-600">
              {value.title}
            </h3>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">{value.desc}</p>
          </div>
        ))}
      </div>


      <div className="mb-24 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-slate-800">
          회사 비전
        </h2>
        <p className="text-base sm:text-xl md:text-2xl leading-relaxed text-gray-600 font-light">
          "2030년까지 글로벌 시장을 선도하는 기술 혁신 기업으로 도약하여,
          <br />더 나은 세상을 만드는데 기여하겠습니다."
        </p>
      </div>


      <div className="mb-24">
        <h2 className="text-3xl sm:text-4xl font-bold mb-10 text-slate-800 text-center">
          회사 연혁
        </h2>
        <div className="space-y-6 sm:space-y-12 max-w-5xl mx-auto">
          {[
            { year: "2028", event: "글로벌 시장 진출" },
            { year: "2027", event: "시리즈 B 투자 유치" },
            { year: "2026", event: "주요 기술 특허 획득" },
            { year: "2025", event: "회사 설립" },
          ].map((item, index) => (
            <div
              key={index}
              className={`flex flex-col sm:flex-row items-center gap-4 sm:gap-8 ${
                index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
              }`}
            >
              <div className="w-full sm:w-1/2 text-center">
                <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100">
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 text-indigo-600">{item.year}</h3>
                  <p className="text-sm sm:text-lg text-gray-700">{item.event}</p>
                </div>
              </div>
              <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>
              <div className="w-full sm:w-1/2"></div>
            </div>
          ))}
        </div>
      </div>


    </div>
  );
};

export default About;
