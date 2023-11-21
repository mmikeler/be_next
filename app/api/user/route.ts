import { PrismaClient, User } from "@prisma/client"
import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'
import { getServerSession } from "next-auth";
import { handler } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  const data: any = await getServerSession(handler);

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
  const data: any = await getServerSession(handler);

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

  const result = await prisma.user.update({
    where: {
      id: id,
    },
    data: options
  });

  return NextResponse.json({ result })

}