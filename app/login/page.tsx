// app/login/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { loginSuccess, loginFailure } from '../../redux/authSlice';

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/dashboard');
    }
  }, [isLoggedIn, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('/api/login', { email, password });

      if (res.data.success) {
        dispatch(loginSuccess());
        router.push('/dashboard');
      } else {
        dispatch(loginFailure(res.data.message || '登入失敗，請檢查您的電子郵件和密碼'));
      }
    } catch (err) {
      if (err.response) {
        dispatch(loginFailure(err.response.data.message || '登入失敗'));
      } else {
        dispatch(loginFailure(err.message));
      }
    }
  };

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
