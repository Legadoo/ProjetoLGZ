"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireCustomer } from "@/lib/session";

export async function updateCustomerProfileAction(formData: FormData) {
  const customer = await requireCustomer();

  const name = String(formData.get("name") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const document = String(formData.get("document") || "").trim();

  if (!name) {
    return;
  }

  await prisma.customer.update({
    where: {
      id: customer.id,
    },
    data: {
      name,
      phone: phone || null,
      document: document || null,
    },
  });

  revalidatePath("/minha-conta");
  revalidatePath("/minha-conta/dados");
}