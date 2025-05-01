import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ContactLocale from "../../Locale/Contact-Components.json";

const Contact = () => {
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
    return keys.reduce((obj, k) => obj[k], ContactLocale[language]);
  };

  const gridVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.2 },
    }),
  };

  const titleVariant = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  const mapVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.9, delay: 0.5 } },
  };

  const buttonVariant = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.7, delay: 0.6 } },
  };

  return (
    <motion.div
      className="bg-white py-16 md:py-24 lg:py-32"
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Title Section */}
        <motion.div className="text-center mb-12" variants={titleVariant}>
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 leading-snug"
            variants={titleVariant}
          >
            {t("contact.title")}
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto"
            variants={titleVariant}
          >
            {t("contact.subtitle")}
          </motion.p>
        </motion.div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-20">
          {[
            {
              title: t("contact.contactMethods.phone.title"),
              info: t("contact.contactMethods.phone.info"),
              subInfo: t("contact.contactMethods.phone.subInfo"),
            },
            {
              title: t("contact.contactMethods.email.title"),
              info: t("contact.contactMethods.email.info"),
              subInfo: t("contact.contactMethods.email.subInfo"),
            },
            {
              title: t("contact.contactMethods.location.title"),
              info: t("contact.contactMethods.location.info"),
              subInfo: t("contact.contactMethods.location.subInfo"),
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 sm:p-8 rounded-2xl shadow hover:shadow-lg transition-shadow duration-300 text-center"
              custom={index}
              initial="hidden"
              animate="visible"
              variants={gridVariants}
            >
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">{item.info}</p>
              <p className="text-gray-500 text-xs sm:text-sm mt-1">{item.subInfo}</p>
            </motion.div>
          ))}
        </div>

        {/* Map Section */}
        <motion.div
          className="mb-16 max-w-5xl mx-auto"
          variants={mapVariant}
          initial="hidden"
          animate="visible"
        >
          <div className="rounded-xl overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6330.2185932615885!2d127.04812279918823!3d37.50534026465375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca41388c1e5a9%3A0xc35f5ab80bea1d8d!2zSlPtg4Dsm4w!5e0!3m2!1sko!2skr!4v1745386124781!5m2!1sko!2skr"
              width="100%"
              height="400"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-[300px] sm:h-[400px] md:h-[500px]"
            ></iframe>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="text-center mt-8"
          variants={buttonVariant}
          initial="hidden"
          animate="visible"
        >
          <Link
            to="/contact"
            className="inline-block px-8 py-3 text-base sm:text-lg font-semibold text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 transition-all duration-300"
          >
            {t("contact.button")}
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contact;
