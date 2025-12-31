import { useState } from "react";
import { useLocation } from "wouter";
import pb from "@/lib/pocketbase";

export default function AdminLogin() {
  const [, navigate] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await pb
        .collection("users")
        .authWithPassword(email, password);

      // 로그인 성공 확인
      console.log("LOGIN USER:", pb.authStore.model);

      // 관리자만 통과
      if (pb.authStore.model?.role !== "admin") {
        pb.authStore.clear();
        throw new Error("관리자 계정이 아닙니다.");
      }

      navigate("/admin");
    } catch (err: any) {
      setError(err.message || "로그인 실패");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f1e8]">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 w-96 shadow-lg"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          Admin Login
        </h1>

        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full border px-4 py-3 mb-4"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border px-4 py-3 mb-6"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button className="w-full bg-black text-white py-3">
          Login
        </button>
        
      </form>
    </div>
  );
}
