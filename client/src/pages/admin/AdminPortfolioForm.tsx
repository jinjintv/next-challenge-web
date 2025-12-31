import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import pb from "@/lib/pocketbase";
import AdminGuard from "@/components/admin/AdminGuard";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/* =====================
   상수
===================== */
const CATEGORIES = [
  "E-SPORTS",
  "FESTIVAL",
  "EXHIBITION",
  "CORPORATE",
];

export default function AdminPortfolioForm({ id }: { id?: string }) {
  const [, setLocation] = useLocation();

  const [title, setTitle] = useState("");
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [category, setCategory] = useState("E-SPORTS");

  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  /* =====================
     기존 데이터 로드
  ===================== */
  useEffect(() => {
    if (!id) return;

    const fetchItem = async () => {
      const data = await pb.collection("portfolio").getOne(id);

      setTitle(data.title);
      setYear(data.year);
      setCategory(data.category);
      setContent(data.content || "");

      if (data.thumbnail) {
        setThumbnailPreview(pb.getFileUrl(data, data.thumbnail));
      }

      if (data.images?.length) {
        setImagePreviews(
          data.images.map((img: string) =>
            pb.getFileUrl(data, img)
          )
        );
      }
    };

    fetchItem();
  }, [id]);

  /* =====================
     추가 이미지 핸들러
  ===================== */
  const handleImagesChange = (files: FileList | null) => {
    if (!files) return;

    const fileArr = Array.from(files);
    setImages(fileArr);
    setImagePreviews(fileArr.map(file => URL.createObjectURL(file)));
  };

  /* =====================
     저장
  ===================== */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("year", year.toString());
      formData.append("category", category);
      formData.append("content", content);

      if (thumbnail) {
        formData.append("thumbnail", thumbnail);
      }

      images.forEach(img => {
        formData.append("images", img);
      });

      if (id) {
        await pb.collection("portfolio").update(id, formData);
      } else {
        formData.append("isPublished", "0");
        await pb.collection("portfolio").create(formData);
      }

      setLocation("/admin/portfolio");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminGuard>
      <div className="p-10 max-w-6xl">
        <h1 className="text-3xl font-bold mb-8">
          {id ? "포트폴리오 수정" : "포트폴리오 추가"}
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-10">
          {/* ===== 왼쪽 ===== */}
          <div className="space-y-6">
            <input
              className="border w-full p-3"
              placeholder="제목"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />

            <input
              type="number"
              className="border w-full p-3"
              value={year}
              onChange={e => setYear(Number(e.target.value))}
              required
            />

            {/* 카테고리 */}
            <div>
              <p className="font-bold mb-2">카테고리</p>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="border w-full p-3"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* 썸네일 */}
            <div>
              <p className="font-bold mb-2">썸네일</p>
              {thumbnailPreview && (
                <img src={thumbnailPreview} className="w-48 mb-3 border" />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={e =>
                  e.target.files && setThumbnail(e.target.files[0])
                }
              />
            </div>

            {/* 추가 이미지 */}
            <div>
              <p className="font-bold mb-2">상세 이미지 (여러 장)</p>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={e => handleImagesChange(e.target.files)}
              />

              <div className="grid grid-cols-3 gap-3 mt-3">
                {imagePreviews.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    className="aspect-square object-cover border"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ===== 오른쪽 ===== */}
          <div>
            <p className="font-bold mb-2">본문 (Markdown)</p>

            <textarea
              className="border w-full h-[360px] p-4 font-mono text-sm"
              value={content}
              onChange={e => setContent(e.target.value)}
            />

            <p className="font-bold mt-6 mb-2">미리보기</p>
            <div className="border p-4 prose max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
              </ReactMarkdown>
            </div>
          </div>

          <button
            disabled={loading}
            className="border px-6 py-3 col-span-2"
          >
            {loading ? "저장 중…" : "저장"}
          </button>
        </form>
      </div>
    </AdminGuard>
  );
}
