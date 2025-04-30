import React from 'react'
import HeroImage from "../../assets/Hero.png";
import { motion } from "framer-motion";

const Hero = () => {
  const textVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.3 } },
  };

  const buttonVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.5 } },
  };

  const imageVariant = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, delay: 0.7 },
    },
  };

  const statusVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 1 } },
  };

  return (
    <div className="relative min-h-[110vh] bg-gradient-to-b from-gray-50 to-white pb-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-28 lg:py-36">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

          {/* ✅ 이미지 왼쪽 */}
          <motion.div
            className="flex-1 w-full max-w-2xl lg:max-w-none"
            initial="hidden"
            animate="visible"
            variants={imageVariant}
          >
            <div className="relative">
              <img
                src={HeroImage}
                alt="AI Vision Hero"
                className="relative rounded-2xl shadow-2xl w-full object-cover transform hover:scale-[0.8] transition-transform duration-300"
              />
            </div>
          </motion.div>

          {/* ✅ 텍스트 오른쪽 */}
          <motion.div
            className="flex-1 text-center lg:text-right"
            initial="hidden"
            animate="visible"
            variants={textVariant}
          >
            <motion.h1
              className="text-xl sm:text-4xl 2xl:text-5xl font-bold text-gray-900 leading-tight mb-6 lg:mb-12"
              initial="hidden"
              animate="visible"
              variants={textVariant}
            >
              AI비전 에이전트 전문가와 함께
              <motion.span
                className="block text-blue-600 mt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                미래를 만들어갑니다.
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-ls sm:text-3xl text-gray-800 font-semibold mb-8 max-w-2xl mx-auto lg:text-right"
              initial="hidden"
              animate="visible"
              variants={textVariant}
            >
              효율적인 AI비전 솔루션 개발부터 설치와 <br />
              유지보수까지 전문가들이 함께합니다.
            </motion.p>

            {/* ✅ 버튼 애니메이션 적용 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-end">
              <motion.a
                href="http://localhost:5173/product"
                className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 text-lg font-semibold shadow-lg hover:shadow-xl text-center"
                initial="hidden"
                animate="visible"
                custom={0}
                variants={buttonVariant}
              >
                제품 소개 바로가기
              </motion.a>
              <motion.a
                href="http://localhost:5173/our-services"
                className="px-8 py-4 bg-white text-blue-600 rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors duration-300 text-lg font-semibold text-center"
                initial="hidden"
                animate="visible"
                custom={1}
                variants={buttonVariant}
              >
                기술 지원 바로가기
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>


      {/* 통계 숫자 영역 */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
          {[
            { number: "28+", label: "설치 완료" },
            { number: "100%", label: "고객 만족도" },
            { number: "20년+", label: "업계 경력" },
            { number: "24/7", label: "기술 지원" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial="hidden"
              animate="visible"
              variants={statusVariant}
            >
              <div className="text-3xl font-bold text-blue-600">
                {stat.number}
              </div>
              <div className="text-gray-900">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;