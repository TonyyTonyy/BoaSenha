// Em src/app/api/auth/logout/route.ts

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    // Remove o cookie 'userId'
    cookies().set('userId', '', {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      maxAge: -1, // Definir para -1 para expirar imediatamente
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Erro ao realizar logout' }, { status: 500 });
  }
}
