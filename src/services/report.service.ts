import { prisma } from "@/lib/prisma";

function startOfDay(date: Date) {
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
}

function addDays(date: Date, days: number) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function endOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
}

function getPercentChange(current: number, previous: number) {
  if (previous === 0 && current === 0) {
    return 0;
  }

  if (previous === 0) {
    return 100;
  }

  return ((current - previous) / previous) * 100;
}

export function formatPercent(value: number) {
  const signal = value > 0 ? "+" : "";
  return `${signal}${value.toFixed(1)}%`;
}

export function formatDateShortBR(date: Date) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
  }).format(date);
}

export async function getAdminReportData() {
  const now = new Date();

  const currentMonthStart = startOfMonth(now);
  const currentMonthEnd = endOfMonth(now);

  const previousMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const previousMonthStart = startOfMonth(previousMonthDate);
  const previousMonthEnd = endOfMonth(previousMonthDate);

  const [
    orders,
    currentMonthOrders,
    previousMonthOrders,
    products,
    categories,
    customers,
    coupons,
    teams,
    players,
    influencers,
    staff,
    events,
    banners,
  ] = await Promise.all([
    prisma.order.findMany({
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
    }),

    prisma.order.findMany({
      where: {
        createdAt: {
          gte: currentMonthStart,
          lte: currentMonthEnd,
        },
      },
      include: {
        items: true,
      },
    }),

    prisma.order.findMany({
      where: {
        createdAt: {
          gte: previousMonthStart,
          lte: previousMonthEnd,
        },
      },
      include: {
        items: true,
      },
    }),

    prisma.product.findMany({
      include: {
        category: true,
        orderItems: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    }),

    prisma.productCategory.findMany(),

    prisma.customer.findMany({
      orderBy: {
        createdAt: "desc",
      },
    }),

    prisma.coupon.findMany({
      orderBy: {
        createdAt: "desc",
      },
    }),

    prisma.team.findMany({
      include: {
        players: true,
      },
    }),

    prisma.player.findMany(),

    prisma.influencer.findMany(),

    prisma.staffMember.findMany(),

    prisma.matchEvent.findMany({
      orderBy: {
        startsAt: "asc",
      },
    }),

    prisma.banner.findMany(),
  ]);

  const validOrders = orders.filter((order) => order.status !== "CANCELED");
  const currentMonthValidOrders = currentMonthOrders.filter((order) => order.status !== "CANCELED");
  const previousMonthValidOrders = previousMonthOrders.filter((order) => order.status !== "CANCELED");

  const totalRevenue = validOrders.reduce((total, order) => total + order.total, 0);
  const currentMonthRevenue = currentMonthValidOrders.reduce((total, order) => total + order.total, 0);
  const previousMonthRevenue = previousMonthValidOrders.reduce((total, order) => total + order.total, 0);

  const pendingOrders = orders.filter((order) => order.status === "PENDING");
  const paidOrders = orders.filter((order) => order.paymentStatus === "PAID");
  const shippedOrders = orders.filter((order) => order.shippingStatus === "SHIPPED");
  const deliveredOrders = orders.filter((order) => order.status === "DELIVERED");
  const canceledOrders = orders.filter((order) => order.status === "CANCELED");

  const activeProducts = products.filter((product) => product.active);
  const inactiveProducts = products.filter((product) => !product.active);
  const lowStockProducts = products
    .filter((product) => product.active && product.stockQuantity <= 5)
    .sort((a, b) => a.stockQuantity - b.stockQuantity);

  const activeCoupons = coupons.filter((coupon) => coupon.active);
  const activeInfluencers = influencers.filter((influencer) => influencer.active);
  const activeStaff = staff.filter((member) => member.active);
  const activeTeams = teams.filter((team) => team.active);
  const upcomingEvents = events.filter((event) => event.active && event.startsAt >= now);
  const activeBanners = banners.filter((banner) => banner.active);

  const totalItemsSold = validOrders.reduce((total, order) => {
    return total + order.items.reduce((itemTotal, item) => itemTotal + item.quantity, 0);
  }, 0);

  const averageTicket = validOrders.length > 0 ? totalRevenue / validOrders.length : 0;

  const productSalesMap = new Map<
    string,
    {
      id: string;
      name: string;
      quantity: number;
      total: number;
    }
  >();

  for (const order of validOrders) {
    for (const item of order.items) {
      const current = productSalesMap.get(item.productId) || {
        id: item.productId,
        name: item.product.name,
        quantity: 0,
        total: 0,
      };

      current.quantity += item.quantity;
      current.total += item.total;

      productSalesMap.set(item.productId, current);
    }
  }

  const topProducts = Array.from(productSalesMap.values())
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 8);

  const revenueLast14Days = Array.from({ length: 14 }).map((_, index) => {
    const date = startOfDay(addDays(now, index - 13));
    const nextDate = startOfDay(addDays(date, 1));

    const dayOrders = validOrders.filter((order) => {
      return order.createdAt >= date && order.createdAt < nextDate;
    });

    const revenue = dayOrders.reduce((total, order) => total + order.total, 0);

    return {
      label: formatDateShortBR(date),
      revenue,
      orders: dayOrders.length,
    };
  });

  const maxDailyRevenue = Math.max(...revenueLast14Days.map((item) => item.revenue), 1);

  const orderStatusSummary = [
    {
      label: "Pendentes",
      value: pendingOrders.length,
      status: "PENDING",
    },
    {
      label: "Pagos",
      value: paidOrders.length,
      status: "PAID",
    },
    {
      label: "Enviados",
      value: shippedOrders.length,
      status: "SHIPPED",
    },
    {
      label: "Entregues",
      value: deliveredOrders.length,
      status: "DELIVERED",
    },
    {
      label: "Cancelados",
      value: canceledOrders.length,
      status: "CANCELED",
    },
  ];

  const moduleSummary = [
    {
      label: "Produtos",
      value: products.length,
      active: activeProducts.length,
    },
    {
      label: "Categorias",
      value: categories.length,
      active: categories.filter((item) => item.active).length,
    },
    {
      label: "Clientes",
      value: customers.length,
      active: customers.filter((item) => item.active).length,
    },
    {
      label: "Cupons",
      value: coupons.length,
      active: activeCoupons.length,
    },
    {
      label: "Times",
      value: teams.length,
      active: activeTeams.length,
    },
    {
      label: "Jogadores",
      value: players.length,
      active: players.filter((item) => item.active).length,
    },
    {
      label: "Influenciadores",
      value: influencers.length,
      active: activeInfluencers.length,
    },
    {
      label: "Staff",
      value: staff.length,
      active: activeStaff.length,
    },
    {
      label: "Eventos",
      value: events.length,
      active: upcomingEvents.length,
    },
    {
      label: "Banners",
      value: banners.length,
      active: activeBanners.length,
    },
  ];

  return {
    totals: {
      totalRevenue,
      currentMonthRevenue,
      previousMonthRevenue,
      revenueChange: getPercentChange(currentMonthRevenue, previousMonthRevenue),

      totalOrders: orders.length,
      validOrders: validOrders.length,
      currentMonthOrders: currentMonthOrders.length,
      previousMonthOrders: previousMonthOrders.length,
      ordersChange: getPercentChange(currentMonthOrders.length, previousMonthOrders.length),

      pendingOrders: pendingOrders.length,
      paidOrders: paidOrders.length,
      shippedOrders: shippedOrders.length,
      deliveredOrders: deliveredOrders.length,
      canceledOrders: canceledOrders.length,

      totalProducts: products.length,
      activeProducts: activeProducts.length,
      inactiveProducts: inactiveProducts.length,
      lowStockProducts: lowStockProducts.length,

      totalCustomers: customers.length,
      activeCustomers: customers.filter((customer) => customer.active).length,

      totalCoupons: coupons.length,
      activeCoupons: activeCoupons.length,

      totalTeams: teams.length,
      activeTeams: activeTeams.length,

      totalInfluencers: influencers.length,
      activeInfluencers: activeInfluencers.length,

      totalStaff: staff.length,
      activeStaff: activeStaff.length,

      upcomingEvents: upcomingEvents.length,
      activeBanners: activeBanners.length,

      totalItemsSold,
      averageTicket,
    },

    orders,
    recentOrders: orders.slice(0, 8),
    products,
    lowStockProducts,
    topProducts,
    customers: customers.slice(0, 8),
    upcomingEvents: upcomingEvents.slice(0, 6),
    revenueLast14Days,
    maxDailyRevenue,
    orderStatusSummary,
    moduleSummary,
  };
}