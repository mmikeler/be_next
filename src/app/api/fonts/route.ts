import prisma from '@/src/db/prisma';
import { readFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, res: any) {
  const { searchParams } = new URL(req.url)
  const id: number = Number(searchParams.get('id'));

  const font: any = await prisma?.font.findUnique({
    where: { id: id }
  })
  try {
    let path: string[] = [process.cwd(), 'public/fonts', font.url];

    const buffer = await readFile(path.join('/'));

    const headers = new Headers();
    headers.append('Content-Disposition', `attachment; filename="${font.url}"`);
    headers.append('Content-Type', 'font/woff2');

    return new Response(buffer, {
      headers,
    });
  } catch (err) {
    return new NextResponse('Не удалось получить файл');
  }
}