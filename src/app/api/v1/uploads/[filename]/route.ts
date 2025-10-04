import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET(
  _request: Request,
  { params }: { params: { filename: string } }
) {
  try {
    const filename = params.filename;

     const base = path.basename(filename);
    if (base !== filename){
      return NextResponse.json({message:"invalid filename"},{status:400});
    }

    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    if (!allowedExtensions.includes(path.extname(base.toLowerCase()))){
      return NextResponse.json({message:"invalid file type"},{status:400});

    }

    const uploadsDir = path.join(process.cwd(), "uploads");
    const filePath = path.join(uploadsDir, filename);

    // Read file
    const file = await fs.readFile(filePath);
    
      const ext = path.extname(filename).toLowerCase();
    const mimeTypes: { [key: string]: string } = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.gif': 'image/gif',
      '.webp': 'image/webp'
    };
    
    return new NextResponse(new Uint8Array(file), {
      headers: {
        "Content-Type": mimeTypes[ext] || 'image/jpeg',
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}