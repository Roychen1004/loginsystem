// redux/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isLoggedIn: boolean;
  error: string | null;
}

// 檢查是否在瀏覽器環境中，避免伺服器端錯誤
const initialIsLoggedIn = typeof window !== 'undefined' && !!localStorage.getItem('isLoggedIn');

const initialState: AuthState = {
  isLoggedIn: initialIsLoggedIn || false, // 使用初始值或 false
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // 存函數 更新store狀態
    loginSuccess(state) {
      state.isLoggedIn = true;
      state.error = null;
      if (typeof window !== 'undefined') {
        localStorage.setItem('isLoggedIn', 'true');
      }
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.isLoggedIn = false;
      state.error = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('isLoggedIn');
      }
    },
  },
});

export const { loginSuccess, loginFailure } = authSlice.actions;

export default authSlice;
