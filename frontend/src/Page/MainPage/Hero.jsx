import React, { useState, useEffect } from "react";
import HeroImage from "../../assets/Hero.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import translations from "../../Locale/Hero.json";

const Hero = () => {
  const [language, setLanguage] = useState(localStorage.getItem("language") || "ko");
  const navigate = useNavigate();

  useEffect(() => {
    const handleLanguageChange = () => {
      setLanguage(localStorage.getItem("language") || "ko");
    };

    window.addEventListener("languageChange", handleLanguageChange);
    return () => {
      window.removeEventListener("languageChange", handleLanguageChange);
    };
  }, []);

  const stats = [
    { key: "installations" },
    { key: "satisfaction" },
    { key: "experience" },
    { key: "support" },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
          {/* 텍스트 영역 */}
          <div className="flex-1 text-center lg:text-left">
            <motion.h1
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-snug sm:leading-tight mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {translations[language].title.main}
              <motion.span
                className="block text-blue-600 mt-2 sm:mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {translations[language].title.highlight}
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-base sm:text-lg lg:text-xl text-gray-700 mb-8 max-w-2xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {translations[language].description}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <button
                onClick={() => navigate("/product")}
                className="px-6 py-3 text-sm sm:text-base bg-white text-blue-600 font-semibold border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition"
              >
                {translations[language].buttons.consult}
              </button>
              <button
                onClick={() => navigate("/services")}
                className="px-6 py-3 text-sm sm:text-base bg-white text-blue-600 font-semibold border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition"
              >
                {translations[language].buttons.learnMore}
              </button>
            </motion.div>
          </div>

          {/* 이미지 영역 */}
          <motion.div
            className="flex-1 w-full max-w-md sm:max-w-xl lg:max-w-none"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <img
              src={HeroImage}
              alt={translations[language].title.main}
              className="rounded-2xl shadow-xl w-full object-cover hover:scale-[1.02] transition-transform duration-300"
            />
          </motion.div>
        </div>
      </div>

      {/* 하단 통계 영역 */}
      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.key}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
            >
              <div className="text-2xl sm:text-3xl font-bold text-blue-600">
                {translations[language].stats[stat.key].number}
              </div>
              <div className="text-sm sm:text-base text-gray-800">
                {translations[language].stats[stat.key].label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
