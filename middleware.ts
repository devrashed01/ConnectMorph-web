import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

async function getAccessToken(access_token: string) {
  try {
    const response = await fetch("http://localhost:5000/api/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + access_token,
      },
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
}

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { pathname } = new URL(request.url);
  const access_token = request.cookies.get("access_token") ?? "";
  let user = undefined as User | undefined;

  if (pathname !== "login") {
    if (access_token) {
      user = await getAccessToken(access_token?.value);
    }
    if (!user?._id || !access_token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}

export const config = {
  matcher: ["/", "/todo"],
};
