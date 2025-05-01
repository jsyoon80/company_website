import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import companyImage from "../../assets/Dreamcity0.jpg";
import AboutLocale from "../../Locale/About.json";

const About = () => {
  const [language, setLanguage] = useState(localStorage.getItem("language") || "ko");

  useEffect(() => {
    const handleLanguageChange = () => {
      setLanguage(localStorage.getItem("language") || "ko");
    };
    window.addEventListener("languageChange", handleLanguageChange);
    return () => {
      window.removeEventListener("languageChange", handleLanguageChange);
    };
  }, []);

  const t = (key) => {
    const keys = key.split(".");
    return keys.reduce((obj, k) => obj[k], AboutLocale[language]);
  };

  const fadeInVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: custom * 0.2,
      },
    }),
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, delay: 0.2 },
    },
  };

  return (
    <motion.div
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 max-w-7xl"
      initial="hidden"
      animate="visible"
    >
      {/* Hero Image + 타이틀 */}
      <motion.div
        className="relative rounded-2xl overflow-hidden shadow-xl mb-20 sm:mb-28"
        variants={imageVariants}
      >
        <motion.img
          src={companyImage}
          alt="company"
          className="w-full h-[300px] sm:h-[500px] object-cover"
          initial="hidden"
          animate="visible"
          variants={imageVariants}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900"></div>
        <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-12 text-white">
          <motion.h3
            className="text-xl sm:text-3xl font-bold mb-2"
            variants={fadeInVariants}
            custom={0}
          >
            {t("hero.title")}
          </motion.h3>
          <motion.p
            className="text-sm sm:text-lg font-light"
            variants={fadeInVariants}
            custom={0.5}
          >
            {t("hero.subtitle")}
          </motion.p>
        </div>
      </motion.div>

      {/* 회사 소개 */}
      <motion.div
        className="mb-20 max-w-4xl mx-auto"
        variants={fadeInVariants}
        custom={1}
      >
        <motion.h2
          className="text-2xl sm:text-4xl font-bold mb-8 text-slate-800 text-center"
          variants={fadeInVariants}
          custom={1.5}
        >
          {t("title")}
        </motion.h2>
        <motion.div
          className="text-base sm:text-lg leading-relaxed text-gray-600 space-y-6"
          variants={fadeInVariants}
          custom={2}
        >
          <p>{t("description.part1")} {t("description.part2")}</p>
          <p>{t("description.part3")} {t("description.part4")}</p>
        </motion.div>
      </motion.div>

      {/* 핵심 가치 */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10 mb-20"
        variants={fadeInVariants}
        custom={3}
      >
        {["innovation", "trust", "growth"].map((key, index) => (
          <motion.div
            key={key}
            className="bg-white p-6 sm:p-10 rounded-xl shadow-md text-center hover:shadow-xl transition-all border border-gray-100"
            variants={fadeInVariants}
            custom={index + 3.5}
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-3 text-indigo-600">
              {t(`values.${key}.title`)}
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">{t(`values.${key}.desc`)}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* 비전 */}
      <motion.div
        className="mb-20 max-w-4xl mx-auto text-center"
        variants={fadeInVariants}
        custom={6.5}
      >
        <motion.h2
          className="text-2xl sm:text-4xl font-bold mb-6 text-slate-800"
          variants={fadeInVariants}
          custom={6.6}
        >
          {t("vision.title")}
        </motion.h2>
        <motion.p
          className="text-lg sm:text-2xl leading-relaxed text-gray-600 font-light"
          variants={fadeInVariants}
          custom={6.7}
        >
          "{t("vision.content")}"
        </motion.p>
      </motion.div>

      {/* 연혁 */}
      <motion.div className="mb-20" variants={fadeInVariants} custom={7}>
        <motion.h2
          className="text-2xl sm:text-4xl font-bold mb-12 text-slate-800 text-center"
          variants={fadeInVariants}
          custom={7.2}
        >
          {t("history.title")}
        </motion.h2>
        <div className="space-y-12 max-w-5xl mx-auto">
          {Object.entries(t("history.events")).map(([year, event], index) => (
            <motion.div
              key={year}
              className={`flex flex-col sm:flex-row items-center gap-6 ${
                index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
              }`}
              variants={fadeInVariants}
              custom={7.4 + index * 0.2}
            >
              <div className="flex-1 text-center">
                <div className="bg-white rounded-xl shadow p-6 sm:p-8 border hover:shadow-lg transition">
                  <h3 className="text-xl sm:text-2xl font-bold text-indigo-600 mb-2">{year}</h3>
                  <p className="text-gray-700 text-sm sm:text-base">{event}</p>
                </div>
              </div>
              <div className="w-4 h-4 bg-indigo-600 rounded-full"></div>
              <div className="flex-1 hidden sm:block"></div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default About;
