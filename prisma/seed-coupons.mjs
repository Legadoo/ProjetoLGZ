import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.coupon.upsert({
    where: {
      code: "LGZ10",
    },
    update: {
      description: "Cupom de 10% para teste da loja Legendaryz.",
      discountType: "PERCENTAGE",
      discountValue: 10,
      active: true,
      maxUses: 100,
    },
    create: {
      code: "LGZ10",
      description: "Cupom de 10% para teste da loja Legendaryz.",
      discountType: "PERCENTAGE",
      discountValue: 10,
      active: true,
      maxUses: 100,
    },
  });

  await prisma.coupon.upsert({
    where: {
      code: "NETWORK5",
    },
    update: {
      description: "Cupom fixo de R$ 5,00 para produtos LGZNetwork.",
      discountType: "FIXED",
      discountValue: 5,
      active: true,
      maxUses: 50,
    },
    create: {
      code: "NETWORK5",
      description: "Cupom fixo de R$ 5,00 para produtos LGZNetwork.",
      discountType: "FIXED",
      discountValue: 5,
      active: true,
      maxUses: 50,
    },
  });

  console.log("Seed de cupons concluído com sucesso.");
  console.log("Cupons:");
  console.log("- LGZ10");
  console.log("- NETWORK5");
}

main()
  .catch((error) => {
    console.error("Erro no seed de cupons:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });