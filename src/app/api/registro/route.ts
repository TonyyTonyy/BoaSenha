import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { hash } from 'bcrypt';

export async function POST(request: NextRequest) {
  try {
    console.log("Recebendo dados do usuário...");
    const { username, email, password } = await request.json();

    // Verificar se já existe um usuário com o mesmo email
    const usuarioExistente = await prisma.usuario.findUnique({
      where: {
        email,
      },
    });

    if (usuarioExistente) {
      return NextResponse.json({ error: 'Email já cadastrado' }, { status: 400 });
    }

    const senhaHash = await hash(password, 10);
    console.log("Senha criptografada:", senhaHash);

    // Criar o usuário no banco de dados
    const usuario = await prisma.usuario.create({
      data: {
        nome: username,
        email,
        senhaHash: senhaHash, 
      },
    });

    console.log("Usuário registrado com sucesso:", usuario);
    return NextResponse.json(usuario, { status: 201 });
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    return NextResponse.json({ error: 'Erro ao registrar usuário' }, { status: 500 });
  }
}
