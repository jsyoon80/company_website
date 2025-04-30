import React from "react";
import { motion } from "framer-motion";
import Product1 from "../../assets/products/robo1.jpg";
import Product2 from "../../assets/products/smartfactory.jpg";
import Product3 from "../../assets/products/recongnition.jpg";
import Product4 from "../../assets/products/retails.jpg";
import Product5 from "../../assets/products/bio.jpg";
import Product6 from "../../assets/products/machineVision.jpg";
import Product7 from "../../assets/products/gpu.jpg";
import Product8 from "../../assets/products/VLA.jpg";
import Product9 from "../../assets/products/eCommerce.jpg";

// 모션 Variants 정의
const textVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.3 } },
};

const imageVariant = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, delay: 0.5 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.2 },
  }),
};

const Leadership = () => {
  const executives = [
    {
      name: "로보틱스 & 팩토리",
      position: "AI 공정 자동화",
      description: [
        "▷ 제품 품질 검사",
        "▷ 제품 인식 추적",
        "▷ 스마트 팩토리",
      ],
      imageUrl: Product2,
    },
    {
      name: "추적 관리",
      position: "CCTV & 자율주행, 운동, 생체인식",
      description: [
        "▷ 실시간 객체 추적관리",
        "▷ 얼굴/지문 인식 인증체계",
        "▷ ADAS/자율주행",
      ],
      imageUrl: Product3,
    },
    {
      name: "AI 광고",
      position: "패션, 미용, 화장품, 운동, 도소매",
      description: [
        "▷ 고객 행동분석 추천시스템",
        "▷ 무인 점포",
        "▷ 스마트보드 캐스팅",
      ],
      imageUrl: Product4,
    },
    {
      name: "생성형 AI",
      position: "GEN-AI, GAN-AI, LLM, XR",
      description: [
        "▷ 콘텐츠 생성 에이전트",
        "▷ 가상 메이크업",
        "▷ 멘토링 분야",
      ],
      imageUrl: Product5,
    },
  ];

  const teamMembers = [
    {
      name: "AI머신 비전카메라",
      position: "AI기반 실시간 객체탐지 & 분류",
      description: [
        "▷ AI에이전트 기반 자동의사결정",
        "▷ 클라우드 & 엣지 지원",
        "▷ 스마트 물류 & 산업 자동화",
      ],
      imageUrl: Product6,
    },
    {
      name: "AI 가속기",
      position: "GPU, TPU, FPGA, EDGE, Etc",
      description: [
        "▷ AI기반 고성능 프로세싱",
        "▷ 풍부한 I/O 및 확장성",
        "▷ AI 및 로봇용 가속 라이브러리 지원",
      ],
      imageUrl: Product7,
    },
    {
      name: "VAL 모델",
      position: "Vision-Language-Action",
      description: [
        "▷ 컴퓨터 비전",
        "▷ NLP 이해 및 행동, 예측",
        "▷ 멀티모달 AI",
      ],
      imageUrl: Product8,
    },
    {
      name: "E-커머스 AI",
      position: "상품추천, 고객응대, 마케팅 자동화",
      description: [
        "▷ AI기반 개인화 마케팅",
        "▷ AI챗봇 및 음성비서",
        "▷ AI자동화 가격 및 물류최적화",
      ],
      imageUrl: Product9,
    },
  ];

  return (
    <div className="container max-w-7xl mx-auto px-4 py-32">
      
      {/* ✅ 타이틀 */}
      <motion.div
        className="text-center mb-12"
        initial="hidden"
        animate="visible"
        variants={textVariant}
      >
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
          제품 소개
        </h1>
        <p className="text-xl text-gray-600">
          혁신과 성장을 이끄는 iRDA Company의 AI비전 제품 포트폴리오
        </p>
      </motion.div>

      {/* ✅ 회사 소개 텍스트 + 대표 제품 이미지 */}
      <div className="flex flex-col md:flex-row gap-12 mb-24 items-center">
        <motion.div
          className="md:w-2/3"
          initial="hidden"
          animate="visible"
          variants={textVariant}
        >
          <div className="text-base sm:text-lg text-gray-600 space-y-6">
            <p>
              iRDA Company는 20년 이상의 반도체 & 광학 산업 경력을 바탕으로, 혁신적인
              AI기술과 서비스를 통해 고객 여러분께 최상의 가치를 제공하기 위해 정성을 다해
              노력하고 있습니다.
            </p>
            <p>
              급변하는 글로벌 시장 환경 속에서도 지속적인 연구개발과 품질 혁신을
              통해 세계 최고 수준의 제품과 서비스를 제공하겠습니다.
            </p>
            <p className="font-semibold mt-8">iRDA Company 임직원 드림</p>
          </div>
        </motion.div>

        <motion.div
          className="md:w-1/3"
          initial="hidden"
          animate="visible"
          variants={imageVariant}
        >
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img
              src={Product1}
              alt="AI Vision Machine System"
              className="w-full aspect-[4/3] object-cover transform hover:scale-110 transition-transform duration-300 rounded-2xl shadow-2xl"
            />
            <div className="p-4 bg-white">
              <h3 className="text-xl font-bold text-gray-800">AI Vision Machine System</h3>
              <p className="text-indigo-600">Roll to Roll & Deep-Learning</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ✅ 응용 분야 */}
      <motion.div
        className="mb-24"
        initial="hidden"
        animate="visible"
        variants={textVariant}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
          응용 분야
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {executives.map((executive, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              initial="hidden"
              animate="visible"
              custom={index}
              variants={cardVariant}
            >
              <div className="aspect-square bg-gray-200 overflow-hidden">
                <img
                  src={executive.imageUrl}
                  alt={executive.name}
                  className="relative rounded-2xl shadow-2xl w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{executive.name}</h3>
                <p className="text-indigo-600 font-semibold mb-4">{executive.position}</p>
                <p className="text-gray-600">{executive.description.join(", ")}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ✅ 핵심 기술 */}
      <motion.div
        className="mb-24"
        initial="hidden"
        animate="visible"
        variants={textVariant}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
          핵심 기술
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((teamMember, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              initial="hidden"
              animate="visible"
              custom={index}
              variants={cardVariant}
            >
              <div className="aspect-square bg-gray-200 overflow-hidden">
                <img
                  src={teamMember.imageUrl}
                  alt={teamMember.name}
                  className="relative rounded-2xl shadow-2xl w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{teamMember.name}</h3>
                <p className="text-indigo-600 font-semibold mb-4">{teamMember.position}</p>
                <p className="text-gray-600">{teamMember.description.join(", ")}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

    </div>
  );
};

export default Leadership;
