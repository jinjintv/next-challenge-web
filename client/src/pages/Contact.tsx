import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const scatteredImages = [
    { src: "/12-547.webp", top: "8%", left: "12%", z: 10, size: "w-44" },
    { src: "/12-548.webp", top: "4%", left: "48%", z: 5, size: "w-52" },
    { src: "/12-549.webp", top: "42%", left: "4%", z: 15, size: "w-48" },
    { src: "/12-550.webp", top: "38%", left: "58%", z: 8, size: "w-56" },
    { src: "/12-551.webp", top: "68%", left: "14%", z: 12, size: "w-44" },
    { src: "/12-552.webp", top: "62%", left: "42%", z: 9, size: "w-60" },
    {
      src: "/logo-icon.webp",
      top: "28%",
      left: "32%",
      z: 20,
      size: "w-28",
      isLogo: true,
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Sending data:", formData);

      await emailjs.send(
        "service_dfl48kd",      // EmailJS 서비스 ID
        "template_q2lmwqq",     // EmailJS 템플릿 ID
        {
          name: formData.name,          // {{name}}
          email: formData.email,        // {{email}}
          message: formData.message,    // {{message}}
          time: new Date().toLocaleString(), // {{time}}
        },
        "IyySXNpLnoekNWav5"     // EmailJS 퍼블릭 키
      );

      alert("문의가 전송되었습니다.");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      alert("전송 실패. 나중에 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f5f1e8] text-[#1d1e20] font-['Noto_Serif_KR'] overflow-hidden">
      <main className="pt-32 pb-40 max-w-[1600px] mx-auto flex flex-col lg:flex-row items-center">
        {/* LEFT : 이미지 영역 */}
        <div className="relative w-full lg:w-1/2 h-[500px] lg:h-[700px]">
          {scatteredImages.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{
                scale: 1.05,
                zIndex: 30,
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
              }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              style={{ top: img.top, left: img.left, zIndex: img.z }}
              className={`absolute ${img.size} transition-all duration-300`}
            >
              <div
                className={`${
                  img.isLogo ? "bg-[#221e1f] p-7" : "bg-white p-2.5"
                }`}
              >
                <img
                  src={img.src}
                  alt="Archive"
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* RIGHT : 입력 영역 */}
        <div className="w-full lg:w-1/2 px-10 lg:px-20 mt-20 lg:mt-0 z-40">
          <div className="max-w-md">
            {/* 헤더 텍스트 */}
            <header className="mb-14">
              <span className="text-xs tracking-[0.5em] text-gray-400 uppercase font-light">
                Nextchallenge
              </span>
              <h1 className="text-8xl font-bold tracking-tighter leading-none mt-2 mb-8 uppercase">
                Contact
              </h1>
              <div className="space-y-2 text-[13px]">
                <p className="font-bold text-lg text-[#141414]">
                  (주)넥스트챌린지
                </p>
                <p className="text-gray-500 leading-relaxed">
                  인천광역시 남동구 청능대로 581,
                  <br />
                  502-496호실(논현동, 광성프라자)
                </p>
                <p className="font-serif italic text-[#c1a961] text-base mt-4">
                  010-5290-6079 | MJ@nextchallenge.kr
                </p>
              </div>
            </header>

            {/* 폼 */}
            <form className="space-y-10" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="NAME"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-transparent border-b border-gray-300 py-3 outline-none focus:border-black transition text-sm tracking-widest uppercase placeholder:text-gray-300"
                required
              />

              <input
                type="email"
                placeholder="EMAIL"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full bg-transparent border-b border-gray-300 py-3 outline-none focus:border-black transition text-sm tracking-widest uppercase placeholder:text-gray-300"
                required
              />

              <textarea
                rows={3}
                placeholder="MESSAGE"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full bg-transparent border-b border-gray-300 py-3 outline-none focus:border-black transition text-sm tracking-widest uppercase resize-none placeholder:text-gray-300"
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="group relative w-full h-14 bg-black overflow-hidden transition-all duration-500 disabled:opacity-50"
              >
                <div className="absolute inset-0 bg-[#c1a961] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative z-10 text-white text-[11px] font-bold tracking-[0.4em]">
                  {loading ? "SENDING..." : "SEND MESSAGE"}
                </span>
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
