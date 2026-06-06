"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdminUser } from "@/lib/session";

const SITE_CONFIG_ID = "site_config_main";

function normalizeInt(value: FormDataEntryValue | null) {
  const numberValue = Number(String(value || "0"));

  if (Number.isNaN(numberValue)) {
    return 0;
  }

  return Math.floor(numberValue);
}

export async function createBannerAction(formData: FormData) {
  await requireAdminUser();

  const title = String(formData.get("title") || "").trim();
  const subtitle = String(formData.get("subtitle") || "").trim();
  const imageUrl = String(formData.get("imageUrl") || "").trim();
  const buttonText = String(formData.get("buttonText") || "").trim();
  const buttonUrl = String(formData.get("buttonUrl") || "").trim();
  const section = String(formData.get("section") || "HOME_HERO").trim().toUpperCase();
  const sortOrder = normalizeInt(formData.get("sortOrder"));

  if (!title) {
    return;
  }

  await prisma.banner.create({
    data: {
      title,
      subtitle: subtitle || null,
      imageUrl: imageUrl || null,
      buttonText: buttonText || null,
      buttonUrl: buttonUrl || null,
      section: section || "HOME_HERO",
      sortOrder,
      active: true,
    },
  });

  revalidatePath("/admin/banners");
  revalidatePath("/");
  revalidatePath("/loja");
  revalidatePath("/lgznetwork");
  revalidatePath("/calendario");
  revalidatePath("/times");
  revalidatePath("/influenciadores");
  revalidatePath("/staff");
  revalidatePath("/sobre");
}

export async function toggleBannerStatusAction(formData: FormData) {
  await requireAdminUser();

  const id = String(formData.get("id") || "");
  const active = String(formData.get("active") || "") === "true";

  if (!id) {
    return;
  }

  await prisma.banner.update({
    where: {
      id,
    },
    data: {
      active: !active,
    },
  });

  revalidatePath("/admin/banners");
  revalidatePath("/");
}

export async function updateSiteConfigAction(formData: FormData) {
  await requireAdminUser();

  const brandName = String(formData.get("brandName") || "Legendaryz").trim();
  const logoUrl = String(formData.get("logoUrl") || "").trim();
  const faviconUrl = String(formData.get("faviconUrl") || "").trim();
  const primaryColor = String(formData.get("primaryColor") || "#a855f7").trim();
  const secondaryColor = String(formData.get("secondaryColor") || "#6d28d9").trim();
  const instagramUrl = String(formData.get("instagramUrl") || "").trim();
  const tiktokUrl = String(formData.get("tiktokUrl") || "").trim();
  const youtubeUrl = String(formData.get("youtubeUrl") || "").trim();
  const discordUrl = String(formData.get("discordUrl") || "").trim();
  const footerText = String(formData.get("footerText") || "").trim();

  await prisma.siteConfig.upsert({
    where: {
      id: "site_config_main",
    },
    update: {
      brandName,
      logoUrl: logoUrl || null,
      faviconUrl: faviconUrl || null,
      primaryColor,
      secondaryColor,
      instagramUrl: instagramUrl || null,
      tiktokUrl: tiktokUrl || null,
      youtubeUrl: youtubeUrl || null,
      discordUrl: discordUrl || null,
      footerText: footerText || null,
    },
    create: {
      id: "site_config_main",
      brandName,
      logoUrl: logoUrl || null,
      faviconUrl: faviconUrl || null,
      primaryColor,
      secondaryColor,
      instagramUrl: instagramUrl || null,
      tiktokUrl: tiktokUrl || null,
      youtubeUrl: youtubeUrl || null,
      discordUrl: discordUrl || null,
      footerText: footerText || null,
    },
  });

  revalidatePath("/admin/configuracoes");
  revalidatePath("/");
  revalidatePath("/loja");
  revalidatePath("/lgznetwork");
  revalidatePath("/calendario");
  revalidatePath("/times");
  revalidatePath("/influenciadores");
  revalidatePath("/staff");
  revalidatePath("/sobre");
}