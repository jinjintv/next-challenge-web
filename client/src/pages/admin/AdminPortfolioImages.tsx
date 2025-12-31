import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import pb from "@/lib/pocketbase";
import { useEffect, useRef, useState } from "react";

type Img = {
  id: string;
  image: string;
  order: number;
};

function SortableItem({
  img,
  onDelete,
  onReplace,
}: {
  img: Img;
  onDelete: (id: string) => void;
  onReplace: (id: string, file: File) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: img.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="border p-2"
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-move mb-2"
      >
        <img
          src={pb.getFileUrl(img, img.image)}
          className="w-full h-40 object-cover"
        />
      </div>

      <div className="flex gap-2">
        {/* 교체 */}
        <button
          className="border px-2 py-1 text-xs"
          onClick={() =>
            fileInputRef.current?.click()
          }
        >
          교체
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={e => {
            if (e.target.files?.[0]) {
              onReplace(img.id, e.target.files[0]);
            }
          }}
        />

        {/* 삭제 */}
        <button
          className="border px-2 py-1 text-xs text-red-500"
          onClick={() => onDelete(img.id)}
        >
          삭제
        </button>
      </div>
    </div>
  );
}

export default function AdminPortfolioImages({
  portfolioId,
}: {
  portfolioId: string;
}) {
  const [images, setImages] = useState<Img[]>([]);

  const fetchImages = async () => {
    const res =
      await pb
        .collection("portfolio_images")
        .getFullList({
          filter: `portfolio="${portfolioId}"`,
          sort: "order",
        });
    setImages(res as Img[]);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  /** 드래그 정렬 */
  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = images.findIndex(i => i.id === active.id);
    const newIndex = images.findIndex(i => i.id === over.id);

    const newOrder = arrayMove(
      images,
      oldIndex,
      newIndex
    );

    setImages(newOrder);

    for (let i = 0; i < newOrder.length; i++) {
      await pb
        .collection("portfolio_images")
        .update(newOrder[i].id, {
          order: i,
        });
    }
  };

  /** 이미지 추가 */
  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("portfolio", portfolioId);
    formData.append("order", images.length.toString());
    formData.append("image", file);

    await pb
      .collection("portfolio_images")
      .create(formData);

    fetchImages();
  };

  /** 이미지 삭제 */
  const deleteImage = async (id: string) => {
    if (!confirm("이미지를 삭제할까요?")) return;
    await pb.collection("portfolio_images").delete(id);
    fetchImages();
  };

  /** 이미지 교체 */
  const replaceImage = async (
    id: string,
    file: File
  ) => {
    const formData = new FormData();
    formData.append("image", file);

    await pb
      .collection("portfolio_images")
      .update(id, formData);

    fetchImages();
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        상세 이미지 관리
      </h2>

      {/* 업로드 */}
      <input
        type="file"
        accept="image/*"
        className="mb-4"
        onChange={e => {
          if (e.target.files?.[0]) {
            uploadImage(e.target.files[0]);
            e.target.value = "";
          }
        }}
      />

      {/* 이미지 리스트 */}
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={images.map(i => i.id)}
        >
          <div className="grid grid-cols-3 gap-4">
            {images.map(img => (
              <SortableItem
                key={img.id}
                img={img}
                onDelete={deleteImage}
                onReplace={replaceImage}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
