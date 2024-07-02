import axios from 'axios';

interface LoginResponse {
  success: boolean;
  message?: string;
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  try {
    const res = await axios.post('/api/login', { email, password });
    return res.data;
  } catch (err) {
    if (err.response) {
      throw new Error(err.response.data.message || '登入失敗');
    } else {
      throw new Error('登入失敗');
    }
  }
}
