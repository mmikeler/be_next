"use server"

import prisma from "../db/prisma"

export async function get_custom_fonts() {
  const fonts = await prisma?.font.findMany();

  return fonts;
}