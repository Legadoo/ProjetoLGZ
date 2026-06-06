import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const bloodStrike = await prisma.team.upsert({
    where: {
      id: "team_lgz_bloodstrike",
    },
    update: {
      name: "Legendaryz Blood Strike",
      game: "Blood Strike",
      description: "Time competitivo e base de campeonatos amadores da Legendaryz.",
      active: true,
    },
    create: {
      id: "team_lgz_bloodstrike",
      name: "Legendaryz Blood Strike",
      game: "Blood Strike",
      description: "Time competitivo e base de campeonatos amadores da Legendaryz.",
      active: true,
    },
  });

  const minecraft = await prisma.team.upsert({
    where: {
      id: "team_lgz_minecraft",
    },
    update: {
      name: "LGZNetwork",
      game: "Minecraft",
      description: "Comunidade e servidor Minecraft da Legendaryz.",
      active: true,
    },
    create: {
      id: "team_lgz_minecraft",
      name: "LGZNetwork",
      game: "Minecraft",
      description: "Comunidade e servidor Minecraft da Legendaryz.",
      active: true,
    },
  });

  await prisma.player.upsert({
    where: {
      id: "player_chapolin",
    },
    update: {
      nickname: "Chapolin",
      realName: "Gustavo",
      role: "Fundador / Gestão",
      bio: "Representa a persistência e a construção da Legendaryz desde sua origem.",
      teamId: bloodStrike.id,
      active: true,
    },
    create: {
      id: "player_chapolin",
      nickname: "Chapolin",
      realName: "Gustavo",
      role: "Fundador / Gestão",
      bio: "Representa a persistência e a construção da Legendaryz desde sua origem.",
      teamId: bloodStrike.id,
      active: true,
    },
  });

  await prisma.player.upsert({
    where: {
      id: "player_legado",
    },
    update: {
      nickname: "Legado",
      realName: "Lucas",
      role: "Cofundador / Produto",
      bio: "Atua na visão digital, estruturação de produto e fortalecimento da plataforma LGZ.",
      teamId: bloodStrike.id,
      active: true,
    },
    create: {
      id: "player_legado",
      nickname: "Legado",
      realName: "Lucas",
      role: "Cofundador / Produto",
      bio: "Atua na visão digital, estruturação de produto e fortalecimento da plataforma LGZ.",
      teamId: bloodStrike.id,
      active: true,
    },
  });

  await prisma.player.upsert({
    where: {
      id: "player_network",
    },
    update: {
      nickname: "LGZNetwork",
      realName: null,
      role: "Servidor Minecraft",
      bio: "Base comunitária do servidor Minecraft da Legendaryz.",
      teamId: minecraft.id,
      active: true,
    },
    create: {
      id: "player_network",
      nickname: "LGZNetwork",
      realName: null,
      role: "Servidor Minecraft",
      bio: "Base comunitária do servidor Minecraft da Legendaryz.",
      teamId: minecraft.id,
      active: true,
    },
  });

  await prisma.influencer.upsert({
    where: {
      slug: "chapolin",
    },
    update: {
      name: "Gustavo",
      nickname: "Chapolin",
      shortBio: "Criador de conteúdo, liderança e visão estratégica da LGZ.",
      fullBio: "Chapolin representa a persistência da Legendaryz. É uma figura ligada à construção da organização, comunidade, bastidores e crescimento da marca.",
      legendaryzStory: "Dentro da Legendaryz, Chapolin carrega a missão de manter a organização viva, conectando comunidade, jogadores, influenciadores e projetos digitais.",
      contentCategory: "E-sports, comunidade e lifestyle gamer",
      highlightPhrase: "Desde 2017 mantendo a chama lendária acesa.",
      instagramUrl: "https://instagram.com/legendaryzgg",
      active: true,
      featured: true,
      showOnHome: true,
      showOnInfluencersPage: true,
      sortOrder: 1,
    },
    create: {
      name: "Gustavo",
      nickname: "Chapolin",
      slug: "chapolin",
      shortBio: "Criador de conteúdo, liderança e visão estratégica da LGZ.",
      fullBio: "Chapolin representa a persistência da Legendaryz. É uma figura ligada à construção da organização, comunidade, bastidores e crescimento da marca.",
      legendaryzStory: "Dentro da Legendaryz, Chapolin carrega a missão de manter a organização viva, conectando comunidade, jogadores, influenciadores e projetos digitais.",
      contentCategory: "E-sports, comunidade e lifestyle gamer",
      highlightPhrase: "Desde 2017 mantendo a chama lendária acesa.",
      instagramUrl: "https://instagram.com/legendaryzgg",
      active: true,
      featured: true,
      showOnHome: true,
      showOnInfluencersPage: true,
      sortOrder: 1,
    },
  });

  await prisma.influencer.upsert({
    where: {
      slug: "legado",
    },
    update: {
      name: "Lucas",
      nickname: "Legado",
      shortBio: "Cofundador, visão de produto e construção digital da LGZ.",
      fullBio: "Legado atua na parte estratégica e digital, ajudando a transformar a Legendaryz em uma plataforma forte, organizada e preparada para crescer.",
      legendaryzStory: "Sua história na Legendaryz está ligada à evolução da marca, criação de projetos e fortalecimento da presença digital.",
      contentCategory: "Produto, comunidade e tecnologia",
      highlightPhrase: "Construindo o legado da LGZ no digital.",
      instagramUrl: "https://instagram.com/legendaryzgg",
      active: true,
      featured: true,
      showOnHome: true,
      showOnInfluencersPage: true,
      sortOrder: 2,
    },
    create: {
      name: "Lucas",
      nickname: "Legado",
      slug: "legado",
      shortBio: "Cofundador, visão de produto e construção digital da LGZ.",
      fullBio: "Legado atua na parte estratégica e digital, ajudando a transformar a Legendaryz em uma plataforma forte, organizada e preparada para crescer.",
      legendaryzStory: "Sua história na Legendaryz está ligada à evolução da marca, criação de projetos e fortalecimento da presença digital.",
      contentCategory: "Produto, comunidade e tecnologia",
      highlightPhrase: "Construindo o legado da LGZ no digital.",
      instagramUrl: "https://instagram.com/legendaryzgg",
      active: true,
      featured: true,
      showOnHome: true,
      showOnInfluencersPage: true,
      sortOrder: 2,
    },
  });

  await prisma.staffMember.upsert({
    where: {
      id: "staff_chapolin",
    },
    update: {
      name: "Gustavo",
      nickname: "Chapolin",
      role: "Fundador / Gestão",
      bio: "Responsável pela visão, persistência e movimentação da Legendaryz.",
      active: true,
    },
    create: {
      id: "staff_chapolin",
      name: "Gustavo",
      nickname: "Chapolin",
      role: "Fundador / Gestão",
      bio: "Responsável pela visão, persistência e movimentação da Legendaryz.",
      active: true,
    },
  });

  await prisma.staffMember.upsert({
    where: {
      id: "staff_legado",
    },
    update: {
      name: "Lucas",
      nickname: "Legado",
      role: "Cofundador / Produto",
      bio: "Responsável pela estrutura digital, produto e evolução da plataforma.",
      active: true,
    },
    create: {
      id: "staff_legado",
      name: "Lucas",
      nickname: "Legado",
      role: "Cofundador / Produto",
      bio: "Responsável pela estrutura digital, produto e evolução da plataforma.",
      active: true,
    },
  });

  console.log("Seed de times, jogadores, influenciadores e staff concluído.");
}

main()
  .catch((error) => {
    console.error("Erro no seed de conteúdo:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });