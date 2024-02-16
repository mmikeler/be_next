"use server"

import { getServerSession } from "next-auth";
import { save_file } from "./save_file";
import prisma from "../db/prisma";

export async function createFont(formData: FormData) {
  // Сохраняем файл
  const filename = await save_file(formData, '/fonts');

  if (!filename) {
    return false;
  };

  // Создаём запись
  const session = await getServerSession();

  if (session?.user?.email) {
    await prisma?.font.create({
      data: {
        authorId: session.user.email,
        tags: formData.get('tags')?.toString() || '',
        url: filename
      }
    })
    return true;
  }
  else {
    return false;
  }
}