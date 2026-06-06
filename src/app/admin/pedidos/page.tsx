import {
  FaCheckCircle,
  FaShippingFast,
  FaShoppingBag,
  FaTimesCircle,
  FaTruck,
} from "react-icons/fa";
import {
  cancelOrderSalesAction,
  markOrderDeliveredAction,
  markOrderPaidAction,
  markOrderPreparingAction,
  markOrderShippedAction,
} from "@/actions/sales.actions";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminStatCard } from "@/components/admin/AdminStatCard";
import { requireAdminUser } from "@/lib/session";
import { getAdminOrders } from "@/services/cart.service";
import { formatCurrencyBRL } from "@/services/product.service";
import {
  getOrderStatusLabel,
  getPaymentMethodLabel,
  getPaymentStatusLabel,
  getShippingStatusLabel,
} from "@/services/sales.service";

export default async function AdminPedidosPage() {
  await requireAdminUser();

  const orders = await getAdminOrders();
  const pendingOrders = orders.filter((order) => order.status === "PENDING").length;
  const paidOrders = orders.filter((order) => order.paymentStatus === "PAID").length;
  const shippedOrders = orders.filter((order) => order.shippingStatus === "SHIPPED").length;
  const totalRevenue = orders
    .filter((order) => order.status !== "CANCELED")
    .reduce((total, order) => total + order.total, 0);

  return (
    <>
      <AdminPageHeader
        eyebrow="Vendas e envio"
        title="Pedidos"
        description="Controle pagamento, preparação, envio, código de rastreio, entrega e cancelamento dos pedidos."
        icon={FaShoppingBag}
        actionLabel="Operação de vendas"
      />

      <section className="mb-6 grid gap-4 md:grid-cols-4">
        <AdminStatCard
          title="Pedidos"
          value={String(orders.length)}
          description="Total de pedidos criados."
          icon={FaShoppingBag}
        />

        <AdminStatCard
          title="Pendentes"
          value={String(pendingOrders)}
          description="Pedidos aguardando confirmação."
          icon={FaShoppingBag}
        />

        <AdminStatCard
          title="Pagos"
          value={String(paidOrders)}
          description="Pedidos com pagamento confirmado."
          icon={FaCheckCircle}
        />

        <AdminStatCard
          title="Faturamento"
          value={formatCurrencyBRL(totalRevenue)}
          description="Soma dos pedidos não cancelados."
          icon={FaShoppingBag}
        />
      </section>

      <section className="grid gap-5">
        {orders.map((order) => (
          <article key={order.id} className="rounded-3xl border border-purple-500/25 bg-black/35 p-6">
            <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
              <div>
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.25em] text-purple-400">
                      Pedido #{order.id.slice(-6).toUpperCase()}
                    </p>

                    <h2 className="mt-2 text-3xl font-black uppercase">
                      {order.customer.name}
                    </h2>

                    <p className="mt-2 text-sm text-zinc-400">
                      {order.customer.email}
                    </p>

                    <p className="mt-3 text-2xl font-black text-purple-300">
                      {formatCurrencyBRL(order.total)}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full border border-purple-500/30 bg-purple-950/20 px-4 py-2 text-xs font-black uppercase text-purple-200">
                      {getOrderStatusLabel(order.status)}
                    </span>

                    <span className="rounded-full border border-emerald-500/30 bg-emerald-950/20 px-4 py-2 text-xs font-black uppercase text-emerald-300">
                      {getPaymentStatusLabel(order.paymentStatus)}
                    </span>

                    <span className="rounded-full border border-yellow-500/30 bg-yellow-950/20 px-4 py-2 text-xs font-black uppercase text-yellow-300">
                      {getShippingStatusLabel(order.shippingStatus)}
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-purple-500/20 bg-black/30 p-4">
                    <p className="text-xs font-black uppercase text-purple-400">Pagamento</p>
                    <p className="mt-2 text-sm text-zinc-300">{getPaymentMethodLabel(order.paymentMethod)}</p>
                    <p className="mt-1 text-xs text-zinc-500">
                      Pago em: {order.paidAt ? order.paidAt.toLocaleDateString("pt-BR") : "Não confirmado"}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-purple-500/20 bg-black/30 p-4">
                    <p className="text-xs font-black uppercase text-purple-400">Entrega</p>
                    <p className="mt-2 text-sm text-zinc-300">
                      {order.shippingStreet || "Sem endereço"}, {order.shippingNumber || "-"}
                    </p>
                    <p className="mt-1 text-xs text-zinc-500">
                      {order.shippingNeighborhood || "-"} — {order.shippingCity || "-"} / {order.shippingState || "-"}
                    </p>
                    <p className="mt-1 text-xs text-zinc-500">
                      CEP: {order.shippingZipCode || "-"} | Tel: {order.shippingPhone || "-"}
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid gap-3">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between gap-4 rounded-2xl border border-purple-500/15 bg-black/30 p-4 text-sm">
                      <div>
                        <p className="font-bold text-white">{item.product.name}</p>
                        <p className="text-zinc-500">Quantidade: {item.quantity}</p>
                      </div>

                      <strong className="text-purple-300">
                        {formatCurrencyBRL(item.total)}
                      </strong>
                    </div>
                  ))}
                </div>
              </div>

              <aside className="grid h-fit gap-3">
                {order.status !== "CANCELED" && order.paymentStatus !== "PAID" && (
                  <form action={markOrderPaidAction}>
                    <input type="hidden" name="id" value={order.id} />
                    <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-500/40 px-4 py-3 text-xs font-black uppercase text-emerald-200 transition hover:bg-emerald-950/30">
                      <FaCheckCircle />
                      Confirmar pagamento
                    </button>
                  </form>
                )}

                {order.status !== "CANCELED" && order.paymentStatus === "PAID" && order.status !== "PREPARING" && order.status !== "SHIPPED" && order.status !== "DELIVERED" && (
                  <form action={markOrderPreparingAction}>
                    <input type="hidden" name="id" value={order.id} />
                    <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-purple-500/40 px-4 py-3 text-xs font-black uppercase text-purple-200 transition hover:bg-purple-950/30">
                      <FaShoppingBag />
                      Marcar preparando
                    </button>
                  </form>
                )}

                {order.status !== "CANCELED" && order.status !== "SHIPPED" && order.status !== "DELIVERED" && (
                  <form action={markOrderShippedAction} className="grid gap-2 rounded-2xl border border-purple-500/20 bg-black/30 p-3">
                    <input type="hidden" name="id" value={order.id} />

                    <input
                      name="shippingCarrier"
                      placeholder="Transportadora"
                      defaultValue={order.shippingCarrier || ""}
                      className="h-11 rounded-xl border border-purple-500/25 bg-black/40 px-3 text-sm text-white outline-none"
                    />

                    <input
                      name="shippingTrackingCode"
                      placeholder="Código de rastreio"
                      defaultValue={order.shippingTrackingCode || ""}
                      className="h-11 rounded-xl border border-purple-500/25 bg-black/40 px-3 text-sm text-white outline-none"
                    />

                    <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-yellow-500/40 px-4 py-3 text-xs font-black uppercase text-yellow-200 transition hover:bg-yellow-950/30">
                      <FaShippingFast />
                      Marcar enviado
                    </button>
                  </form>
                )}

                {order.status === "SHIPPED" && (
                  <form action={markOrderDeliveredAction}>
                    <input type="hidden" name="id" value={order.id} />
                    <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-500/40 px-4 py-3 text-xs font-black uppercase text-emerald-200 transition hover:bg-emerald-950/30">
                      <FaTruck />
                      Marcar entregue
                    </button>
                  </form>
                )}

                {order.status !== "CANCELED" && order.status !== "DELIVERED" && (
                  <form action={cancelOrderSalesAction}>
                    <input type="hidden" name="id" value={order.id} />
                    <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/40 px-4 py-3 text-xs font-black uppercase text-red-200 transition hover:bg-red-950/30">
                      <FaTimesCircle />
                      Cancelar pedido
                    </button>
                  </form>
                )}

                {order.shippingTrackingCode && (
                  <div className="rounded-2xl border border-purple-500/20 bg-black/30 p-4 text-sm">
                    <p className="text-xs font-black uppercase text-purple-400">Rastreio</p>
                    <p className="mt-2 text-purple-200">{order.shippingTrackingCode}</p>
                    <p className="mt-1 text-zinc-500">{order.shippingCarrier || "Transportadora não informada"}</p>
                  </div>
                )}
              </aside>
            </div>
          </article>
        ))}

        {orders.length === 0 && (
          <div className="rounded-3xl border border-purple-500/25 bg-black/35 p-8 text-center text-zinc-400">
            Nenhum pedido criado ainda.
          </div>
        )}
      </section>
    </>
  );
}