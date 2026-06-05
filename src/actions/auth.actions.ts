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

export async function loginAdminAction(formData: FormData) {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    redirect("/admin/login?error=missing");
  }

  const admin = await prisma.adminUser.findUnique({
    where: { email },
  });

  if (!admin || !admin.active) {
    redirect("/admin/login?error=invalid");
  }

  const passwordMatches = await bcrypt.compare(password, admin.password);

  if (!passwordMatches) {
    redirect("/admin/login?error=invalid");
  }

  await prisma.adminSession.deleteMany({
    where: {
      adminUserId: admin.id,
      expiresAt: {
        lt: new Date(),
      },
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

  const cookieStore = await cookies();

  cookieStore.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    path: "/",
  });

  redirect("/admin/dashboard");
}

export async function loginCustomerAction(formData: FormData) {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    redirect("/login?error=missing");
  }

  const customer = await prisma.customer.findUnique({
    where: { email },
  });

  if (!customer || !customer.active) {
    redirect("/login?error=invalid");
  }

  const passwordMatches = await bcrypt.compare(password, customer.password);

  if (!passwordMatches) {
    redirect("/login?error=invalid");
  }

  await prisma.customerSession.deleteMany({
    where: {
      customerId: customer.id,
      expiresAt: {
        lt: new Date(),
      },
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

  const cookieStore = await cookies();

  cookieStore.set(CUSTOMER_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    path: "/",
  });

  redirect("/minha-conta");
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

  redirect("/admin/login");
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