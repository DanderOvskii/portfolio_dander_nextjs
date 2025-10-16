import { NextResponse } from "next/server";
import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import { invalidCredentials } from "@/utils/constants";
import { CustomRequest } from "@/utils/types";
import { generateToken } from "@/utils/auth";

const prisma = new PrismaClient();

export async function POST(request: CustomRequest) {
  const { email, password } = await request.json();

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return NextResponse.json({ message: invalidCredentials }, { status: 401 });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return NextResponse.json({ message: invalidCredentials }, { status: 401 });
  }

   const redirectUrl = user.role === Role.ADMIN 
    ? '/admin/dashboard'  // Change to direct path
    : '/';

  const response = NextResponse.json({
    redirectUrl,
    user,
  });

  const token = await generateToken({ userId: user.id, role: user.role });

  response.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 3600,
  });

  return response;
}
