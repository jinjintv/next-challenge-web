import { Link } from "wouter";
import { useState, useEffect } from "react";

export default function Header() {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // 스크롤 아래 → 숨김
        setShowHeader(false);
      } else {
        // 스크롤 위 → 표시
        setShowHeader(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 font-['Noto_Serif_KR'] shadow-sm bg-white transition-transform duration-300 ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* 로고 */}
        <div className="w-32 h-20">
          <img
            src="/I12-623;2-19.webp"
            alt="Next Challenge Logo"
            className="w-full h-full object-contain"
          />
        </div>

        {/* 메뉴 */}
        <div className="flex gap-8 text-sm uppercase text-[#333333]">
          <Link href="/" className="hover:text-[#c1a961] transition">
            Home
          </Link>
          <Link href="/about" className="hover:text-[#c1a961] transition">
            About
          </Link>
          <Link href="/portfolio" className="hover:text-[#c1a961] transition">
            Portfolio
          </Link>
          <Link href="/contact" className="hover:text-[#c1a961] transition">
            Contacts
          </Link>
        </div>
      </nav>
    </header>
  );
}
