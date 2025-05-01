import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ServicesLocale from "../../Locale/Services.json";

const Services = () => {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'ko');

  useEffect(() => {
    const handleLanguageChange = () => {
      setLanguage(localStorage.getItem('language') || 'ko');
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  const t = (key) => {
    const keys = key.split(".");
    return keys.reduce((obj, k) => obj[k], ServicesLocale[language]);
  };

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
      <motion.div className="text-center mb-12" initial="hidden" animate="visible" variants={textVariant}>
        <h1 className="text-4xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">{t("title")}</h1>
        <p className="text-sm sm:text-lg text-gray-600">{t("subtitle")}</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {t("services").map((service, index) => (
          <motion.div
            key={index}
            className="bg-white p-8 rounded-lg shadow-lg hover:-translate-y-2 transition-transform duration-300"
            initial="hidden"
            animate="visible"
            custom={index}
            variants={cardVariant}
          >
            <div className="text-6xl mb-4">{service.icon}</div>
            <h3 className="text-lg sm:text-2xl font-semibold text-gray-800 mb-4">{service.title}</h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{service.description}</p>
          </motion.div>
        ))}
      </div>

      <motion.div className="text-center" initial="hidden" animate="visible" variants={textVariant}>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8">{t("whyUs.title")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t("whyUs.reasons").map((reason, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 p-6 rounded-lg"
              initial="hidden"
              animate="visible"
              custom={index}
              variants={cardVariant}
            >
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">{reason.title}</h3>
              <p className="text-sm sm:text-base text-gray-600">{reason.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div className="mt-32" initial="hidden" animate="visible" variants={textVariant}>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-12 text-center">{t("process.title")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {t("process.steps").map((step, index) => (
            <motion.div
              key={index}
              className="relative p-6 bg-white rounded-xl shadow-md"
              initial="hidden"
              animate="visible"
              custom={index}
              variants={cardVariant}
            >
              <div className="text-blue-600 text-5xl font-bold mb-4">{step.step}</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-sm sm:text-base text-gray-600">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="mt-32 bg-blue-600 rounded-2xl p-12 text-center text-white"
        initial="hidden"
        animate="visible"
        variants={textVariant}
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">{t("cta.title")}</h2>
        <p className="text-base sm:text-lg mb-8">{t("cta.desc")}</p>
        <a
          href="/contact"
          className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-300 inline-block"
        >
          {t("cta.button")}
        </a>
      </motion.div>
    </div>
  );
};

export default Services;
