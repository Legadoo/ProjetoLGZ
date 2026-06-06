import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function upsertBenefit({ title, description, type }) {
  const existing = await prisma.customerBenefit.findFirst({
    where: {
      title,
    },
  });

  if (existing) {
    return prisma.customerBenefit.update({
      where: {
        id: existing.id,
      },
      data: {
        description,
        type,
        active: true,
      },
    });
  }

  return prisma.customerBenefit.create({
    data: {
      title,
      description,
      type,
      active: true,
    },
  });
}

async function main() {
  await upsertBenefit({
    title: "Acesso a cupons exclusivos",
    description: "Clientes cadastrados podem receber campanhas, cupons e descontos especiais da Legendaryz.",
    type: "COUPON",
  });

  await upsertBenefit({
    title: "Histórico de pedidos",
    description: "Acompanhe suas compras, pedidos pendentes e itens adquiridos dentro da plataforma.",
    type: "ORDER",
  });

  await upsertBenefit({
    title: "Benefícios da comunidade",
    description: "Base preparada para vantagens futuras em eventos, loja, LGZNetwork e ações da comunidade.",
    type: "COMMUNITY",
  });

  await upsertBenefit({
    title: "Vantagens VIP futuras",
    description: "Estrutura pronta para níveis, assinaturas, benefícios premium e recompensas exclusivas.",
    type: "VIP",
  });

  console.log("Seed de vantagens concluído com sucesso.");
}

main()
  .catch((error) => {
    console.error("Erro no seed de vantagens:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });