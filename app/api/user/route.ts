import { PrismaClient } from "@prisma/client"
import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'
import { getServerSession } from "next-auth";
import { handler } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient()

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