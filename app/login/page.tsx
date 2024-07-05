// app/login/page.tsx
'use client';

import { useLogin } from './service'; // 引入 service.ts 中的 useLogin 鉤子

export default function LoginPage() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleLogin,
  } = useLogin();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-text">
      <h1 className="text-2xl mb-4">登入</h1>
      <form onSubmit={handleLogin} className="flex flex-col w-80">
        <label className="mb-2">
          電子郵件:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </label>
        <label className="mb-4">
          密碼:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </label>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button type="submit" className="bg-blue-500 text-white py-2 rounded hover:bg-blue-700">
          登入
        </button>
      </form>
    </div>
  );
}
