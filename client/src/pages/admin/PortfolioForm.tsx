import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import pb from "@/lib/pocketbase";
import AdminGuard from "@/components/admin/AdminGuard";

type Props = {
  id?: string;
};

export default function PortfolioForm({ id }: Props) {
  const [, navigate] = useLocation();

  const [title, setTitle] = useState("");
  const [year, setYear] = useState<number | "">("");
  const [description, setDescription] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  // 수정 모드일 때 기존 데이터 불러오기
  useEffect(() => {
    if (!id) return;

    pb.collection("portfolio").getOne(id).then(item => {
      setTitle(item.title);
      setYear(item.year);
      setDescription(item.description || "");
      setIsPublished(item.isPublished);
    });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    if (year) formData.append("year", String(year));
    formData.append("description", description);
    formData.append("isPublished", String(isPublished));

    if (!id) {
      formData.append("author", pb.authStore.model!.id);
    }

    if (coverImage) {
      formData.append("coverImage", coverImage);
    }

    images.forEach(img => {
      formData.append("images", img);
    });

    try {
      if (id) {
        await pb.collection("portfolio").update(id, formData);
      } else {
        await pb.collection("portfolio").create(formData);
      }

      navigate("/admin/portfolio");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminGuard>
      <div className="p-10 max-w-3xl">
        <h1 className="text-2xl font-bold mb-8">
          {id ? "포트폴리오 수정" : "포트폴리오 작성"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            className="w-full border p-3"
            placeholder="제목"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />

          <input
            type="number"
            className="w-full border p-3"
            placeholder="연도"
            value={year}
            onChange={e => setYear(Number(e.target.value))}
          />

          <textarea
            className="w-full border p-3 h-40"
            placeholder="설명"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />

          <div>
            <label className="block font-semibold mb-2">
              커버 이미지
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={e =>
                setCoverImage(e.target.files?.[0] || null)
              }
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">
              상세 이미지
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={e =>
                setImages(
                  e.target.files
                    ? Array.from(e.target.files)
                    : []
                )
              }
            />
          </div>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={isPublished}
              onChange={e => setIsPublished(e.target.checked)}
            />
            게시하기
          </label>

          <button
            disabled={loading}
            className="bg-black text-white px-6 py-3"
          >
            {loading ? "저장 중..." : "저장"}
          </button>
        </form>
      </div>
    </AdminGuard>
  );
}
