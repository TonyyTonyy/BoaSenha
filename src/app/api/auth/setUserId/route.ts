import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log(data);
    const userId = data.usuario.id;

    // Define o cookie com o userId
    cookies().set('userId', userId.toString(), {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // Expira em 7 dias
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Erro ao definir o cookie' }, { status: 500 });
  }
}
