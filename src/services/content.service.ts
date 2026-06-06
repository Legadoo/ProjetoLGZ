import { prisma } from "@/lib/prisma";

export async function getAdminTeamsData() {
  return prisma.team.findMany({
    include: {
      players: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getAdminPlayersData() {
  const [players, teams] = await Promise.all([
    prisma.player.findMany({
      include: {
        team: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.team.findMany({
      orderBy: {
        name: "asc",
      },
    }),
  ]);

  return {
    players,
    teams,
  };
}

export async function getAdminInfluencersData() {
  return prisma.influencer.findMany({
    include: {
      galleryImages: true,
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

export async function getAdminStaffData() {
  return prisma.staffMember.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getPublicTeams() {
  return prisma.team.findMany({
    where: {
      active: true,
    },
    include: {
      players: {
        where: {
          active: true,
        },
        orderBy: {
          nickname: "asc",
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });
}

export async function getPublicInfluencers() {
  return prisma.influencer.findMany({
    where: {
      active: true,
      showOnInfluencersPage: true,
    },
    include: {
      galleryImages: {
        where: {
          active: true,
        },
        orderBy: {
          sortOrder: "asc",
        },
      },
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

export async function getPublicInfluencerBySlug(slug: string) {
  return prisma.influencer.findFirst({
    where: {
      slug,
      active: true,
    },
    include: {
      galleryImages: {
        where: {
          active: true,
        },
        orderBy: {
          sortOrder: "asc",
        },
      },
    },
  });
}

export async function getPublicInfluencerSlugs() {
  return prisma.influencer.findMany({
    where: {
      active: true,
    },
    select: {
      slug: true,
    },
  });
}

export async function getPublicStaff() {
  return prisma.staffMember.findMany({
    where: {
      active: true,
    },
    orderBy: {
      name: "asc",
    },
  });
}