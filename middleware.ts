import { NextRequest, NextResponse } from "next/server";
import cookie from "cookie";
import { JWTPayload } from "jose";
import {
  verifyToken,
  verifyRefreshToken,
  createToken,
  createRefreshToken,
} from "@/utils/jwt";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const publicPaths = [
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
  ];
  const protectedPaths = ["/dashboard"];

  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  if (accessToken) {
    try {
      const decodedToken = (await verifyToken(
        accessToken
      )) as JWTPayload | null;
      if (decodedToken && decodedToken.userId) {
        if (publicPaths.includes(pathname)) {
          return NextResponse.redirect(new URL("/dashboard", req.url));
        }
        return NextResponse.next();
      }
    } catch (err) {
      console.error("Token verification failed:", err);
    }
  }

  if (refreshToken) {
    try {
      const decodedRefreshToken = (await verifyRefreshToken(
        refreshToken
      )) as JWTPayload | null;
      if (decodedRefreshToken && decodedRefreshToken.userId) {
        const newAccessToken = await createToken(
          { userId: decodedRefreshToken.userId },
          "1h"
        );
        const newRefreshToken = await createRefreshToken(
          { userId: decodedRefreshToken.userId },
          "7d"
        );

        const response = NextResponse.next();
        response.headers.set(
          "Set-Cookie",
          [
            cookie.serialize("accessToken", newAccessToken, {
              httpOnly: true,
              secure: process.env.NODE_ENV !== "development",
              maxAge: 3600,
              path: "/",
            }),
            cookie.serialize("refreshToken", newRefreshToken, {
              httpOnly: true,
              secure: process.env.NODE_ENV !== "development",
              maxAge: 604800,
              path: "/",
            }),
          ].join("; ")
        );

        if (publicPaths.includes(pathname)) {
          return NextResponse.redirect(new URL("/dashboard", req.url));
        }

        return response;
      }
    } catch (refreshErr) {
      console.error("Refresh token verification failed:", refreshErr);
    }
  }

  if (protectedPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
