import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

const ADMIN_COOKIE = "lgz_admin_session";
const CUSTOMER_COOKIE = "lgz_customer_session";

export async function getCurrentAdminUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;

  if (!token) {
    return null;
  }

  const session = await prisma.adminSession.findUnique({
    where: { token },
    include: {
      adminUser: true,
    },
  });

  if (!session || session.expiresAt < new Date() || !session.adminUser.active) {
    return null;
  }

  return session.adminUser;
}

export async function getCurrentCustomer() {
  const cookieStore = await cookies();
  const token = cookieStore.get(CUSTOMER_COOKIE)?.value;

  if (!token) {
    return null;
  }

  const session = await prisma.customerSession.findUnique({
    where: { token },
    include: {
      customer: true,
    },
  });

  if (!session || session.expiresAt < new Date() || !session.customer.active) {
    return null;
  }

  return session.customer;
}

export async function requireAdminUser() {
  const admin = await getCurrentAdminUser();

  if (!admin) {
    redirect("/admin/login");
  }

  return admin;
}

export async function requireCustomer() {
  const customer = await getCurrentCustomer();

  if (!customer) {
    redirect("/login");
  }

  return customer;
}