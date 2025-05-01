import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import ContactLocale from "../../Locale/Contact.json";

const Contact = () => {
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
    return keys.reduce((obj, k) => obj[k], ContactLocale[language]);
  };

  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", region: "", inquiryType: "", message: "", status: "in progress",
  });
  const [agree, setAgree] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agree) {
      Swal.fire(t("contact.form.alert.requiredAgree"), "", "warning");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/api/contact", formData);
      if (response.status === 201) {
        Swal.fire("Success", t("contact.form.alert.success"), "success");
        setFormData({ name: "", email: "", phone: "", region: "", inquiryType: "", message: "", status: "in progress" });
        setAgree(false);
      }
    } catch (error) {
      Swal.fire("Error", t("contact.form.alert.error"), "error");
    }
  };

  const handlePolicyView = () => {
    Swal.fire({
      title: t("contact.form.viewPolicy"),
      html: `<div style="text-align:left; max-height:300px; overflow:auto;">${t("contact.form.policyHtml")}</div>`,
      confirmButtonText: t("contact.form.alert.confirm"),
      width: 600,
    });
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: i * 0.2 },
    }),
  };

  return (
    <div className="min-h-screen bg-white py-20 sm:py-28">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div className="text-center mb-16" initial="hidden" animate="visible" variants={fadeIn}>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">{t("contact.title")}</h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto leading-relaxed" dangerouslySetInnerHTML={{ __html: t("contact.subtitle").replace(/\n/g, "<br />") }} />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* 📩 Form */}
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <form className="bg-white rounded-2xl shadow-xl p-6 sm:p-8" onSubmit={handleSubmit}>
              <div className="space-y-6">
                {["name", "email", "phone", "region"].map((field, idx) => (
                  <div key={idx}>
                    <label className="block text-gray-700 font-medium mb-2">{t(`contact.form.${field}`)}</label>
                    <input
                      type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                      name={field}
                      required
                      className="w-full p-3 sm:p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder={t(`contact.form.placeholder.${field}`)}
                      value={formData[field]}
                      onChange={handleChange}
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-gray-700 font-medium mb-2">{t("contact.form.inquiryType")}</label>
                  <select
                    name="inquiryType"
                    required
                    className="w-full p-3 sm:p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400"
                    value={formData.inquiryType}
                    onChange={handleChange}
                  >
                    <option value="">{t("contact.form.inquiryOptions.default")}</option>
                    <option value="서비스문의">{t("contact.form.inquiryOptions.service")}</option>
                    <option value="구매문의">{t("contact.form.inquiryOptions.purchase")}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">{t("contact.form.message")}</label>
                  <textarea
                    name="message"
                    required
                    className="w-full p-3 sm:p-4 h-40 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400"
                    placeholder={t("contact.form.placeholder.message")}
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <input type="checkbox" id="agree" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                  <label htmlFor="agree" className="text-gray-700">{t("contact.form.agree")}</label>
                  <button
                    type="button"
                    onClick={handlePolicyView}
                    className="text-blue-600 underline ml-2"
                  >
                    {t("contact.form.viewPolicy")}
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  {t("contact.form.submit")}
                </button>
              </div>
            </form>
          </motion.div>

          {/* 📍 Info + Map */}
          <div className="space-y-10">
            <motion.div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8" initial="hidden" animate="visible" custom={1} variants={fadeIn}>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">{t("contact.info.title")}</h3>
              {["phone", "email", "address"].map((key, idx) => (
                <div key={idx} className="mb-4">
                  <h4 className="font-medium text-gray-800">{t(`contact.info.${key}.label`)}</h4>
                  <p className="text-gray-600">{t(`contact.info.${key}.value`)}</p>
                  <p className="text-sm text-gray-500">{t(`contact.info.${key}.desc`)}</p>
                </div>
              ))}
            </motion.div>

            <motion.div className="rounded-2xl overflow-hidden shadow-lg" initial="hidden" animate="visible" custom={2} variants={fadeIn}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6330.2185932615885!2d127.04812279918823!3d37.50534026465375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca41388c1e5a9%3A0xc35f5ab80bea1d8d!2zSlPtg4Dsm4w!5e0!3m2!1sko!2skr!4v1745386124781!5m2!1sko!2skr"
                width="100%"
                height="400"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-2xl"
              ></iframe>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
