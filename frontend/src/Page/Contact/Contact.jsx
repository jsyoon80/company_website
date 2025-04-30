import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", region: "", inquiryType: "", message: "", status: "in progress",
  });
  const [agree, setAgree] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agree) {
      Swal.fire("알림", "개인정보 수집 및 이용에 동의해야 합니다.", "warning");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/api/contact", formData);
      if (response.status === 201) {
        Swal.fire("성공", "문의가 성공적으로 접수되었습니다.", "success");
        setFormData({ name: "", email: "", phone: "", region: "", inquiryType: "", message: "", status: "in progress" });
        setAgree(false);
      }
    } catch (error) {
      console.error("에러 발생: ", error);
      Swal.fire("에러", "문의 접수 중 오류가 발생했습니다.", "error");
    }
  };

  const handlePolicyView = () => {
    Swal.fire({
      title: "개인정보 처리방침",
      html: `
        <div style="text-align:left; max-height:300px; overflow:auto;">
          <p>iRDA(이하 "회사")는 「개인정보보호법」을 준수하고 있으며...</p>
          <p>01. 개인정보의 처리 목적: 고객문의, 채용, 투자문의 대응 등</p>
          <p>02. 수집 항목: 이름, 이메일, 연락처, 지역, 문의내용</p>
          <p>03. 보유기간: 문의 접수 후 1년</p>
          <p>04. 제3자 제공 및 위탁 없음</p>
          <p>05. 파기절차: 지체 없이 파기</p>
          <p>※ 상세 내용은 홈페이지의 개인정보처리방침 참조</p>
        </div>
      `,
      confirmButtonText: "확인",
      width: 600,
    });
  };

  const textVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.3 } },
  };

  const cardVariant = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, delay: i * 0.15 },
    }),
  };

  return (
    <div className="min-h-screen bg-white py-32">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          animate="visible"
          variants={textVariant}
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            제품 문의
          </h1>
          <p className="text-xm text-gray-600 max-w-3xl mx-auto">
            정성을 다해 답변을 해드리겠습니다.<br />
            AI비전 에이전트 솔루션 개발부터, 설치와 유지보수까지, 전문가와 상담하세요.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* ✅ 폼 부분 */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={textVariant}
          >
            <form className="bg-white rounded-2xl shadow-xl p-8" onSubmit={handleSubmit}>
              <div className="space-y-6">
                {[
                  { label: "이름", name: "name", type: "text", placeholder: "홍길동" },
                  { label: "이메일", name: "email", type: "email", placeholder: "example@example.com" },
                  { label: "전화번호", name: "phone", type: "tel", placeholder: "010-1234-5678" },
                  { label: "지역", name: "region", type: "text", placeholder: "서울특별시 강남구" },
                ].map((field, index) => (
                  <div key={index}>
                    <label className="block text-gray-700 font-medium mb-2">{field.label}</label>
                    <input
                      type={field.type}
                      name={field.name}
                      className="w-full p-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-200"
                      placeholder={field.placeholder}
                      required
                      value={formData[field.name]}
                      onChange={handleChange}
                    />
                  </div>
                ))}

                {/* 문의 분야 */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">문의분야</label>
                  <select
                    name="inquiryType"
                    className="w-full p-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-200"
                    required
                    value={formData.inquiryType}
                    onChange={handleChange}
                  >
                    <option value="">문의분야를 선택하세요</option>
                    <option value="서비스문의">서비스문의</option>
                    <option value="구매문의">구매문의</option>
                  </select>
                </div>

                {/* 문의 내용 */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">문의 내용</label>
                  <textarea
                    name="message"
                    className="w-full p-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-200 h-40"
                    placeholder="문의하실 내용을 적어주세요."
                    required
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>

                {/* 개인정보 동의 */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="agree"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                  />
                  <label htmlFor="agree" className="text-gray-700 text-sm">
                    개인정보 수집 및 이용에 동의합니다.
                  </label>
                  <button
                    type="button"
                    onClick={handlePolicyView}
                    className="text-blue-600 text-sm underline ml-2"
                  >
                    개인정보 처리방침 보기
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300"
                >
                  작성 완료
                </button>
              </div>
            </form>
          </motion.div>

          {/* ✅ 오른쪽 연락처 & 지도 */}
          <div className="space-y-8">
            {[
              { type: "연락처", items: [
                { title: "전화", info: "02-2277-5700", desc: "평일 09:00 - 18:00" },
                { title: "이메일", info: "biz@irda-ai.com", desc: "24시간 접수 가능" },
                { title: "주소", info: "서울특별시 강남구 테헤란로 79길 6, JS타워", desc: "본사" },
              ]},
              { type: "지도" },
            ].map((section, idx) => (
              <motion.div
                key={idx}
                className="bg-white rounded-2xl shadow-lg p-8"
                initial="hidden"
                animate="visible"
                custom={idx}
                variants={cardVariant}
              >
                {section.type === "연락처" ? (
                  <>
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">연락처 정보</h3>
                    {section.items.map((item, index) => (
                      <div key={index} className="flex items-start mb-4">
                        <div className="ml-4">
                          <h4 className="font-medium text-gray-800">{item.title}</h4>
                          <p className="text-gray-600">{item.info}</p>
                          <p className="text-sm text-gray-500">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6330.2185932615885!2d127.04812279918823!3d37.50534026465375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca41388c1e5a9%3A0xc35f5ab80bea1d8d!2zSlPtg4Dsm4w!5e0!3m2!1sko!2skr!4v1745386124781!5m2!1sko!2skr"
                    width="100%"
                    height="400"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-[400px] md:h-[600px] rounded-2xl"
                  ></iframe>
                )}
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
