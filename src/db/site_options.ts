import prisma from "./prisma";

type Options = {
  title: string | null
}

/**
 * Get all site options from db table "Options"
 */
export async function getSiteOptions() {
  const options = await prisma?.options.findMany();
  const values = <Options>{};

  options?.forEach((option: { title: string, value: string | null }) => {
    const key = option.title as keyof Options;
    values[key] = option.value;
  })

  return values;
}

/**
 * Get single site option from db table "Options"
 */
export async function getSiteOption(optionName: string) {
  const value = await prisma?.options.findUnique({
    where: {
      title: optionName
    }
  });

  return value ?? false;
}