import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  _request: Request,
  { params }: { params: { id: String } }
) {
  try {
    const id = Number(params.id)
    if (!id) {
      return NextResponse.json({ message: "Missing id" }, { status: 400 });
    }

    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }
    return NextResponse.json(project, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { message: err?.message || "Failed to fetch project" },
      { status: 500 }
    );
  }
}