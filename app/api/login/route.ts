// app/api/login/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  // 這裡您應該添加實際的登入邏輯，例如檢查用戶名和密碼是否正確
  // 這是一個簡單的示例
  if (email === 'test@test.com' && password === 'test') {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false, message: '登入失敗，請檢查您的電子郵件和密碼' }, { status: 401 });
  }
}
