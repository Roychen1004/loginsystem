// redux/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isLoggedIn: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isLoggedIn: !!localStorage.getItem('isLoggedIn'),
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state) {
      state.isLoggedIn = true;
      state.error = null;
      localStorage.setItem('isLoggedIn', 'true');
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.isLoggedIn = false;
      state.error = action.payload;
      localStorage.removeItem('isLoggedIn');
    },
    logout(state) {
      state.isLoggedIn = false;
      state.error = null;
      localStorage.removeItem('isLoggedIn');
    },
  },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;

export default authSlice;
