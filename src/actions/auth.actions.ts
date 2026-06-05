"use server";

import { randomBytes } from "crypto";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

const ADMIN_COOKIE = "lgz_admin_session";
const CUSTOMER_COOKIE = "lgz_customer_session";

function getSessionExpirationDate() {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);
  return expiresAt;
}

function createSessionToken() {
  return randomBytes(32).toString("hex");
}

export async function loginUnifiedAction(formData: FormData) {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    redirect("/login?error=missing");
  }

  const cookieStore = await cookies();

  const admin = await prisma.adminUser.findUnique({
    where: { email },
  });

  if (admin && admin.active) {
    const adminPasswordMatches = await bcrypt.compare(password, admin.password);

    if (adminPasswordMatches) {
      await prisma.adminSession.deleteMany({
        where: {
          adminUserId: admin.id,
        },
      });

      const token = createSessionToken();
      const expiresAt = getSessionExpirationDate();

      await prisma.adminSession.create({
        data: {
          token,
          adminUserId: admin.id,
          expiresAt,
        },
      });

      cookieStore.delete(CUSTOMER_COOKIE);

      cookieStore.set(ADMIN_COOKIE, token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        expires: expiresAt,
        path: "/",
      });

      redirect("/admin/dashboard");
    }
  }

  const customer = await prisma.customer.findUnique({
    where: { email },
  });

  if (customer && customer.active) {
    const customerPasswordMatches = await bcrypt.compare(password, customer.password);

    if (customerPasswordMatches) {
      await prisma.customerSession.deleteMany({
        where: {
          customerId: customer.id,
        },
      });

      const token = createSessionToken();
      const expiresAt = getSessionExpirationDate();

      await prisma.customerSession.create({
        data: {
          token,
          customerId: customer.id,
          expiresAt,
        },
      });

      cookieStore.delete(ADMIN_COOKIE);

      cookieStore.set(CUSTOMER_COOKIE, token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        expires: expiresAt,
        path: "/",
      });

      redirect("/minha-conta");
    }
  }

  redirect("/login?error=invalid");
}

export async function logoutAdminAction() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;

  if (token) {
    await prisma.adminSession.deleteMany({
      where: { token },
    });
  }

  cookieStore.delete(ADMIN_COOKIE);

  redirect("/login?area=admin");
}

export async function logoutCustomerAction() {
  const cookieStore = await cookies();
  const token = cookieStore.get(CUSTOMER_COOKIE)?.value;

  if (token) {
    await prisma.customerSession.deleteMany({
      where: { token },
    });
  }

  cookieStore.delete(CUSTOMER_COOKIE);

  redirect("/login");
}