import { SignJWT, jwtVerify } from "jose";
import { CustomUser } from "@/utils/types";
import { tokenAlgorithm, tokenExpiry } from "@/utils/constants";
import { Role } from "@prisma/client";


export async function generateToken(user: CustomUser) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
  return new SignJWT({ ...user })
    .setProtectedHeader({ alg: tokenAlgorithm })
    .setExpirationTime(tokenExpiry)
    .sign(secret);
}

export async function verifyToken(token: string) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
  const { payload } = await jwtVerify(token, secret);
  return payload as unknown as CustomUser;
}

export async function requireAdmin(request: Request): Promise<CustomUser> {
  const cookieHeader = request.headers.get('cookie');
  if (!cookieHeader) {
    throw new Error('Unauthorized');
  }

  const tokenMatch = cookieHeader.match(/token=([^;]+)/);
  if (!tokenMatch) {
    throw new Error('Unauthorized');
  }

  const token = tokenMatch[1];
  
  try {
    const decoded = await verifyToken(token);
    
    if (!decoded?.userId || !decoded?.role || decoded.role !== Role.ADMIN) {
      throw new Error('Forbidden');
    }
    
    return decoded;
  } catch {
    throw new Error('Unauthorized');
  }
}