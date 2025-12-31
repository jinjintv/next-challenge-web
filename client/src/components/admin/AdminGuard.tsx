import { useEffect } from "react";
import { useLocation } from "wouter";
import pb from "@/lib/pocketbase";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const [, navigate] = useLocation();

  useEffect(() => {
    if (
      !pb.authStore.isValid ||
      pb.authStore.model?.role !== "admin"
    ) {
      navigate("/admin/login");
    }
  }, []);

  return <>{children}</>;
}
