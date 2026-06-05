import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash("admin123", 10);
  const customerPassword = await bcrypt.hash("cliente123", 10);

  const admin = await prisma.adminUser.upsert({
    where: {
      email: "admin@legendaryz.gg",
    },
    update: {
      name: "Admin Legendaryz",
      password: adminPassword,
      role: "SUPERADMIN",
      active: true,
    },
    create: {
      name: "Admin Legendaryz",
      email: "admin@legendaryz.gg",
      password: adminPassword,
      role: "SUPERADMIN",
      active: true,
    },
  });

  const customer = await prisma.customer.upsert({
    where: {
      email: "cliente@legendaryz.gg",
    },
    update: {
      name: "Cliente Legendaryz",
      password: customerPassword,
      active: true,
    },
    create: {
      name: "Cliente Legendaryz",
      email: "cliente@legendaryz.gg",
      password: customerPassword,
      active: true,
      phone: null,
      document: null,
    },
  });

  await prisma.adminSession.deleteMany({
    where: {
      adminUserId: admin.id,
    },
  });

  await prisma.customerSession.deleteMany({
    where: {
      customerId: customer.id,
    },
  });

  console.log("Usuários resetados com sucesso.");
  console.log("");
  console.log("ADMIN:");
  console.log("E-mail: admin@legendaryz.gg");
  console.log("Senha: admin123");
  console.log("");
  console.log("CLIENTE:");
  console.log("E-mail: cliente@legendaryz.gg");
  console.log("Senha: cliente123");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });