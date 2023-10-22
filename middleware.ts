import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = new URL(request.url);
  const access_token = request.cookies.get("access_token") ?? "";
  if (pathname !== "/login" && !access_token) {
    return NextResponse.redirect(new URL("/login", request.url));
  } else if (pathname === "/login" && access_token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/", "/profile", "/login"],
};
