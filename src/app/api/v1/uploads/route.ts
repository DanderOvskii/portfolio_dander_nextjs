// src/app/api/v1/uploads/route.ts
import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import { requireAdmin } from "@/utils/auth";

export async function POST(request: Request) {
  try {
    await requireAdmin(request);
    // Get filename from headers
    const filename = request.headers.get("X-Filename");
    if (!filename) {
      return NextResponse.json({ message: "No filename provided" }, { status: 400 });
    }

    // Get the raw file data
    const arrayBuffer = await request.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Validate it's an image (basic check)
    const contentType = request.headers.get("Content-Type");
    if (!contentType?.startsWith("image/")) {
      return NextResponse.json({ message: "File must be an image" }, { status: 400 });
    }

    const contentLength = request.headers.get("Content-Length");
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (contentLength && parseInt(contentLength) > maxSize) {
      return NextResponse.json({ message: "File size must be less than 5MB" }, { status: 400 });
    }

    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    const ext = path.extname(filename).toLowerCase();
    if (!allowedExtensions.includes(ext)) {
      return NextResponse.json({
        message: `File type not allowed. Allowed types: ${allowedExtensions.join(', ')}`
      }, { status: 400 });
    }

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadsDir, { recursive: true });

    // Generate unique filename
    const uniqueFilename = `${Date.now()}-${crypto.randomBytes(16).toString("hex")}${ext}`;
    const filePath = path.join(uploadsDir, uniqueFilename);

    await fs.writeFile(filePath, buffer);

    return NextResponse.json({ path: `/uploads/${uniqueFilename}` }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ message: err?.message || "Upload failed" }, { status: 500 });
  }
}