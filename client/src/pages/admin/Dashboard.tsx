import { Link } from "wouter";
import AdminGuard from "@/components/admin/AdminGuard";

export default function AdminDashboard() {
  return (
    <AdminGuard>
      <div className="p-10">
        <h1 className="text-3xl font-bold mb-10">
          Admin Dashboard
        </h1>

        <Link
          href="/admin/portfolio"
          className="inline-block border px-6 py-4"
        >
          Portfolio 관리
        </Link>
      </div>
    </AdminGuard>
  );
}
