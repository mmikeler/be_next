import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { YaDisk } from "ya-disk-rest-api";
import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'
import { handler } from "../auth/[...nextauth]/route";


export async function POST(request: NextRequest) {
  const { options } = await request.json()
  const session: any = await getServerSession(handler);

  const result = await new PrismaClient().user.findFirst({
    where: {
      email: session?.user.email || '',
    }
  });

  const disk = new YaDisk(result?.ya_disk || '')

  const res = await disk.getItemMetadata({
    path: options.path
  })

  return NextResponse.json({ res })
}