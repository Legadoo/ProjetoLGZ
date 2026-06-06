"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireCustomer } from "@/lib/session";
import { getCustomerCart } from "@/services/cart.service";

function normalizeQuantity(value: FormDataEntryValue | null) {
  const quantity = Number(String(value || "1"));

  if (Number.isNaN(quantity) || quantity < 1) {
    return 1;
  }

  return Math.floor(quantity);
}

export async function addToCartAction(formData: FormData) {
  const customer = await requireCustomer();

  const productId = String(formData.get("productId") || "");
  const quantity = normalizeQuantity(formData.get("quantity"));

  if (!productId) {
    return;
  }

  const product = await prisma.product.findFirst({
    where: {
      id: productId,
      active: true,
    },
  });

  if (!product || product.stockQuantity <= 0) {
    return;
  }

  const safeQuantity = Math.min(quantity, product.stockQuantity);

  await prisma.cartItem.upsert({
    where: {
      customerId_productId: {
        customerId: customer.id,
        productId,
      },
    },
    update: {
      quantity: {
        increment: safeQuantity,
      },
    },
    create: {
      customerId: customer.id,
      productId,
      quantity: safeQuantity,
    },
  });

  revalidatePath("/carrinho");
  revalidatePath("/loja");
  revalidatePath("/lgznetwork");

  redirect("/carrinho");
}

export async function updateCartItemQuantityAction(formData: FormData) {
  const customer = await requireCustomer();

  const cartItemId = String(formData.get("cartItemId") || "");
  const quantity = normalizeQuantity(formData.get("quantity"));

  if (!cartItemId) {
    return;
  }

  await prisma.cartItem.updateMany({
    where: {
      id: cartItemId,
      customerId: customer.id,
    },
    data: {
      quantity,
    },
  });

  revalidatePath("/carrinho");
}

export async function removeCartItemAction(formData: FormData) {
  const customer = await requireCustomer();

  const cartItemId = String(formData.get("cartItemId") || "");

  if (!cartItemId) {
    return;
  }

  await prisma.cartItem.deleteMany({
    where: {
      id: cartItemId,
      customerId: customer.id,
    },
  });

  revalidatePath("/carrinho");
}

export async function clearCartAction() {
  const customer = await requireCustomer();

  await prisma.cartItem.deleteMany({
    where: {
      customerId: customer.id,
    },
  });

  revalidatePath("/carrinho");
}

export async function applyCouponRedirectAction(formData: FormData) {
  await requireCustomer();

  const code = String(formData.get("couponCode") || "").trim().toUpperCase();

  if (!code) {
    redirect("/carrinho");
  }

  redirect(`/carrinho?coupon=${encodeURIComponent(code)}`);
}

export async function checkoutCartAction(formData: FormData) {
  const customer = await requireCustomer();

  const couponCode = String(formData.get("couponCode") || "").trim().toUpperCase();
  const cart = await getCustomerCart(customer.id, couponCode || undefined);

  if (cart.items.length === 0) {
    redirect("/carrinho?error=empty");
  }

  const order = await prisma.order.create({
    data: {
      customerId: customer.id,
      status: "PENDING",
      total: cart.total,
      couponId: cart.coupon?.id || null,
      items: {
        create: cart.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.product.price,
          total: item.product.price * item.quantity,
        })),
      },
    },
  });

  if (cart.coupon) {
    await prisma.coupon.update({
      where: {
        id: cart.coupon.id,
      },
      data: {
        usedCount: {
          increment: 1,
        },
      },
    });
  }

  for (const item of cart.items) {
    await prisma.product.update({
      where: {
        id: item.productId,
      },
      data: {
        stockQuantity: {
          decrement: item.quantity,
        },
      },
    });
  }

  await prisma.cartItem.deleteMany({
    where: {
      customerId: customer.id,
    },
  });

  revalidatePath("/carrinho");
  revalidatePath("/minha-conta/pedidos");
  revalidatePath("/admin/pedidos");
  revalidatePath("/loja");
  revalidatePath("/lgznetwork");

  redirect(`/minha-conta/pedidos?created=${order.id}`);
}