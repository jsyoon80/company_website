import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LeadershipLocale from "../../Locale/Product.json";

import Product1 from "../../assets/products/robo1.jpg";
import Product2 from "../../assets/products/smartfactory.jpg";
import Product3 from "../../assets/products/recongnition.jpg";
import Product4 from "../../assets/products/retails.jpg";
import Product5 from "../../assets/products/bio.jpg";
import Product6 from "../../assets/products/machineVision.jpg";
import Product7 from "../../assets/products/gpu.jpg";
import Product8 from "../../assets/products/VLA.jpg";
import Product9 from "../../assets/products/eCommerce.jpg";

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
    return keys.reduce((obj, k) => obj[k], LeadershipLocale[language]);
  };

  const executives = t("applications").map((item, i) => ({ ...item, imageUrl: [Product2, Product3, Product4, Product5][i] }));
  const teamMembers = t("technologies").map((item, i) => ({ ...item, imageUrl: [Product6, Product7, Product8, Product9][i] }));

  return (
    <div className="container max-w-7xl mx-auto px-4 py-32">
      <motion.div className="text-center mb-12" initial="hidden" animate="visible" variants={textVariant}>
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">{t("title")}</h1>
        <p className="text-xl text-gray-600">{t("subtitle")}</p>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-12 mb-24 items-center">
        <motion.div className="md:w-2/3" initial="hidden" animate="visible" variants={textVariant}>
          <div className="text-base sm:text-lg text-gray-600 space-y-6">
            {t("intro").map((text, idx) => (
              <p key={idx}>{text}</p>
            ))}
          </div>
        </motion.div>

        <motion.div className="md:w-1/3" initial="hidden" animate="visible" variants={imageVariant}>
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img src={Product1} alt={t("product.title")}
              className="w-full aspect-[4/3] object-cover transform hover:scale-110 transition-transform duration-300 rounded-2xl shadow-2xl" />
            <div className="p-4 bg-white">
              <h3 className="text-xl font-bold text-gray-800">{t("product.title")}</h3>
              <p className="text-indigo-600">{t("product.subtitle")}</p>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div className="mb-24" initial="hidden" animate="visible" variants={textVariant}>
        <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">{t("applicationTitle")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {executives.map((exec, index) => (
            <motion.div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300" initial="hidden" animate="visible" custom={index} variants={cardVariant}>
              <div className="aspect-square bg-gray-200 overflow-hidden">
                <img src={exec.imageUrl} alt={exec.name} className="rounded-2xl shadow-2xl w-full h-full object-cover transform hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{exec.name}</h3>
                <p className="text-indigo-600 font-semibold mb-4">{exec.position}</p>
                <p className="text-gray-600">{exec.description.join(", ")}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div className="mb-24" initial="hidden" animate="visible" variants={textVariant}>
        <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">{t("coreTechTitle")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((tech, index) => (
            <motion.div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300" initial="hidden" animate="visible" custom={index} variants={cardVariant}>
              <div className="aspect-square bg-gray-200 overflow-hidden">
                <img src={tech.imageUrl} alt={tech.name} className="rounded-2xl shadow-2xl w-full h-full object-cover transform hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{tech.name}</h3>
                <p className="text-indigo-600 font-semibold mb-4">{tech.position}</p>
                <p className="text-gray-600">{tech.description.join(", ")}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Leadership;
