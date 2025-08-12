import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get("user-session")

  // Si no hay sesión y está intentando acceder al dashboard, redirigir al login
  if (!sessionCookie && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Si hay sesión y está intentando acceder al login, redirigir al dashboard
  if (sessionCookie && request.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/maquinaria/:path*"],
}
