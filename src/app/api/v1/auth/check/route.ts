import { NextResponse } from "next/server";
import { CustomRequest } from "@/utils/types";
import { unauthorized } from "@/utils/constants";
import { verifyToken } from "@/utils/auth";


export async function GET(request: CustomRequest) {
  const token = request.cookies.get("token");

  if (!token) {
    return NextResponse.json({ message: unauthorized }, { status: 401 });
  }

  try {
    const decoded = await verifyToken(token.value);
    return NextResponse.json({ userId: decoded.userId, role: decoded.role });
  } catch {
    return NextResponse.json({ message: unauthorized }, { status: 401 });
  }
}
