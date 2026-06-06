import { FaShoppingBag } from "react-icons/fa";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminStatCard } from "@/components/admin/AdminStatCard";
import { requireAdminUser } from "@/lib/session";
import { getAdminOrders } from "@/services/cart.service";
import { formatCurrencyBRL } from "@/services/product.service";

export default async function AdminPedidosPage() {
  await requireAdminUser();

  const orders = await getAdminOrders();
  const pendingOrders = orders.filter((order) => order.status === "PENDING").length;
  const totalRevenue = orders.reduce((total, order) => total + order.total, 0);

  return (
    <>
      <AdminPageHeader
        eyebrow="Compras e pedidos"
        title="Pedidos"
        description="Acompanhe pedidos gerados pelos clientes a partir do carrinho. Nesta fase, todos entram como pendentes, sem pagamento real."
        icon={FaShoppingBag}
        actionLabel="Pedidos da loja"
      />

      <section className="mb-6 grid gap-4 md:grid-cols-3">
        <AdminStatCard
          title="Pedidos"
          value={String(orders.length)}
          description="Total de pedidos criados."
          icon={FaShoppingBag}
        />

        <AdminStatCard
          title="Pendentes"
          value={String(pendingOrders)}
          description="Pedidos aguardando pagamento/processamento."
          icon={FaShoppingBag}
        />

        <AdminStatCard
          title="Total"
          value={formatCurrencyBRL(totalRevenue)}
          description="Soma dos pedidos registrados."
          icon={FaShoppingBag}
        />
      </section>

      <section className="overflow-hidden rounded-3xl border border-purple-500/25 bg-black/35">
        <div className="border-b border-purple-500/20 p-6">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">
            Pedidos recentes
          </p>

          <h2 className="mt-2 text-2xl font-black uppercase">
            Lista de pedidos
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[920px] border-collapse">
            <thead>
              <tr className="border-b border-purple-500/20 bg-purple-950/20 text-left text-xs uppercase tracking-[0.22em] text-zinc-500">
                <th className="px-6 py-4">Pedido</th>
                <th className="px-6 py-4">Cliente</th>
                <th className="px-6 py-4">Itens</th>
                <th className="px-6 py-4">Cupom</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Data</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-purple-500/10 text-sm">
                  <td className="px-6 py-5 font-black text-purple-300">
                    #{order.id.slice(-6).toUpperCase()}
                  </td>
                  <td className="px-6 py-5 text-zinc-400">
                    {order.customer.name}
                  </td>
                  <td className="px-6 py-5 text-zinc-400">
                    {order.items.length}
                  </td>
                  <td className="px-6 py-5 text-zinc-400">
                    {order.coupon?.code || "-"}
                  </td>
                  <td className="px-6 py-5 font-bold text-white">
                    {formatCurrencyBRL(order.total)}
                  </td>
                  <td className="px-6 py-5">
                    <span className="rounded-full border border-yellow-500/30 bg-yellow-950/20 px-3 py-1 text-xs font-black uppercase text-yellow-300">
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-zinc-400">
                    {order.createdAt.toLocaleDateString("pt-BR")}
                  </td>
                </tr>
              ))}

              {orders.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-zinc-400">
                    Nenhum pedido criado ainda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}