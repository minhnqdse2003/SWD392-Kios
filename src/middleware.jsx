/* This code snippet is setting up a middleware function in a Next.js application using Next.js API
routes. Here's a breakdown of what each part is doing: */
import { NextResponse } from "next/server";

const systemRoute = [
  "/home",
  "/about",
  "/mails",
  "/contacts",
  "/",
  "/product",
  "/user",
  "/order",
];
const assetExtensions = ["js", "css", "png", "jpg", "jpeg", "svg", "ico"];

export const middleware = async (req) => {
  const { pathname: path } = req.nextUrl;
  const currentUser = req.cookies.get(
    process.env.NODE_ENV === "development"
      ? "next-auth.session-token"
      : "__Secure-next-auth.session-token"
  );

  if (currentUser && path.startsWith("/login")) {
    return Response.redirect(new URL("/", req.url));
  }

  if (!currentUser && systemRoute.includes(getUrlSegments(path))) {
    return Response.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
};

function getUrlSegments(pathname) {
  // Remove leading and trailing slashes
  const trimmedPath = pathname.replace(/^\/|\/$/g, "");

  // Split the path into segments
  const segments = trimmedPath.split("/");
  return `/${segments[0]}`;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
