import { NextResponse } from "next/server";
import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import { emailRegex, isValidDate, passwordRegex } from "@/utils/helpers";
import { emailIsTaken, invalidEmail, invalidPassword } from "@/utils/constants";
import { CustomRequest } from "@/utils/types";
import { generateToken } from "@/utils/auth";

const prisma = new PrismaClient();

export async function POST(request: CustomRequest) {
  const { email, password, firstName, lastName, dateOfBirth } =
    await request.json();

  // Check if the email is valid
  if (!emailRegex.test(email)) {
    return NextResponse.json({ message: invalidEmail }, { status: 400 });
  }

  // Check if the password meets the requirements
  if (!passwordRegex.test(password)) {
    return NextResponse.json(
      {
        message: invalidPassword,
      },
      { status: 400 }
    );
  }

  if (!isValidDate(dateOfBirth)) {
    return NextResponse.json(
      { message: "Invalid date of birth" },
      { status: 400 }
    );
  }

  // Check if the email is already taken
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return NextResponse.json(
      {
        message: emailIsTaken,
      },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      dateOfBirth: new Date(dateOfBirth),
      email,
      firstName,
      lastName,
      password: hashedPassword,
      // Todo: to be decided whether it should be provided by the user or use a default image
      profileImage: "",
      role: Role.USER,
    },
  });

  const baseUrl = new URL(request.url).origin;
  const redirectUrl =
    user.role === Role.ADMIN ? `${baseUrl}/admin` : `${baseUrl}/`;

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
