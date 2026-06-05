import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = "admin@legendaryz.gg";
  const adminPlainPassword = "admin123";

  const customerEmail = "cliente@legendaryz.gg";
  const customerPlainPassword = "cliente123";

  const adminPassword = await bcrypt.hash(adminPlainPassword, 10);
  const customerPassword = await bcrypt.hash(customerPlainPassword, 10);

  const admin = await prisma.adminUser.upsert({
    where: {
      email: adminEmail,
    },
    update: {
      name: "Admin Legendaryz",
      password: adminPassword,
      role: "SUPERADMIN",
      active: true,
    },
    create: {
      name: "Admin Legendaryz",
      email: adminEmail,
      password: adminPassword,
      role: "SUPERADMIN",
      active: true,
    },
  });

  const customer = await prisma.customer.upsert({
    where: {
      email: customerEmail,
    },
    update: {
      name: "Cliente Legendaryz",
      password: customerPassword,
      active: true,
    },
    create: {
      name: "Cliente Legendaryz",
      email: customerEmail,
      password: customerPassword,
      active: true,
      phone: null,
      document: null,
    },
  });

  await prisma.adminSession.deleteMany();
  await prisma.customerSession.deleteMany();

  const adminPasswordOk = await bcrypt.compare(adminPlainPassword, admin.password);
  const customerPasswordOk = await bcrypt.compare(customerPlainPassword, customer.password);

  console.log("");
  console.log("USUÁRIOS RESETADOS COM SUCESSO");
  console.log("--------------------------------");
  console.log("ADMIN:");
  console.log("ID:", admin.id);
  console.log("E-mail:", admin.email);
  console.log("Senha testada:", adminPasswordOk ? "OK" : "FALHOU");
  console.log("");
  console.log("CLIENTE:");
  console.log("ID:", customer.id);
  console.log("E-mail:", customer.email);
  console.log("Senha testada:", customerPasswordOk ? "OK" : "FALHOU");
  console.log("");
  console.log("LOGIN ADMIN:");
  console.log("URL: http://localhost:3008/admin/login");
  console.log("E-mail: admin@legendaryz.gg");
  console.log("Senha: admin123");
  console.log("");
  console.log("LOGIN CLIENTE:");
  console.log("URL: http://localhost:3008/login");
  console.log("E-mail: cliente@legendaryz.gg");
  console.log("Senha: cliente123");
}

main()
  .catch((error) => {
    console.error("ERRO NO RESET:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });