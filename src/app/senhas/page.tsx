import React from 'react'
import { BoaSenhaMainScreen } from './_components/senhasMain'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

const SenhasMainPage = async () => {
  const userId = cookies().get('userId')?.value
  if (!userId) {
    return redirect('/login');
  }
  const usuario = await prisma.usuario.findFirst({where: {id: Number(userId)}})
  const senhas = await prisma.senha.findMany({where: {usuarioId: Number(userId)}})
  const categorias = await prisma.categoria.findMany({orderBy: {id: 'asc'}})
  return (
    <BoaSenhaMainScreen usuario={usuario} senhas={senhas} categorias={categorias}/>
  )
}

export default SenhasMainPage