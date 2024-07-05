import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { loginSuccess, loginFailure } from '../../redux/authSlice';
import axios from 'axios';

interface LoginResponse {
  success: boolean;
  message?: string;
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  try {
    const res = await axios.post('/api/login', { email, password });
    return res.data;
  } catch (err: any) {
    if (err.response) {
      throw new Error(err.response.data.message || '登入失敗');
    } else {
      throw new Error('登入失敗');
    }
  }
}

export const useLogin = () => {
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
      const res = await login(email, password);

      if (res.success) {
        dispatch(loginSuccess());
        router.push('/dashboard');
      } else {
        dispatch(loginFailure(res.message || '登入失敗，請檢查您的電子郵件和密碼'));
        setError(res.message || '登入失敗，請檢查您的電子郵件和密碼');
      }
    } catch (err: any) {
      dispatch(loginFailure(err.message || '登入失敗'));
      setError(err.message || '登入失敗');
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleLogin,
  };
};
