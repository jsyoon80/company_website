import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2"; // 팝업에 사용

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    region: "",
    inquiryType: "",
    message: "",
    status: "in progress",
  });

  const [agree, setAgree] = useState(false); // ✅ 동의 체크박스 상태

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agree) {
      Swal.fire("알림", "개인정보 수집 및 이용에 동의해야 합니다.", "warning");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/contact",
        formData
      );

      if (response.status === 201) {
        Swal.fire("성공", "문의가 성공적으로 접수되었습니다.", "success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          region: "",
          inquiryType: "",
          message: "",
          status: "in progress",
        });
        setAgree(false);
      }
    } catch (error) {
      console.log("에러 발생: ", error);
      Swal.fire("에러", "문의 접수 중 오류가 발생했습니다.", "error");
    }
  };

  const handlePolicyView = () => {
    Swal.fire({
      title: "개인정보 처리방침",
      html: `
        <div style="text-align:left; max-height:300px; overflow:auto;">
          <p>iRDA(이하 "회사"라 칭함)은 「개인정보보호법」을 준수하고 있으며...</p>
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

  return (
    <div className="min-h-screen bg-white py-32">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            제품 문의
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            정성을 다해 답변을 해드리겠습니다.<br/>
            AI비전 에이전트 솔루션 개발부터, 설치와 유지보수까지, 전문가와 상담하세요. 
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* 폼 */}
          <div>
            <form className="bg-white rounded-2xl shadow-xl p-8" onSubmit={handleSubmit}>
              <div className="space-y-6">

                {/* 이름 */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">이름</label>
                  <input
                    type="text"
                    name="name"
                    className="w-full p-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-200"
                    placeholder="홍길동"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                {/* 이메일 */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">이메일</label>
                  <input
                    type="email"
                    name="email"
                    className="w-full p-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-200"
                    placeholder="example@example.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                {/* 전화번호 */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">전화번호</label>
                  <input
                    type="tel"
                    name="phone"
                    className="w-full p-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-200"
                    placeholder="010-1234-5678"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                {/* 지역 */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">지역</label>
                  <input
                    type="text"
                    name="region"
                    className="w-full p-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-200"
                    placeholder="서울특별시 강남구"
                    required
                    value={formData.region}
                    onChange={handleChange}
                  />
                </div>

                {/* 문의분야 */}
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

                {/* 문의내용 */}
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

                {/* 개인정보 수집 및 동의 */}
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

                {/* 제출 버튼 */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300"
                >
                  작성 완료
                </button>

              </div>
            </form>
          </div>

          {/* 연락처 및 지도 */}
          <div className="space-y-8">
            {/* 연락처 블록 */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">연락처 정보</h3>
              {[
                { title: "전화", info: "02-2277-5700", desc: "평일 09:00 - 18:00" },
                { title: "이메일", info: "biz@irda-ai.com", desc: "24시간 접수 가능" },
                { title: "주소", info: "서울특별시 강남구 테헤란로 79길 6, JS타워", desc: "본사" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start">
                  <div className="ml-4">
                    <h4 className="font-medium text-gray-800">{item.title}</h4>
                    <p className="text-gray-600">{item.info}</p>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* 지도 */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6330.2185932615885!2d127.04812279918823!3d37.50534026465375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca41388c1e5a9%3A0xc35f5ab80bea1d8d!2zSlPtg4Dsm4w!5e0!3m2!1sko!2skr!4v1745386124781!5m2!1sko!2skr"
                width="100%"
                height="400"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-[400px] md:h-[600px] lg:h-[600px]"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;