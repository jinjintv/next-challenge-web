import { useState } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

export default function Home() {
  const [expandedService, setExpandedService] = useState<number | null>(0);

  // Intersection Observer hooks for each section
  const heroSection = useIntersectionObserver();
  const principlesSection = useIntersectionObserver();
  const partnersSection = useIntersectionObserver();
  const masterpieceSection = useIntersectionObserver();
  const serviceSection = useIntersectionObserver();
  const footerSection = useIntersectionObserver();

  const services = [
    {
      title: '운영',
      icon: '/12-596.webp',
      description: '갤러리 아카이브의 정교한 관리 시스템처럼, 모든 행사의 현장을 무결점으로 유지하는 넥스트챌린지만의 전문 운영 프로세스를 제안합니다. 우리는 단순히 인력을 배치하는 것을 넘어, 행사의 모든 동선과 타임라인을 하나의 정밀한 시나리오로 설계하여 관람객이 오직 현장의 가치에만 집중할 수 있는 완벽한 몰입 환경을 조성합니다. 철저한 사전 시뮬레이션과 기술 운영을 통해 어떠한 돌발 변수 속에서도 안정적인 행사를 보장하며 프로젝트의 완성도를 최상으로 끌어올립니다. 보이지 않는 곳에서 현장의 모든 요소를 세밀하게 조율하는 우리의 운영은 행사를 하나의 완성된 작품으로 보존하고 빛나게 만드는 가장 중요한 기반이 됩니다.'
    },
    {
      title: '연출',
      icon: '/12-603.webp',
      description: '감정과 경험을 시각화하는 우리의 연출 능력은 단순한 이벤트를 예술 작품으로 변환합니다. 공간의 모든 요소를 정교하게 조율하여 관객의 감정 여정을 설계하고, 브랜드의 메시지를 강렬하고 기억에 남는 경험으로 전달합니다.'
    },
    {
      title: '기획',
      icon: '/12-608.webp',
      description: '전략적 사고와 창의적 아이디어가 만나는 기획 단계에서 모든 것이 시작됩니다. 우리는 클라이언트의 목표를 깊이 있게 분석하고, 시장의 트렌드를 반영하여 차별화된 이벤트 콘셉트를 개발합니다. 철저한 리서치와 데이터 기반의 전략으로 최고의 결과를 보장합니다.'
    },
    {
      title: '통역',
      icon: '/12-613.webp',
      description: '국제 행사에서 언어의 장벽을 넘어 완벽한 소통을 실현합니다. 전문 통역사 네트워크와 기술적 지원으로 모든 참석자가 동등한 경험을 할 수 있도록 보장하며, 문화적 뉘앙스까지 정확하게 전달합니다.'
    },
    {
      title: '현장인력',
      icon: '/12-618.webp',
      description: '숙련된 현장 스태프는 행사의 눈에 띄지 않는 영웅입니다. 철저한 교육과 훈련을 받은 우리의 인력은 모든 상황에 신속하게 대응하며, 참석자들에게 최고의 서비스 경험을 제공합니다. 세심한 배려와 전문성으로 행사의 완성도를 높입니다.'
    }
  ];

  // 마스터피스 섹션에서 흐를 이미지들
  const masterpieceImages = [
    '/12-547.webp', '/12-548.webp', '/12-549.webp', '/12-550.webp', 
    '/12-551.webp', '/12-552.webp', '/12-553.webp'
  ];

  const toggleService = (index: number) => {
    setExpandedService(expandedService === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#f5f1e8] text-[#1d1e20] font-['Noto_Serif_KR'] overflow-x-hidden">


      {/* Hero Section */}
      <section
        ref={heroSection.ref}
        className={`pt-32 pb-20 px-4 sm:px-6 lg:px-8 text-center fade-in-section ${heroSection.isVisible ? 'visible' : ''}`}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            NEXTCHALLENGE<br />
            <span className="text-4xl sm:text-4xl lg:text-4xl">모든 프로젝트를 하나의 작품처럼 바라보고,<br />기억에 남는 경험을 완성합니다.</span>
          </h1>
          <p className="text-lg sm:text-xl text-[#31373d] max-w-2xl mx-auto">
            Every project is approached as a single, cohesive work of art, crafted to deliver a memorable experience.
          </p>
        </div>
      </section>

      {/* Curatorial Principles Section */}
      <section
        ref={principlesSection.ref}
        className={`py-20 px-4 sm:px-6 lg:px-8 bg-white fade-in-section ${principlesSection.isVisible ? 'visible' : ''}`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div>
              <h3 className="text-[#c1a961] text-2xl sm:text-3xl font-semibold uppercase mb-4">
                Curatorial Principles<br />
                <span className="text-xl">큐레이션의 기준</span>
              </h3>
              <p className="text-base sm:text-lg text-[#141414] leading-relaxed">
                단순한 진행을 넘어 주최자와 관객이 교감하는 독창적인 스토리를 설계합니다.<br />
                브랜드의 가치를 감각적인 공간과 콘텐츠로 시각화하여 행사의 고유한 아이덴티티를 정립합니다.
              </p>
            </div>
            <div className="bg-gray-300 h-64 rounded-lg overflow-hidden">
              <img src="/12-509.webp" alt="Curatorial Principles" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div className="bg-gray-300 h-64 rounded-lg overflow-hidden order-2 lg:order-1">
              <div className="w-full h-full bg-[#141414]/50"></div>
            </div>
            <div className="order-1 lg:order-2">
              <h3 className="text-[#c1a961] text-2xl sm:text-3xl font-semibold uppercase mb-4">
                What Defines Our Work<br />
                <span className="text-xl">우리의 작업을 규정하는 것들</span>
              </h3>
              <p className="text-base sm:text-lg text-[#141414] leading-relaxed">
                프로젝트의 목적을 명확히 분석하여 타겟의 공감을 이끌어내는 최적화된 솔루션을 제안합니다.<br />
                탄탄한 기획력 위에 트렌디한 감각을 더해 오감을 만족시키는 현장 경험을 제공합니다.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div>
              <h3 className="text-[#c1a961] text-2xl sm:text-3xl font-semibold uppercase mb-4">
                Exhibition Standards<br />
                <span className="text-xl">전시의 기준</span>
              </h3>
              <p className="text-base sm:text-lg text-[#141414] leading-relaxed">
                철저한 사전 시뮬레이션과 체계적인 매뉴얼로 한 치의 오차 없는 현장 운영을 보장합니다.<br />
                예기치 못한 변수까지 고려한 리스크 관리로 안정적이고 몰입감 있는 환경을 조성합니다.
              </p>
            </div>
            <div className="bg-gray-300 h-64 rounded-lg overflow-hidden">
              <div className="w-full h-full bg-[#141414]/50"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-gray-300 h-64 rounded-lg overflow-hidden order-2 lg:order-1">
              <div className="w-full h-full bg-[#141414]/50"></div>
            </div>
            <div className="order-1 lg:order-2">
              <h3 className="text-[#c1a961] text-2xl sm:text-3xl font-semibold uppercase mb-4">
                Signature Approach<br />
                <span className="text-xl">넥스트챌린지의 시그니처</span>
              </h3>
              <p className="text-base sm:text-lg text-[#141414] leading-relaxed">
                아이디어 발굴부터 사후 리포트까지 전 과정을 책임지는 통합 매니지먼트를 실현합니다.<br />
                단순한 행사를 넘어 파트너사의 목표 그 이상의 가치를 창출하는 성공적인 파트너십을 지향합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section
        ref={partnersSection.ref}
        className={`py-20 px-4 sm:px-6 lg:px-8 bg-[#f5f1e8] fade-in-section ${partnersSection.isVisible ? 'visible' : ''}`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">NEXTCHALLENGE PARTNERS</h2>
          <p className="text-lg sm:text-xl text-[#31373d] mb-12 max-w-2xl">
            넥스트챌린지의 가치에 공감하며 함께해 온 소중한 파트너사들입니다.<br />
            우리는 파트너의 비즈니스 가치를 극대화하는 최적의 이벤트를 만듭니다.
          </p>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <img src="/12-543.webp" alt="Partners" className="w-full h-auto" />
          </div>
        </div>
      </section>

      {/* Masterpiece Collection Section (액자 애니메이션 적용) */}
      <section
        ref={masterpieceSection.ref}
        className={`py-20 bg-white fade-in-section ${masterpieceSection.isVisible ? 'visible' : ''}`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-4xl font-bold mb-4">MASTERPIECE COLLECTION</h2>
          <p className="text-lg sm:text-xl text-[#31373d] mb-12 max-w-2xl">
            우리는 이벤트를 개최하는 것을 넘어, 잊히지 않는 경험을 조각합니다.<br />
            시간과 공간의 미학을 담아낸 성공적인 프로젝트들의 컬렉션입니다.
          </p>
        </div>

        {/* 액자 무한 슬라이드 */}
        <div className="relative overflow-hidden py-10">
          <motion.div 
            className="flex gap-10"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
            {[...masterpieceImages, ...masterpieceImages].map((src, idx) => (
              <div key={idx} className="relative flex-shrink-0 group pt-6">
                {/* 액자 고리 */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-6 z-10">
                   <div className="w-full h-full border-2 border-gray-300 rounded-full bg-white relative">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-gray-300 rounded-full" />
                   </div>
                </div>
                {/* 액자 프레임 */}
                <div className="bg-white p-4 pb-10 shadow-[0_15px_35px_rgba(0,0,0,0.1)] border border-gray-100 group-hover:-translate-y-3 transition-transform duration-500">
                  <div className="w-[240px] h-[320px] overflow-hidden">
                    <img src={src} className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700" alt="Masterpiece" />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          {/* Portfolio Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-t border-b border-gray-200">
                  <th className="text-left py-4 px-4 text-sm font-medium uppercase text-[#141414]">행사명</th>
                  <th className="text-left py-4 px-4 text-sm font-medium uppercase text-[#141414]">주최사</th>
                  <th className="text-left py-4 px-4 text-sm font-medium uppercase text-[#141414]">주관사</th>
                  <th className="text-left py-4 px-4 text-sm font-medium uppercase text-[#141414]">2025</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(6)].map((_, i) => (
                  <tr key={i} className="border-b border-gray-200">
                    <td className="py-4 px-4 text-sm text-[#141414]">행사명</td>
                    <td className="py-4 px-4 text-sm text-[#141414]">주최사</td>
                    <td className="py-4 px-4 text-sm text-[#141414]">주관사</td>
                    <td className="py-4 px-4 text-sm text-[#141414]">2025</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Our Service Section with Accordion */}
      <section
        ref={serviceSection.ref}
        className={`py-20 px-4 sm:px-6 lg:px-8 bg-[#f5f1e8] fade-in-section ${serviceSection.isVisible ? 'visible' : ''}`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold mb-12">OUR SERVICE</h2>
          
          <div className="space-y-0">
            {services.map((service, idx) => (
              <div key={idx} className="border-b border-[#282828]">
                <button
                  onClick={() => toggleService(idx)}
                  className="w-full py-6 flex items-center justify-between hover:bg-white/30 transition-colors duration-200"
                >
                  <div className="flex items-center gap-6 flex-1 text-left">
                    <img src={service.icon} alt={service.title} className="w-32 h-10 rounded-full object-cover flex-shrink-0" />
                    <h3 className="text-2xl sm:text-3xl font-semibold text-black">{service.title}</h3>
                  </div>
                  <div className="flex-shrink-0 ml-4">
                    <span
                      className={`text-3xl font-light text-gray-600 transition-transform duration-300 ${
                        expandedService === idx ? 'rotate-45' : ''
                      }`}
                    >
                      +
                    </span>
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    expandedService === idx ? 'max-h-[500px]' : 'max-h-0'
                  }`}
                >
                  <div className="px-4 sm:px-0 pb-6 pt-2 ml-0 sm:ml-40">
                    <p className="text-base sm:text-lg text-black leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}