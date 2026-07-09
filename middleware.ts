import NextAuth from "next-auth"
import createMiddleware from "next-intl/middleware"
import { NextResponse } from "next/server"
import { authConfig } from "@/lib/auth.config"
import { routing } from "./i18n/routing"

const { auth } = NextAuth(authConfig)
const intlMiddleware = createMiddleware(routing)

export default auth((request) => {
  const { pathname } = request.nextUrl

  if (pathname.startsWith("/api")) {
    return NextResponse.next()
  }

  if (pathname.startsWith("/admin")) {
    if (!pathname.startsWith("/admin/login") && !request.auth) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
    return NextResponse.next()
  }

  return intlMiddleware(request)
})

export const config = {
  matcher: ["/((?!_next|_vercel|.*\\..*).*)"],
}
