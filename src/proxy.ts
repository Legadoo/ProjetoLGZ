import { NextResponse, type NextRequest } from "next/server";

const ADMIN_COOKIE = "lgz_admin_session";
const CUSTOMER_COOKIE = "lgz_customer_session";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminRoute = pathname.startsWith("/admin");
  const isCustomerRoute = pathname.startsWith("/minha-conta");
  const isCartRoute = pathname.startsWith("/carrinho");
  const isCheckoutRoute = pathname.startsWith("/checkout");

  if (isAdminRoute) {
    const adminSession = request.cookies.get(ADMIN_COOKIE)?.value;

    if (!adminSession) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("area", "admin");
      return NextResponse.redirect(loginUrl);
    }
  }

  if (isCustomerRoute || isCartRoute || isCheckoutRoute) {
    const customerSession = request.cookies.get(CUSTOMER_COOKIE)?.value;

    if (!customerSession) {
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/minha-conta/:path*",
    "/carrinho/:path*",
    "/carrinho",
    "/checkout/:path*",
    "/checkout"
  ],
};