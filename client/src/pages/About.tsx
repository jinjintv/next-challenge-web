import { motion } from 'framer-motion';
import { Link } from 'wouter';

export default function About() {
  // 숫자 데이터
  const stats = [
    { label: 'PROJECTS DONE', value: '200+' },
    { label: 'PARTNERSHIP CLIENTS', value: '36' },
    { label: 'SUCCESSFUL EVENTS', value: '100+' },
  ];

  // 4가지 공간(Gallery) 데이터
  const galleries = [
    {
      id: 'Gallery 1',
      title: 'Experience Planning',
      description: '단순한 이벤트를 넘어 브랜드의 메시지를 경험으로 치환하는 전략을 수립합니다. 우리는 타겟의 심리와 행동을 분석하여 공간의 모든 순간이 하나의 스토리가 되도록 설계합니다.',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80', // 기획안의 3D 추상 이미지 느낌
    },
    {
      id: 'Gallery 2',
      title: 'Visual Identity',
      description: '행사의 첫인상을 결정짓는 시각적 요소를 정교하게 조율합니다. 로고부터 공간 그래픽, 디지털 매체까지 일관된 미학을 적용하여 강력한 브랜드 아이덴티티를 구축합니다.',
      image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80', // 기획안의 블루톤 그래픽 느낌
    },
    {
      id: 'Gallery 3',
      title: 'Digital Interaction',
      description: '온오프라인의 경계를 허무는 디지털 솔루션을 제안합니다. 관객이 직접 참여하고 반응하는 인터랙티브 콘텐츠를 통해 더욱 깊은 몰입과 확산을 유도합니다.',
      image: 'https://images.unsplash.com/photo-1551288049-bbbda536639a?auto=format&fit=crop&q=80', // 기획안의 UI/데이터 이미지 느낌
    },
    {
      id: 'Gallery 4',
      title: 'Professional Operation',
      description: '철저한 시뮬레이션과 전문 인력을 통해 무결점 운영을 실현합니다. 보이지 않는 곳에서의 세밀한 조율이 행사를 하나의 완성된 작품으로 보존하고 빛나게 만듭니다.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80', // 기획안의 회의/인물 이미지 느낌
    }
  ];

  return (
    <div className="min-h-screen bg-[#f5f1e8] text-[#1d1e20] font-['Noto_Serif_KR']">


      {/* Main Content Start */}
      <main className="pt-44 pb-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Section */}
        <div className="mb-24">
          <h1 className="text-xl tracking-widest text-gray-400 mb-2 uppercase">Nextchallenge</h1>
          <h2 className="text-7xl font-bold mb-12">ABOUT</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <h3 className="text-5xl font-bold leading-tight break-keep">
              우리의 세계관을<br />구성하는 네 가지 공간
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed font-light">
              넥스트챌린지는 단순한 대행사를 넘어, 기획부터 운영까지 모든 과정을 예술적 관점에서 접근합니다. 
              우리가 창조하는 공간은 단순히 행사가 열리는 장소가 아닌, 브랜드와 사람의 교감이 일어나는 예술적 접점입니다.
              <br /><br />
              Experience Planning,<br />
              Identity Construction,<br />
              Digital Engagement,<br />
              Operational Excellence
            </p>
          </div>
        </div>

        {/* 4 Galleries (Masonry-like Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24 mb-40">
          {galleries.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className={`flex flex-col ${index % 2 === 1 ? 'md:mt-32' : ''}`}
            >
              <div className="aspect-[4/5] bg-gray-200 overflow-hidden mb-8 shadow-2xl">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
              </div>
              <span className="text-sm font-serif italic text-[#c1a961] mb-2">{item.id}</span>
              <h4 className="text-3xl font-bold mb-4">{item.title}</h4>
              <p className="text-gray-600 leading-relaxed font-light break-keep">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Partners Section */}
        <div className="mb-40">
          <h3 className="text-4xl font-bold mb-4">NEXTCHALLENGE PARTNERS</h3>
          <p className="text-gray-500 mb-12">넥스트챌린지는 시장의 흐름을 읽으며 미래로 나아가는 스마트 파트너십입니다.</p>
          <div className="bg-white/50 backdrop-blur-sm p-12 rounded-sm border border-black/5">
             {/* 파트너 로고 이미지 경로 (기획안의 12-543.webp 활용) */}
             <img src="/12-543.webp" alt="Partners" className="w-full h-auto grayscale opacity-70" />
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center border-t border-black/10 pt-24">
          <div>
            <p className="text-xl font-bold mb-4">Nextchallenge의 성장</p>
            <p className="text-gray-400 font-light">우리는 매년 한계를 넘어서고 있습니다.</p>
          </div>
          <div className="space-y-12">
            {stats.map((stat, i) => (
              <div key={i} className="border-b border-black/5 pb-8 last:border-0">
                <p className="text-7xl font-bold mb-2">{stat.value}</p>
                <p className="text-xs tracking-[0.3em] font-black text-gray-400 uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Closing Phrase */}
        <div className="mt-40 text-center py-20 border-t border-black">
          <p className="text-3xl font-serif italic tracking-tight">
            "Curating Perfection, Beyond the Spectacle."
          </p>
        </div>
      </main>

     
    </div>
  );
}