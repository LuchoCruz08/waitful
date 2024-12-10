import { type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  // Skip authentication for waitlist routes
  if (request.nextUrl.pathname.startsWith('/waitlist/')) {
    return;
  }
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - waitlist (public waitlist forms)
     */
    "/((?!_next/static|_next/image|favicon.ico|waitlist/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
