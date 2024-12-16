import { type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // List of public routes that don't require authentication
  const publicRoutes = ["/login", "/waitlist"];

  // Check if the current path starts with any of the public routes
  const isPublicRoute = publicRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  // Skip authentication for public routes
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // For all other routes, use session handling
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
