"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdminUser } from "@/lib/session";

function getString(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

function getNullableString(formData: FormData, key: string) {
  const value = getString(formData, key);
  return value || null;
}

function revalidateSalesPaths() {
  revalidatePath("/admin/pedidos");
  revalidatePath("/admin/gerenciar");
  revalidatePath("/minha-conta");
  revalidatePath("/minha-conta/pedidos");
}

export async function markOrderPaidAction(formData: FormData) {
  await requireAdminUser();

  const id = getString(formData, "id");

  if (!id) {
    return;
  }

  await prisma.order.update({
    where: {
      id,
    },
    data: {
      status: "PAID",
      paymentStatus: "PAID",
      paidAt: new Date(),
    },
  });

  revalidateSalesPaths();
  redirect("/admin/pedidos?paid=1");
}

export async function markOrderPreparingAction(formData: FormData) {
  await requireAdminUser();

  const id = getString(formData, "id");

  if (!id) {
    return;
  }

  await prisma.order.update({
    where: {
      id,
    },
    data: {
      status: "PREPARING",
      shippingStatus: "PREPARING",
    },
  });

  revalidateSalesPaths();
  redirect("/admin/pedidos?preparing=1");
}

export async function markOrderShippedAction(formData: FormData) {
  await requireAdminUser();

  const id = getString(formData, "id");

  if (!id) {
    return;
  }

  await prisma.order.update({
    where: {
      id,
    },
    data: {
      status: "SHIPPED",
      shippingStatus: "SHIPPED",
      shippingCarrier: getNullableString(formData, "shippingCarrier"),
      shippingTrackingCode: getNullableString(formData, "shippingTrackingCode"),
      shippedAt: new Date(),
    },
  });

  revalidateSalesPaths();
  redirect("/admin/pedidos?shipped=1");
}

export async function markOrderDeliveredAction(formData: FormData) {
  await requireAdminUser();

  const id = getString(formData, "id");

  if (!id) {
    return;
  }

  await prisma.order.update({
    where: {
      id,
    },
    data: {
      status: "DELIVERED",
      shippingStatus: "DELIVERED",
      deliveredAt: new Date(),
    },
  });

  revalidateSalesPaths();
  redirect("/admin/pedidos?delivered=1");
}

export async function cancelOrderSalesAction(formData: FormData) {
  await requireAdminUser();

  const id = getString(formData, "id");

  if (!id) {
    return;
  }

  await prisma.order.update({
    where: {
      id,
    },
    data: {
      status: "CANCELED",
      paymentStatus: "CANCELED",
      shippingStatus: "CANCELED",
    },
  });

  revalidateSalesPaths();
  redirect("/admin/pedidos?canceled=1");
}