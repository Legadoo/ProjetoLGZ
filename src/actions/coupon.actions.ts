"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdminUser } from "@/lib/session";

function normalizeCurrency(value: FormDataEntryValue | null) {
  const rawValue = String(value || "0")
    .replace("R$", "")
    .replace(/\./g, "")
    .replace(",", ".")
    .trim();

  const numberValue = Number(rawValue);

  if (Number.isNaN(numberValue) || numberValue < 0) {
    return 0;
  }

  return numberValue;
}

function normalizeIntOrNull(value: FormDataEntryValue | null) {
  const rawValue = String(value || "").trim();

  if (!rawValue) {
    return null;
  }

  const numberValue = Number(rawValue);

  if (Number.isNaN(numberValue) || numberValue < 0) {
    return null;
  }

  return Math.floor(numberValue);
}

function normalizeDateOrNull(value: FormDataEntryValue | null) {
  const rawValue = String(value || "").trim();

  if (!rawValue) {
    return null;
  }

  const date = new Date(rawValue);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}

export async function createCouponAction(formData: FormData) {
  await requireAdminUser();

  const code = String(formData.get("code") || "").trim().toUpperCase();
  const description = String(formData.get("description") || "").trim();
  const discountType = String(formData.get("discountType") || "PERCENTAGE") === "FIXED"
    ? "FIXED"
    : "PERCENTAGE";
  const discountValue = normalizeCurrency(formData.get("discountValue"));
  const maxUses = normalizeIntOrNull(formData.get("maxUses"));
  const startsAt = normalizeDateOrNull(formData.get("startsAt"));
  const expiresAt = normalizeDateOrNull(formData.get("expiresAt"));

  if (!code || discountValue <= 0) {
    return;
  }

  await prisma.coupon.upsert({
    where: {
      code,
    },
    update: {
      description: description || null,
      discountType,
      discountValue,
      maxUses,
      startsAt,
      expiresAt,
      active: true,
    },
    create: {
      code,
      description: description || null,
      discountType,
      discountValue,
      maxUses,
      startsAt,
      expiresAt,
      active: true,
    },
  });

  revalidatePath("/admin/cupons");
  revalidatePath("/minha-conta/cupons");
}

export async function toggleCouponStatusAction(formData: FormData) {
  await requireAdminUser();

  const id = String(formData.get("id") || "");
  const currentActive = String(formData.get("active") || "") === "true";

  if (!id) {
    return;
  }

  await prisma.coupon.update({
    where: {
      id,
    },
    data: {
      active: !currentActive,
    },
  });

  revalidatePath("/admin/cupons");
  revalidatePath("/minha-conta/cupons");
}