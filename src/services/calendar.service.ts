import { prisma } from "@/lib/prisma";

export function formatDateBR(date: Date) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

export function formatTimeBR(date: Date) {
  return new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function formatDateTimeBR(date: Date) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export async function getAdminMatchEvents() {
  return prisma.matchEvent.findMany({
    orderBy: {
      startsAt: "asc",
    },
  });
}

export async function getPublicUpcomingMatchEvents(limit?: number) {
  return prisma.matchEvent.findMany({
    where: {
      active: true,
      startsAt: {
        gte: new Date(),
      },
    },
    orderBy: {
      startsAt: "asc",
    },
    take: limit,
  });
}

export async function getPublicAllMatchEvents() {
  const now = new Date();

  const [upcomingEvents, pastEvents] = await Promise.all([
    prisma.matchEvent.findMany({
      where: {
        active: true,
        startsAt: {
          gte: now,
        },
      },
      orderBy: {
        startsAt: "asc",
      },
    }),
    prisma.matchEvent.findMany({
      where: {
        active: true,
        startsAt: {
          lt: now,
        },
      },
      orderBy: {
        startsAt: "desc",
      },
    }),
  ]);

  return {
    upcomingEvents,
    pastEvents,
  };
}