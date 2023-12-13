import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
   if (request.nextUrl.pathname.startsWith("/_next")) {
      return NextResponse.next();
   }

   if (request.nextUrl.pathname.startsWith("/api")) {
      return NextResponse.next();
   }

   if (request.nextUrl.pathname.startsWith("/_next/static")) {
      return NextResponse.next();
   }

   if (request.nextUrl.pathname.startsWith("/_next/image")) {
      return NextResponse.next();
   }

   let token = request.cookies.get("access_token");

   if (!token && request.nextUrl.pathname !== "/sign-in") {
      return NextResponse.redirect(new URL("/sign-in", request.url));
   }

   return NextResponse.next();
}
export const config = {
   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)", "/:path*"],
};
