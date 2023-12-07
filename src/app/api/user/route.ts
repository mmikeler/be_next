import { User } from "@prisma/client"
import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'
import { auth } from "../auth/[...nextauth]/auth";
import prisma from "@/src/db/prisma";

export async function GET(request: NextRequest) {
  const data: any = await auth();

  if (!prisma) return;

  const result: User | null = await prisma.user.findUnique({
    where: {
      email: data.user.email,
    },
    include: {
      sites: true,
      forms: true,
      payments: true
    }
  });

  return NextResponse.json({ result })

}

export async function PATCH(request: NextRequest) {
  const { options } = await request.json()
  const data: any = await auth();

  if (!prisma) return;

  const result = await prisma.user.update({
    where: {
      email: data.user.email,
    },
    data: options
  });

  return NextResponse.json({ result })

}

// Кастомное обновление юзера независимо от сессии
export async function POST(request: NextRequest) {
  const { id, options } = await request.json()

  if (!prisma) return;

  const result = await prisma.user.update({
    where: {
      id: id,
    },
    data: options
  });

  return NextResponse.json({ result })

}