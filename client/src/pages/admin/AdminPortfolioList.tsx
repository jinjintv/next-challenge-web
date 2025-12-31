import { useEffect, useState } from "react";
import { Link } from "wouter";
import pb from "@/lib/pocketbase";
import AdminGuard from "@/components/admin/AdminGuard";

type Portfolio = {
  id: string;
  title: string;
  year: number;
  isPublished: boolean;
};

export default function AdminPortfolioList() {
  const [items, setItems] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchList = async () => {
    try {
      setLoading(true);
      const res = await pb
        .collection("portfolio")
        .getList(1, 50, { sort: "-created" });
      setItems(res.items as Portfolio[]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const togglePublish = async (item: Portfolio) => {
    await pb.collection("portfolio").update(item.id, {
      isPublished: !item.isPublished,
    });
    fetchList();
  };

  const deleteItem = async (id: string) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    await pb.collection("portfolio").delete(id);
    fetchList();
  };

  return (
    <AdminGuard>
      <div className="p-10">
        <h1 className="text-3xl font-bold mb-6">
          Portfolio Manager
        </h1>

        {/* ✅ 추가 버튼 */}
        <Link
          href="/admin/portfolio/new"
          className="inline-block border px-4 py-2 mb-8"
        >
          + 포트폴리오 추가
        </Link>

        {loading && <p>불러오는 중...</p>}

        <div className="space-y-4">
          {items.map(item => (
            <div
              key={item.id}
              className="flex justify-between items-center border p-4"
            >
              <div>
                <h3 className="font-bold">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.year}</p>
              </div>

              <div className="flex gap-3">
                {/* ✅ 수정 버튼 */}
                <Link
                  href={`/admin/portfolio/${item.id}/edit`}
                  className="px-3 py-1 text-sm border"
                >
                  수정
                </Link>

                <button
                  onClick={() => togglePublish(item)}
                  className={`px-3 py-1 text-sm border ${
                    item.isPublished
                      ? "bg-black text-white"
                      : "bg-white"
                  }`}
                >
                  {item.isPublished ? "Published" : "Draft"}
                </button>

                <button
                  onClick={() => deleteItem(item.id)}
                  className="px-3 py-1 text-sm border border-red-500 text-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminGuard>
  );
}
