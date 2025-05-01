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
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.2 },
  }),
};

const Leadership = () => {
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
    return keys.reduce((obj, k) => obj[k], LeadershipLocale[language]);
  };

  const executives = t("applications").map((item, i) => ({
    ...item,
    imageUrl: [Product2, Product3, Product4, Product5][i],
  }));
  const teamMembers = t("technologies").map((item, i) => ({
    ...item,
    imageUrl: [Product6, Product7, Product8, Product9][i],
  }));

  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
      {/* Section Title */}
      <motion.div
        className="text-center mb-16"
        initial="hidden"
        animate="visible"
        variants={textVariant}
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
          {t("title")}
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-gray-600">
          {t("subtitle")}
        </p>
      </motion.div>

      {/* Intro Section */}
      <div className="flex flex-col lg:flex-row items-center gap-12 mb-24">
        <motion.div className="lg:w-2/3" initial="hidden" animate="visible" variants={textVariant}>
          <div className="text-base sm:text-lg text-gray-700 space-y-6 leading-relaxed">
            {t("intro").map((text, idx) => (
              <p key={idx}>{text}</p>
            ))}
          </div>
        </motion.div>
        <motion.div
          className="lg:w-1/3 w-full"
          initial="hidden"
          animate="visible"
          variants={textVariant}
        >
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img
              src={Product1}
              alt={t("product.title")}
              className="w-full aspect-[4/3] object-cover rounded-t-xl"
            />
            <div className="p-5 bg-white">
              <h3 className="text-xl font-bold text-gray-800 mb-1">{t("product.title")}</h3>
              <p className="text-indigo-600">{t("product.subtitle")}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Applications */}
      <motion.div
        className="mb-24"
        initial="hidden"
        animate="visible"
        variants={textVariant}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-10 text-center">
          {t("applicationTitle")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {executives.map((exec, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              custom={index}
              initial="hidden"
              animate="visible"
              variants={cardVariant}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={exec.imageUrl}
                  alt={exec.name}
                  className="object-cover w-full h-full transform hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800 mb-1">{exec.name}</h3>
                <p className="text-indigo-600 text-sm mb-3">{exec.position}</p>
                <p className="text-gray-600 text-sm">{exec.description.join(", ")}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Technologies */}
      <motion.div
        className="mb-10"
        initial="hidden"
        animate="visible"
        variants={textVariant}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-10 text-center">
          {t("coreTechTitle")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((tech, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              custom={index}
              initial="hidden"
              animate="visible"
              variants={cardVariant}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={tech.imageUrl}
                  alt={tech.name}
                  className="object-cover w-full h-full transform hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800 mb-1">{tech.name}</h3>
                <p className="text-indigo-600 text-sm mb-3">{tech.position}</p>
                <p className="text-gray-600 text-sm">{tech.description.join(", ")}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Leadership;
