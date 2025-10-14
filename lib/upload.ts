import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { randomBytes } from 'crypto';

export async function saveFile(file: File, folder: string = 'uploads'): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  
  // Generate unique filename
  const ext = file.name.split('.').pop();
  const filename = `${randomBytes(16).toString('hex')}.${ext}`;
  
  // Ensure directory exists
  const uploadDir = join(process.cwd(), 'public', folder);
  await mkdir(uploadDir, { recursive: true });
  
  // Save file
  const path = join(uploadDir, filename);
  await writeFile(path, buffer);
  
  return `/${folder}/${filename}`;
}

export async function saveMultipleFiles(files: File[], folder: string = 'uploads'): Promise<string[]> {
  const paths = await Promise.all(files.map(file => saveFile(file, folder)));
  return paths;
}

