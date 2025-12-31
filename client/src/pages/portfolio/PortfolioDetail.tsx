import { useEffect, useState } from "react";
import { useParams } from "wouter";
import pb from "@/lib/pocketbase";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Image = {
  id: string;
  image: string;
};

export default function PortfolioDetail() {
  const { id } = useParams<{ id: string }>();
  const [images, setImages] = useState<Image[]>([]);
  const [portfolio, setPortfolio] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      // 포트폴리오 기본 정보
      const data = await pb.collection("portfolio").getOne(id);
      setPortfolio(data);

      // 🔥 정렬된 이미지 리스트
      const imgs = await pb
        .collection("portfolio_images")
        .getFullList({
          filter: `portfolio="${id}"`,
          sort: "order",
        });

      setImages(imgs as Image[]);
    };

    fetchData();
  }, [id]);

  if (!portfolio) return <p>Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-10">
      <h1 className="text-4xl font-bold mb-4">
        {portfolio.title}
      </h1>

      <p className="text-gray-500 mb-10">
        {portfolio.year}
      </p>

      <div className="space-y-6">
        {images.map(img => (
          <img
            key={img.id}
            src={pb.getFileUrl(img, img.image)}
            alt=""
            className="w-full"
          />
        ))}
      </div>
      <div className="prose max-w-none mt-16">
  <ReactMarkdown remarkPlugins={[remarkGfm]}>
    {portfolio.content}
  </ReactMarkdown>
</div>

    </div>
  );
}
