import { prisma } from "@/lib/prisma";

export function formatCurrencyBRL(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export async function getProductsAdminData() {
  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.productCategory.findMany({
      orderBy: [
        {
          type: "asc",
        },
        {
          name: "asc",
        },
      ],
    }),
  ]);

  return {
    products,
    categories,
  };
}

export async function getActiveProductsByCategoryType(type: "ESPORTS_STORE" | "LGZNETWORK") {
  return prisma.product.findMany({
    where: {
      active: true,
      category: {
        type,
        active: true,
      },
    },
    include: {
      category: true,
    },
    orderBy: [
      {
        featured: "desc",
      },
      {
        createdAt: "desc",
      },
    ],
  });
}

export async function getActiveCategoriesByType(type: "ESPORTS_STORE" | "LGZNETWORK") {
  return prisma.productCategory.findMany({
    where: {
      active: true,
      type,
    },
    include: {
      products: {
        where: {
          active: true,
        },
        orderBy: [
          {
            featured: "desc",
          },
          {
            createdAt: "desc",
          },
        ],
      },
    },
    orderBy: {
      name: "asc",
    },
  });
}