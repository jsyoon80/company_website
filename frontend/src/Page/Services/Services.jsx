import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ServicesLocale from "../../Locale/Services.json";

const Services = () => {
  const [language, setLanguage] = useState(localStorage.getItem("language") || "ko");

  useEffect(() => {
    const handleLanguageChange = () => {
      setLanguage(localStorage.getItem("language") || "ko");
    };
    window.addEventListener("languageChange", handleLanguageChange);
    return () => window.removeEventListener("languageChange", handleLanguageChange);
  }, []);

  const t = (key) => {
    const keys = key.split(".");
    return keys.reduce((obj, k) => obj[k], ServicesLocale[language]);
  };

  const textVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.2 },
    }),
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
      {/* Section Title */}
      <motion.div className="text-center mb-16" initial="hidden" animate="visible" variants={textVariant}>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">{t("title")}</h1>
        <p className="text-base sm:text-lg text-gray-600">{t("subtitle")}</p>
      </motion.div>

      {/* Services Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
        {t("services").map((service, index) => (
          <motion.div
            key={index}
            className="bg-white p-6 sm:p-8 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-2 transition duration-300"
            custom={index}
            initial="hidden"
            animate="visible"
            variants={cardVariant}
          >
            <div className="text-5xl sm:text-6xl mb-4">{service.icon}</div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">{service.title}</h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{service.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Why Us Section */}
      <motion.div className="text-center mb-24" initial="hidden" animate="visible" variants={textVariant}>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-10">{t("whyUs.title")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t("whyUs.reasons").map((reason, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 p-6 sm:p-8 rounded-xl shadow"
              custom={index}
              initial="hidden"
              animate="visible"
              variants={cardVariant}
            >
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">{reason.title}</h3>
              <p className="text-sm sm:text-base text-gray-600">{reason.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Process Steps */}
      <motion.div className="mb-24" initial="hidden" animate="visible" variants={textVariant}>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-12 text-center">{t("process.title")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t("process.steps").map((step, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 sm:p-8 rounded-xl shadow hover:shadow-lg transition duration-300 text-center"
              custom={index}
              initial="hidden"
              animate="visible"
              variants={cardVariant}
            >
              <div className="text-blue-600 text-4xl font-bold mb-4">{step.step}</div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
              <p className="text-sm sm:text-base text-gray-600">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Call To Action */}
      <motion.div
        className="bg-blue-600 rounded-2xl p-10 sm:p-14 text-center text-white mt-24"
        initial="hidden"
        animate="visible"
        variants={textVariant}
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">{t("cta.title")}</h2>
        <p className="text-base sm:text-lg mb-6">{t("cta.desc")}</p>
        <a
          href="/contact"
          className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-blue-100 transition duration-300"
        >
          {t("cta.button")}
        </a>
      </motion.div>
    </div>
  );
};

export default Services;
