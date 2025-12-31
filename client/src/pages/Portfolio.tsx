import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, Columns, X } from "lucide-react";
import pb from "@/lib/pocketbase";

/* =====================
   타입
===================== */
type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  year: string;
  content: string;
  image: string;
};

export default function Portfolio() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [viewType, setViewType] = useState<"scroll" | "grid">("scroll");
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [filter, setFilter] = useState("ALL");

  const scrollRef = useRef<HTMLDivElement>(null);

  /* =====================
     PocketBase 데이터
  ===================== */
  useEffect(() => {
    const fetchData = async () => {
      const records = await pb.collection("portfolio").getFullList({
        sort: "-year",
        filter: "isPublished = true",
      });

      setItems(
        records.map((r: any) => ({
          id: r.id,
          title: r.title,
          category: r.category,
          year: r.year,
          content: r.content,
          image: pb.getFileUrl(r, r.thumbnail),
        }))
      );

      setLoading(false);
    };

    fetchData();
  }, []);

  /* =====================
     마우스 휠 → 가로 이동
  ===================== */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || viewType !== "scroll") return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      el.scrollLeft += e.deltaY * 3;
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [viewType, filter]);

  const filteredItems =
    filter === "ALL"
      ? items
      : items.filter((item) => item.category === filter);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400 uppercase">
        Loading…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f1e8] text-[#1d1e20] font-['Noto_Serif_KR'] overflow-x-hidden">

      {/* 스크롤바 제거 */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { scrollbar-width: none; }
      `}</style>

      {/* ===== TITLE ===== */}
      <div className="max-w-7xl mx-auto px-8 pt-44 mb-12">
        <h1 className="text-7xl font-light text-gray-300/40 uppercase">
          Nextchallenge
        </h1>

        <div className="flex justify-between items-end mt-8">
          <div>
            <h2 className="text-5xl font-bold mb-8">PORTFOLIO</h2>

            <div className="flex gap-8 text-xs font-bold uppercase text-gray-400">
              {["ALL", "E-SPORTS", "FESTIVAL", "EXHIBITION", "CORPORATE"].map(
                (cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`pb-1 ${
                      filter === cat
                        ? "text-black border-b-2 border-black"
                        : "hover:text-black"
                    }`}
                  >
                    {cat}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setViewType("scroll")}
              className={viewType === "scroll" ? "text-black" : "text-gray-300"}
            >
              <Columns />
            </button>
            <button
              onClick={() => setViewType("grid")}
              className={viewType === "grid" ? "text-black" : "text-gray-300"}
            >
              <LayoutGrid />
            </button>
          </div>
        </div>
      </div>

      {/* ===== CONTENT ===== */}
      <div className="px-8 pb-32">
        {/* Scroll View */}
        {viewType === "scroll" && (
          <div
            ref={scrollRef}
            className="flex overflow-x-auto no-scrollbar cursor-grab"
          >
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="flex-shrink-0 w-[85vw] md:w-[480px] border-r bg-white/20 hover:bg-white/40 cursor-pointer"
              >
                <div className="px-10 pt-12 mb-16 h-[240px]">
                  <h3 className="text-3xl font-bold mb-10">{item.title}</h3>
                  <div className="flex justify-between text-xs font-bold uppercase text-gray-400">
                    <span>{item.category}</span>
                    <span>{item.year}</span>
                  </div>
                </div>

                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    className="w-full h-full object-cover hover:scale-110 transition duration-[1200ms]"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Grid View */}
       {/* Grid View */}
{viewType === "grid" && (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {filteredItems.map((item) => (
      <motion.div
        key={item.id}
        onClick={() => setSelectedItem(item)}
        className="bg-white/20 hover:bg-white/40 cursor-pointer overflow-hidden"
      >
        {/* 이미지 비율 3/4 */}
        <div className="aspect-[3/4] overflow-hidden">
          <img
            src={item.image}
            className="w-full h-full object-cover hover:scale-110 transition duration-500"
          />
        </div>
        {/* 제목/정보 */}
        <div className="p-3">
          <h3 className="text-md font-bold">{item.title}</h3>
          <div className="flex justify-between text-xs font-bold uppercase text-gray-400">
            <span>{item.category}</span>
            <span>{item.year}</span>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
)}

      </div>

      {/* ===== DETAIL MODAL ===== */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative bg-white max-w-5xl w-full h-[70vh] grid grid-cols-1 md:grid-cols-2 overflow-hidden shadow-2xl"
            >
              {/* 닫기 버튼 */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-6 right-6 z-20 p-3 rounded-full
                           bg-white/80 hover:bg-black hover:text-white
                           transition-all duration-300"
                aria-label="Close"
              >
                <X size={20} />
              </button>

              {/* 이미지 영역 */}
              <div className="bg-black">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* 본문 영역 */}
              <div className="p-10 md:p-14 overflow-y-auto">
                <span className="text-xs font-black text-[#c1a961] uppercase tracking-widest">
                  {selectedItem.category}
                </span>

                <h3 className="text-4xl font-bold my-6 leading-tight">
                  {selectedItem.title}
                </h3>

                <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
                  {selectedItem.content}
                </p>

                <p className="mt-10 text-sm text-gray-400 italic">
                  {selectedItem.year} · Nextchallenge Archive
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
