import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function daysFromNow(days, hour, minute) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  date.setHours(hour, minute, 0, 0);
  return date;
}

async function main() {
  await prisma.matchEvent.upsert({
    where: {
      id: "match_lgz_bloodstrike_01",
    },
    update: {
      title: "Legendaryz vs Rival Team",
      game: "Blood Strike",
      opponent: "Rival Team",
      startsAt: daysFromNow(3, 20, 0),
      description: "Confronto teste da equipe Legendaryz para exibição no calendário oficial.",
      streamUrl: "https://instagram.com/legendaryzgg",
      active: true,
    },
    create: {
      id: "match_lgz_bloodstrike_01",
      title: "Legendaryz vs Rival Team",
      game: "Blood Strike",
      opponent: "Rival Team",
      startsAt: daysFromNow(3, 20, 0),
      description: "Confronto teste da equipe Legendaryz para exibição no calendário oficial.",
      streamUrl: "https://instagram.com/legendaryzgg",
      active: true,
    },
  });

  await prisma.matchEvent.upsert({
    where: {
      id: "match_lgz_network_event_01",
    },
    update: {
      title: "Evento LGZNetwork",
      game: "Minecraft",
      opponent: "Comunidade",
      startsAt: daysFromNow(7, 19, 30),
      description: "Evento comunitário do servidor Minecraft da Legendaryz.",
      streamUrl: null,
      active: true,
    },
    create: {
      id: "match_lgz_network_event_01",
      title: "Evento LGZNetwork",
      game: "Minecraft",
      opponent: "Comunidade",
      startsAt: daysFromNow(7, 19, 30),
      description: "Evento comunitário do servidor Minecraft da Legendaryz.",
      streamUrl: null,
      active: true,
    },
  });

  await prisma.matchEvent.upsert({
    where: {
      id: "match_lgz_training_01",
    },
    update: {
      title: "Treino aberto da comunidade",
      game: "Comunidade",
      opponent: "Membros LGZ",
      startsAt: daysFromNow(12, 21, 0),
      description: "Treino aberto para membros, jogadores e participantes da comunidade Legendaryz.",
      streamUrl: null,
      active: true,
    },
    create: {
      id: "match_lgz_training_01",
      title: "Treino aberto da comunidade",
      game: "Comunidade",
      opponent: "Membros LGZ",
      startsAt: daysFromNow(12, 21, 0),
      description: "Treino aberto para membros, jogadores e participantes da comunidade Legendaryz.",
      streamUrl: null,
      active: true,
    },
  });

  console.log("Seed de calendário concluído com sucesso.");
}

main()
  .catch((error) => {
    console.error("Erro no seed de calendário:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });