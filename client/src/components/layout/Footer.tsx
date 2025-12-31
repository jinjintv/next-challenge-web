import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

export default function Footer() {
  const footerSection = useIntersectionObserver();

  return (
    <footer
      ref={footerSection.ref}
      className={`bg-[#221e1f] text-white py-16 px-4 sm:px-6 lg:px-8 font-['Noto_Serif_KR'] fade-in-section ${
        footerSection.isVisible ? "visible" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <img
              src="/I12-622;2-111.webp"
              alt="Next Challenge"
              className="w-32 h-auto"
            />
          </div>

          <div>
            <h4 className="text-base font-bold uppercase mb-4">Contacts</h4>
            <p className="text-sm mb-3">
              인천광역시 남동구 청능대로 581,
              <br />
              502-496호실(논현동, 광성프라자)
            </p>
            <p className="text-sm mb-2">010-5290-6079</p>
            <p className="text-sm">MJ@nextchallenge.kr</p>
          </div>

          <div>
            <h4 className="text-base font-bold uppercase mb-4">SNS</h4>
            <div className="flex gap-4">
              <div className="w-6 h-6 border-2 border-white rounded flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
            </div>
          </div>

          <div />
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-xs text-gray-400">
          <p>NextChallenge © 2025 All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}
