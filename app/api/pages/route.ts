import { PrismaClient } from "@prisma/client"
import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'

const prisma = new PrismaClient()

export async function PATCH(request: NextRequest) {
  const { id, options } = await request.json()

  const result = await prisma.page.update({
    where: {
      id: id,
    },
    data: options
  });

  return NextResponse.json({ result })
}