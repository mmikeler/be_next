import { PrismaClient } from "@prisma/client"
import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  const { id } = await request.json()

  const result = await prisma.minisite.findUnique({
    where: {
      id: id
    }
  });

  return NextResponse.json({ result })
}

export async function POST(request: NextRequest) {
  const { id } = await request.json()

  const result = await prisma.minisite.create({
    data: {
      authorId: id
    }
  });

  return NextResponse.json({ result })
}

export async function PATCH(request: NextRequest) {
  const { id, options } = await request.json()

  const result = await prisma.minisite.update({
    where: {
      id: id,
    },
    data: options
  });

  return NextResponse.json({ result })
}