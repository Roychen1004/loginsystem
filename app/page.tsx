// app/page.tsx

import React from "react";
import Link from "next/link";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-text">
      <h1 className="text-2xl mb-4">歡迎來到我的 Next.js 網站</h1>
      <p className="mb-4">這是一個簡單的首頁範例。</p>
      <Link href="/login">登入</Link>
    </div>
  );
};

export default HomePage;
