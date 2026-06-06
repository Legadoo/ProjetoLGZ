import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function upsertCategory({ name, slug, description, type }) {
  return prisma.productCategory.upsert({
    where: {
      slug,
    },
    update: {
      name,
      description,
      type,
      active: true,
    },
    create: {
      name,
      slug,
      description,
      type,
      active: true,
    },
  });
}

async function upsertProduct({
  name,
  slug,
  description,
  price,
  stockQuantity,
  featured,
  categoryId,
}) {
  return prisma.product.upsert({
    where: {
      slug,
    },
    update: {
      name,
      description,
      price,
      stockQuantity,
      featured,
      categoryId,
      active: true,
    },
    create: {
      name,
      slug,
      description,
      price,
      stockQuantity,
      featured,
      categoryId,
      active: true,
    },
  });
}

async function main() {
  const camisetas = await upsertCategory({
    name: "Camisetas LGZ",
    slug: "camisetas-lgz",
    description: "Produtos oficiais de vestuário da Legendaryz.",
    type: "ESPORTS_STORE",
  });

  const acessorios = await upsertCategory({
    name: "Acessórios LGZ",
    slug: "acessorios-lgz",
    description: "Acessórios e itens físicos da organização.",
    type: "ESPORTS_STORE",
  });

  const ranks = await upsertCategory({
    name: "Ranks LGZNetwork",
    slug: "ranks-lgznetwork",
    description: "Ranks e vantagens para o servidor Minecraft.",
    type: "LGZNETWORK",
  });

  const digitais = await upsertCategory({
    name: "Itens digitais",
    slug: "itens-digitais-lgznetwork",
    description: "Itens digitais e benefícios do servidor.",
    type: "LGZNETWORK",
  });

  await upsertProduct({
    name: "Camiseta Legendaryz Oficial",
    slug: "camiseta-legendaryz-oficial",
    description: "Camiseta oficial da organização Legendaryz com visual gamer premium.",
    price: 79.9,
    stockQuantity: 20,
    featured: true,
    categoryId: camisetas.id,
  });

  await upsertProduct({
    name: "Moletom LGZ Dark Edition",
    slug: "moletom-lgz-dark-edition",
    description: "Moletom conceito dark premium da Legendaryz.",
    price: 149.9,
    stockQuantity: 8,
    featured: true,
    categoryId: camisetas.id,
  });

  await upsertProduct({
    name: "Adesivo Legendaryz",
    slug: "adesivo-legendaryz",
    description: "Adesivo oficial para fãs e membros da comunidade.",
    price: 9.9,
    stockQuantity: 100,
    featured: false,
    categoryId: acessorios.id,
  });

  await upsertProduct({
    name: "Rank Lendário",
    slug: "rank-lendario-lgznetwork",
    description: "Rank especial para membros do servidor LGZNetwork.",
    price: 29.9,
    stockQuantity: 999,
    featured: true,
    categoryId: ranks.id,
  });

  await upsertProduct({
    name: "Kit Inicial LGZNetwork",
    slug: "kit-inicial-lgznetwork",
    description: "Kit digital inicial para jogadores do servidor Minecraft.",
    price: 14.9,
    stockQuantity: 999,
    featured: false,
    categoryId: digitais.id,
  });

  console.log("Seed de produtos e categorias concluído com sucesso.");
}

main()
  .catch((error) => {
    console.error("Erro no seed de produtos:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });