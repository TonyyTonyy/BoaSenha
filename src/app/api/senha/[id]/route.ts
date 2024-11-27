import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params: params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Verifica se o ID da senha foi fornecido
    if (!id) {
      return NextResponse.json(
        { error: "ID da senha é obrigatório" },
        { status: 400 }
      );
    }

    // Deleta a senha
    await prisma.senha.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(
      { message: "Senha deletada com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao deletar senha" },
      { status: 500 }
    );
  }
}
