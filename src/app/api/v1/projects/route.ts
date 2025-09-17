// src/app/api/v1/projects/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { requireAdmin } from "@/utils/auth";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    await requireAdmin(request);

    const body = await request.json();
    const { name, description, projectDate, languages, website = null, image = null } = body || {};

    if (!name || !description || !projectDate || !languages) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const created = await prisma.project.create({
      data: {
        name,
        description,
        projectDate: new Date(projectDate),
        languages,
        website,
        image, // already a path like "/uploads/xxx.png"
      },
    });

    return NextResponse.json(created, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ message: err?.message || "Failed to create project" }, { status: 500 });
  }
}

export async function GET() {
  const projects = await prisma.project.findMany({
    select: {
      id: true,
      name: true,
      image: true,
    }
  });
  return NextResponse.json(projects, { status: 200 });
}
