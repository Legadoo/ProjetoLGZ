import { prisma } from "@/lib/prisma";

const SITE_CONFIG_ID = "site_config_main";

export async function getSiteConfig() {
  let config = await prisma.siteConfig.findUnique({
    where: {
      id: SITE_CONFIG_ID,
    },
  });

  if (!config) {
    config = await prisma.siteConfig.create({
      data: {
        id: SITE_CONFIG_ID,
        brandName: "Legendaryz",
        primaryColor: "#a855f7",
        secondaryColor: "#6d28d9",
        instagramUrl: "https://instagram.com/legendaryzgg",
        footerText: "Organização de e-sports, comunidade gamer e plataforma digital.",
      },
    });
  }

  return config;
}

export async function getAdminBanners() {
  return prisma.banner.findMany({
    orderBy: [
      {
        section: "asc",
      },
      {
        sortOrder: "asc",
      },
      {
        createdAt: "desc",
      },
    ],
  });
}

export async function getActiveBannersBySection(section: string) {
  return prisma.banner.findMany({
    where: {
      active: true,
      section,
    },
    orderBy: [
      {
        sortOrder: "asc",
      },
      {
        createdAt: "desc",
      },
    ],
  });
}

export async function getMainHomeBanner() {
  const banners = await getActiveBannersBySection("HOME_HERO");

  return banners[0] || null;
}