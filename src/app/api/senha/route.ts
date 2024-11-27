import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { usuarioId, nome, senhaGerada, urlServico, categoriaId } = await request.json();

    // Validações
    if (!usuarioId || !nome || !senhaGerada || !categoriaId) {
      return NextResponse.json({ error: 'Campos obrigatórios faltando' }, { status: 400 });
    }

    // Verifica se a categoria existe
    const categoria = await prisma.categoria.findUnique({
      where: { id: categoriaId },
    });

    if (!categoria) {
      return NextResponse.json({ error: 'Categoria inválida' }, { status: 400 });
    }

    // Criação da senha
    const senhaCriada = await prisma.senha.create({
      data: {
        usuarioId,
        nome,
        senhaGerada,
        urlServico,
        categoriaId,
      },
    });

    return NextResponse.json(senhaCriada, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao salvar senha' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
    try {
      const { id, nome, senhaGerada, urlServico, categoriaId } = await request.json();
  
      // Verifica se o ID da senha foi fornecido
      if (!id) {
        return NextResponse.json({ error: 'ID da senha é obrigatório' }, { status: 400 });
      }
  
      // Verifica se a categoria existe, se for fornecida
      if (categoriaId) {
        const categoria = await prisma.categoria.findUnique({
          where: { id: categoriaId },
        });
  
        if (!categoria) {
          return NextResponse.json({ error: 'Categoria inválida' }, { status: 400 });
        }
      }
  
      // Atualiza a senha
      const senhaAtualizada = await prisma.senha.update({
        where: { id },
        data: {
          nome,
          senhaGerada,
          urlServico,
          categoriaId,
        },
      });
  
      return NextResponse.json(senhaAtualizada, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Erro ao atualizar senha' }, { status: 500 });
    }
  }
