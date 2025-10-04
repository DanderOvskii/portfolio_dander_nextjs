import { CustomRequest } from "@/utils/types";
import { NextResponse } from "next/server";

export async function POST(request: CustomRequest) {
  const baseUrl = new URL(request.url).origin;
  const response = NextResponse.redirect(`${baseUrl}/`);

  response.cookies.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: new Date(0), // Expire the cookie immediately
  });

  return response;
}
