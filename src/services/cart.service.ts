import { prisma } from "@/lib/prisma";
import { formatCurrencyBRL } from "@/services/product.service";

export type CouponValidationResult = {
  coupon: Awaited<ReturnType<typeof prisma.coupon.findUnique>> | null;
  discount: number;
  message: string | null;
};

export function calculateDiscount(subtotal: number, coupon: NonNullable<CouponValidationResult["coupon"]>) {
  if (subtotal <= 0) {
    return 0;
  }

  if (coupon.discountType === "FIXED") {
    return Math.min(subtotal, coupon.discountValue);
  }

  const percentageDiscount = subtotal * (coupon.discountValue / 100);
  return Math.min(subtotal, percentageDiscount);
}

export async function getCustomerCart(customerId: string, couponCode?: string) {
  const items = await prisma.cartItem.findMany({
    where: {
      customerId,
    },
    include: {
      product: {
        include: {
          category: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const subtotal = items.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  const couponResult = couponCode
    ? await validateCoupon(couponCode, subtotal)
    : {
        coupon: null,
        discount: 0,
        message: null,
      };

  const total = Math.max(0, subtotal - couponResult.discount);

  return {
    items,
    subtotal,
    discount: couponResult.discount,
    total,
    coupon: couponResult.coupon,
    couponMessage: couponResult.message,
    subtotalFormatted: formatCurrencyBRL(subtotal),
    discountFormatted: formatCurrencyBRL(couponResult.discount),
    totalFormatted: formatCurrencyBRL(total),
  };
}

export async function validateCoupon(code: string, subtotal: number): Promise<CouponValidationResult> {
  const cleanCode = code.trim().toUpperCase();

  if (!cleanCode) {
    return {
      coupon: null,
      discount: 0,
      message: "Informe um cupom.",
    };
  }

  const coupon = await prisma.coupon.findUnique({
    where: {
      code: cleanCode,
    },
  });

  if (!coupon || !coupon.active) {
    return {
      coupon: null,
      discount: 0,
      message: "Cupom inválido ou inativo.",
    };
  }

  const now = new Date();

  if (coupon.startsAt && coupon.startsAt > now) {
    return {
      coupon: null,
      discount: 0,
      message: "Cupom ainda não está disponível.",
    };
  }

  if (coupon.expiresAt && coupon.expiresAt < now) {
    return {
      coupon: null,
      discount: 0,
      message: "Cupom expirado.",
    };
  }

  if (coupon.maxUses !== null && coupon.usedCount >= coupon.maxUses) {
    return {
      coupon: null,
      discount: 0,
      message: "Cupom atingiu o limite de usos.",
    };
  }

  const discount = calculateDiscount(subtotal, coupon);

  return {
    coupon,
    discount,
    message: "Cupom aplicado com sucesso.",
  };
}

export async function getCustomerOrders(customerId: string) {
  return prisma.order.findMany({
    where: {
      customerId,
    },
    include: {
      coupon: true,
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getAdminOrders() {
  return prisma.order.findMany({
    include: {
      customer: true,
      coupon: true,
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getActiveCoupons() {
  return prisma.coupon.findMany({
    where: {
      active: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getAdminCoupons() {
  return prisma.coupon.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}