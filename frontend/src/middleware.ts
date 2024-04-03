import { usePathname } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/getSessions";




export default async function middleware(req: any) {


  const isAuthRoute = authRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  const isGuestRoute = guestRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

// get session <data user auth>x
  const session = await getSession();


  // check if user authed
    if (!session?.token && (isAuthRoute )) {
      const redirectUrl = new URL("/", req.nextUrl.origin);
      return NextResponse.redirect(redirectUrl);
    }


  if (session?.token) {
    if ( isGuestRoute ) {
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl.origin));
    }
  }

}

const authRoutes = ["/dashboard"];

const guestRoutes = [
  "/forgot-password",
  "/login",
  "/register",
];



 export const config = {
   // Match only internationalized pathnames
   matcher: "/((?!api|static|.*\\..*|_next).*)",
 };
