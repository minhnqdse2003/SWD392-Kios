/* This code snippet is setting up a middleware function in a Next.js application using Next.js API
routes. Here's a breakdown of what each part is doing: */
import { NextResponse } from "next/server";

const systemRoute = ["/home", "/about", "/mails", "/contacts", "/"];
const assetExtensions = ["js", "css", "png", "jpg", "jpeg", "svg", "ico"];

export const middleware = async (request) => {
  const currentUser = request.cookies.get("next-auth.session-token")?.value;
  const path = request.nextUrl.pathname;

  if (currentUser && path.startsWith("/login")) {
    return Response.redirect(new URL("/", request.url));
  }

  if (!currentUser && systemRoute.includes(path)) {
    return Response.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
