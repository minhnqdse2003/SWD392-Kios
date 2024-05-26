import { NextResponse } from "next/server";

const publicRoutes = ["/sign-in", "/sign-up", "/about", "/"];
const assetExtensions = ["js", "css", "png", "jpg", "jpeg", "svg", "ico"];

export const middleware = (request) => {
  const path = request.nextUrl.pathname;
  const isPublicRoutes = publicRoutes.includes(path);

  return NextResponse.next();
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
