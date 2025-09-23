import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { requireAdmin } from "@/utils/auth";

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

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    await requireAdmin(request);
    const id = Number(params.id);
    if (!id) {
      return NextResponse.json({ message: "missing id" }, { status: 400 });
    }

    const body = await request.json();
    const {
      name,
      description,
      projectDate,
      languages,
      website = undefined,
      image = undefined,
    } = body || {};

    const data: any = {};
    if (name !== undefined) data.name = name;
    if (description !== undefined) data.description = description;
    if (projectDate !== undefined) data.projectDate = projectDate ? new Date(projectDate) : null;
    if (languages !== undefined) data.languages = languages;
    if (website !== undefined) data.website = website;
    if (image !== undefined) data.image = image;


    const updated = await prisma.project.update({
      where: { id },
      data,
    });


    return NextResponse.json(updated, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ message: err?.message || "Failed to edit project" }, { status: 500 });
 }


}

export async function DELETE(request:Request,{ params }: { params: { id: string } }){
  try{
    await requireAdmin(request);
    const id = Number(params.id);
    if (!id) {
      return NextResponse.json({ message: "missing id" }, { status: 400 });
    }
    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ deleted: true }, { status: 200 });
  }
  catch (err: any) {
    const message = err?.message || "Failed to delete project";
    const status = message.includes("Record to delete does not exist") ? 404 : 500;
    return NextResponse.json({ message }, { status });
  }
}