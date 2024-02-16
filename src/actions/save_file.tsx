"use server"
// Import necessary modules
import path from "path";
import { writeFile } from "fs/promises";
import { writeFileSync } from "fs";

// Define the POST handler for the file upload
export const save_file = async (formData: FormData, dir: string) => {
  // Get the file from the form data
  const file = formData.get("file") as File;

  // Check if a file is received
  if (!file) {
    // If no file is received, return
    return false;
  }

  // Convert the file data to a Buffer
  const buffer = Buffer.from(await file.arrayBuffer());

  // Replace spaces in the file name with underscores
  const filename = file.name.replaceAll(" ", "_");

  try {
    // Write the file to the specified directory (public/assets) with the modified filename
    await writeFile(
      path.join(process.cwd(), "public" + dir + '/' + filename),
      buffer,
    )
    return filename;
  } catch (error) {
    // Return
    return false;
  }
};