import { prisma } from "@/lib/prisma";

export async function getCustomerAccountOverview(customerId: string) {
  const [orders, cartItems, activeCoupons, benefits] = await Promise.all([
    prisma.order.findMany({
      where: {
        customerId,
      },
      include: {
        items: true,
        coupon: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    }),

    prisma.cartItem.findMany({
      where: {
        customerId,
      },
      include: {
        product: true,
      },
    }),

    prisma.coupon.findMany({
      where: {
        active: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    }),

    prisma.customerBenefit.findMany({
      where: {
        active: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
  ]);

  const totalSpent = orders.reduce((total, order) => total + order.total, 0);

  const cartTotal = cartItems.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  const pendingOrders = orders.filter((order) => order.status === "PENDING").length;

  return {
    orders,
    cartItems,
    activeCoupons,
    benefits,
    totalOrders: orders.length,
    pendingOrders,
    totalSpent,
    cartTotal,
    cartItemsCount: cartItems.length,
    couponsCount: activeCoupons.length,
    benefitsCount: benefits.length,
  };
}

export async function getCustomerBenefits() {
  return prisma.customerBenefit.findMany({
    where: {
      active: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}