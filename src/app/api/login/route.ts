import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { compare } from "bcrypt";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  const ip = request.headers.get("x-forwarded-for") || request.ip || "";

  try {
    const usuarioEncontrado = await prisma.usuario.findUnique({
      where: { email },
    });
    if (!usuarioEncontrado) {
      return NextResponse.json(
        { error: "Email não encontrado" },
        { status: 404 }
      );
    }
    const isPasswordValid = await compare(
      password,
      usuarioEncontrado.senhaHash
    );

    await prisma.loginHistorico.create({
      data: { usuarioId: usuarioEncontrado.id, ip, sucesso: isPasswordValid },
    });

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Senha incorreta" }, { status: 401 });
    }

    return NextResponse.json(usuarioEncontrado, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao realizar login" },
      { status: 500 }
    );
  }
}
