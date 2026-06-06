import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.siteConfig.upsert({
    where: {
      id: "site_config_main",
    },
    update: {
      brandName: "Legendaryz",
      primaryColor: "#a855f7",
      secondaryColor: "#6d28d9",
      instagramUrl: "https://instagram.com/legendaryzgg",
      footerText: "Organização de e-sports, comunidade gamer e plataforma digital. Seja lendário, faça parte da família LGZ.",
    },
    create: {
      id: "site_config_main",
      brandName: "Legendaryz",
      primaryColor: "#a855f7",
      secondaryColor: "#6d28d9",
      instagramUrl: "https://instagram.com/legendaryzgg",
      footerText: "Organização de e-sports, comunidade gamer e plataforma digital. Seja lendário, faça parte da família LGZ.",
    },
  });

  await prisma.banner.upsert({
    where: {
      id: "banner_home_hero_main",
    },
    update: {
      title: "Welcome to Legendaryz",
      subtitle: "A plataforma oficial da Legendaryz unindo e-sports, comunidade, influenciadores, loja, LGZNetwork e calendário de jogos.",
      buttonText: "Conheça a LGZ",
      buttonUrl: "/sobre",
      section: "HOME_HERO",
      sortOrder: 0,
      active: true,
    },
    create: {
      id: "banner_home_hero_main",
      title: "Welcome to Legendaryz",
      subtitle: "A plataforma oficial da Legendaryz unindo e-sports, comunidade, influenciadores, loja, LGZNetwork e calendário de jogos.",
      buttonText: "Conheça a LGZ",
      buttonUrl: "/sobre",
      section: "HOME_HERO",
      sortOrder: 0,
      active: true,
    },
  });

  console.log("Seed de banners e configurações concluído.");
}

main()
  .catch((error) => {
    console.error("Erro no seed-site:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });