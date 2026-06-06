import { prisma } from "@/lib/prisma";

export async function getAdminCrudOverview() {
  const [
    products,
    categories,
    coupons,
    teams,
    players,
    influencers,
    staff,
    events,
    banners,
    orders,
  ] = await Promise.all([
    prisma.product.findMany({
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    }),

    prisma.productCategory.findMany({
      orderBy: {
        createdAt: "desc",
      },
    }),

    prisma.coupon.findMany({
      orderBy: {
        createdAt: "desc",
      },
    }),

    prisma.team.findMany({
      orderBy: {
        createdAt: "desc",
      },
    }),

    prisma.player.findMany({
      include: {
        team: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    }),

    prisma.influencer.findMany({
      orderBy: [
        {
          sortOrder: "asc",
        },
        {
          createdAt: "desc",
        },
      ],
    }),

    prisma.staffMember.findMany({
      orderBy: {
        createdAt: "desc",
      },
    }),

    prisma.matchEvent.findMany({
      orderBy: {
        startsAt: "asc",
      },
    }),

    prisma.banner.findMany({
      orderBy: [
        {
          section: "asc",
        },
        {
          sortOrder: "asc",
        },
      ],
    }),

    prisma.order.findMany({
      include: {
        customer: true,
        coupon: true,
        items: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
  ]);

  return {
    products,
    categories,
    coupons,
    teams,
    players,
    influencers,
    staff,
    events,
    banners,
    orders,
  };
}