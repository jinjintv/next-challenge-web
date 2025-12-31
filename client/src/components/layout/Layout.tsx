import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f5f1e8] text-[#1d1e20]">
      <Header />

      {/* 헤더 고정이니까 padding-top 필요 */}
      <main className="pt-32">
        {children}
      </main>

      <Footer />
    </div>
  );
}
