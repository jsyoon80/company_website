import React from "react";
import { motion } from "framer-motion";

const Services = () => {
  const servicesList = [
    {
      id: 1,
      title: "맞춤형 AI하드웨어 및 소프트웨어 개발",
      description: "고객의 요구사항에 맞는 최적화된 AI솔루션을 제공합니다.",
      icon: "💻",
    },
    {
      id: 2,
      title: "응용 소프트웨어 솔루션 개발",
      description: "최신 AI 기술을 적용한 응용소프트웨어 구축",
      icon: "📲",
    },
    {
      id: 3,
      title: "클라우드 서비스",
      description: "안정적이고 확장 가능한 클라우드 인프라 구축 및 관리",
      icon: "📤",
    },
    {
      id: 4,
      title: "AI기술 컨설팅",
      description: "AI전문가의 분석을 통한 최적의 기술 전략 수립",
      icon: "🎥",
    },
  ];

  const textVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.3 } },
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: i * 0.2 },
    }),
  };

  return (
    <div className="container mx-auto px-4 py-32 max-w-7xl">

      {/* ✅ 상단 제목 */}
      <motion.div
        className="text-center mb-12"
        initial="hidden"
        animate="visible"
        variants={textVariant}
      >
        <h1 className="text-4xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          기술 서비스
        </h1>
        <p className="text-sm sm:text-lg text-gray-600">
          혁신적인 AI기술로 비즈니스의 성공을 지원합니다.
        </p>
      </motion.div>

      {/* ✅ 서비스 리스트 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {servicesList.map((service, index) => (
          <motion.div
            key={service.id}
            className="bg-white p-8 rounded-lg shadow-lg hover:-translate-y-2 transition-transform duration-300"
            initial="hidden"
            animate="visible"
            custom={index}
            variants={cardVariant}
          >
            <div className="text-6xl mb-4">{service.icon}</div>
            <h3 className="text-lg sm:text-2xl font-semibold text-gray-800 mb-4">
              {service.title}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {service.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* ✅ 우리를 선택해야 할 이유 */}
      <motion.div
        className="text-center"
        initial="hidden"
        animate="visible"
        variants={textVariant}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8">
          왜 우리를 선택해야 할까요?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "20년+ 경험",
              desc: "다양한 산업 분야의 AI프로젝트 경험",
            },
            {
              title: "전문가 팀",
              desc: "숙련된 개발자와 컨설턴트로 구성",
            },
            {
              title: "24/7 지원",
              desc: "연중무휴 기술 지원 서비스",
            },
          ].map((reason, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 p-6 rounded-lg"
              initial="hidden"
              animate="visible"
              custom={index}
              variants={cardVariant}
            >
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                {reason.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                {reason.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ✅ 프로젝트 프로세스 */}
      <motion.div
        className="mt-32"
        initial="hidden"
        animate="visible"
        variants={textVariant}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-12 text-center">
          프로젝트 진행 프로세스
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            {
              step: "01",
              title: "요구사항 분석",
              desc: "고객의 니즈와 목표를 정확히 파악",
            },
            {
              step: "02",
              title: "기획 및 설계",
              desc: "최적 솔루션 설계와 개발 계획 수립",
            },
            {
              step: "03",
              title: "개발 및 테스트",
              desc: "체계적인 개발과 품질 검증 진행",
            },
            {
              step: "04",
              title: "배포 및 설치,유지보수",
              desc: "안정적인 서비스 운영과 지속적인 개선",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="relative p-6 bg-white rounded-xl shadow-md"
              initial="hidden"
              animate="visible"
              custom={index}
              variants={cardVariant}
            >
              <div className="text-blue-600 text-5xl font-bold mb-4">
                {item.step}
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                {item.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ✅ CTA */}
      <motion.div
        className="mt-32 bg-blue-600 rounded-2xl p-12 text-center text-white"
        initial="hidden"
        animate="visible"
        variants={textVariant}
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
          프로젝트를 시작할 준비가 되셨나요?
        </h2>
        <p className="text-base sm:text-lg mb-8">
          AI전문가와 상담하고 최적의 솔루션을 찾아보세요.
        </p>

        <a
          href="http://localhost:5173/contact"
          className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-300 inline-block"
        >
          무료 상담 신청하기
        </a>
      </motion.div>

    </div>
  );
};

export default Services;
