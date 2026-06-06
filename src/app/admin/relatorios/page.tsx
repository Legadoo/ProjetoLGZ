import Link from "next/link";
import {
  FaBoxOpen,
  FaCalendarAlt,
  FaChartBar,
  FaExclamationTriangle,
  FaMoneyBillWave,
  FaShoppingBag,
  FaTrophy,
  FaUsers,
} from "react-icons/fa";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminStatCard } from "@/components/admin/AdminStatCard";
import { requireAdminUser } from "@/lib/session";
import { formatCurrencyBRL } from "@/services/product.service";
import { formatPercent, getAdminReportData } from "@/services/report.service";

export default async function AdminRelatoriosPage() {
  await requireAdminUser();

  const report = await getAdminReportData();

  return (
    <>
      <AdminPageHeader
        eyebrow="Relatórios"
        title="Relatórios gerais"
        description="Análise completa da operação Legendaryz: vendas, pedidos, estoque, clientes, produtos, conteúdo, eventos e módulos administrativos."
        icon={FaChartBar}
        actionLabel="Relatório administrativo"
      />

      <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard
          title="Receita total"
          value={formatCurrencyBRL(report.totals.totalRevenue)}
          description={`Comparativo mensal: ${formatPercent(report.totals.revenueChange)}`}
          icon={FaMoneyBillWave}
        />

        <AdminStatCard
          title="Pedidos válidos"
          value={String(report.totals.validOrders)}
          description={`${report.totals.canceledOrders} pedido(s) cancelado(s).`}
          icon={FaShoppingBag}
        />

        <AdminStatCard
          title="Itens vendidos"
          value={String(report.totals.totalItemsSold)}
          description="Soma de itens em pedidos não cancelados."
          icon={FaBoxOpen}
        />

        <AdminStatCard
          title="Ticket médio"
          value={formatCurrencyBRL(report.totals.averageTicket)}
          description="Valor médio por pedido válido."
          icon={FaTrophy}
        />
      </section>

      <section className="mb-6 grid gap-6 xl:grid-cols-[1fr_420px]">
        <div className="overflow-hidden rounded-3xl border border-purple-500/25 bg-black/35">
          <div className="border-b border-purple-500/20 p-6">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">
              Ranking
            </p>

            <h2 className="mt-2 text-2xl font-black uppercase">
              Produtos mais vendidos
            </h2>
          </div>

          <div className="grid gap-3 p-4">
            {report.topProducts.map((product, index) => (
              <article key={product.id} className="flex flex-col gap-3 rounded-2xl border border-purple-500/15 bg-black/30 p-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-xl border border-purple-500/30 bg-purple-950/30 text-lg font-black text-purple-200">
                    #{index + 1}
                  </div>

                  <div>
                    <h3 className="font-black uppercase text-white">{product.name}</h3>
                    <p className="mt-1 text-sm text-zinc-500">{product.quantity} unidade(s) vendida(s)</p>
                  </div>
                </div>

                <strong className="text-xl font-black text-purple-300">
                  {formatCurrencyBRL(product.total)}
                </strong>
              </article>
            ))}

            {report.topProducts.length === 0 && (
              <div className="rounded-2xl border border-purple-500/15 bg-black/30 p-6 text-center text-zinc-500">
                Nenhum produto vendido ainda.
              </div>
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-purple-500/25 bg-black/35 p-6">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">
            Conversão operacional
          </p>

          <h2 className="mt-2 text-2xl font-black uppercase">
            Status dos pedidos
          </h2>

          <div className="mt-6 grid gap-3">
            {report.orderStatusSummary.map((item) => (
              <div key={item.status} className="rounded-2xl border border-purple-500/15 bg-black/30 p-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-black uppercase text-white">{item.label}</span>
                  <strong className="text-2xl font-black text-purple-300">{item.value}</strong>
                </div>

                <div className="mt-3 h-3 overflow-hidden rounded-full border border-purple-500/20 bg-black/40">
                  <div
                    className="h-full rounded-full bg-purple-500"
                    style={{
                      width: `${report.totals.totalOrders > 0 ? Math.max(4, (item.value / report.totals.totalOrders) * 100) : 0}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-6 overflow-hidden rounded-3xl border border-purple-500/25 bg-black/35">
        <div className="border-b border-purple-500/20 p-6">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">
            Pedidos
          </p>

          <h2 className="mt-2 text-2xl font-black uppercase">
            Relatório de pedidos recentes
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] border-collapse">
            <thead>
              <tr className="border-b border-purple-500/20 bg-purple-950/20 text-left text-xs uppercase tracking-[0.22em] text-zinc-500">
                <th className="px-6 py-4">Pedido</th>
                <th className="px-6 py-4">Cliente</th>
                <th className="px-6 py-4">Itens</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Pagamento</th>
                <th className="px-6 py-4">Envio</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Data</th>
              </tr>
            </thead>

            <tbody>
              {report.orders.slice(0, 20).map((order) => (
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

                  <td className="px-6 py-5 font-bold text-white">
                    {formatCurrencyBRL(order.total)}
                  </td>

                  <td className="px-6 py-5 text-zinc-400">
                    {order.paymentStatus || "PENDING"}
                  </td>

                  <td className="px-6 py-5 text-zinc-400">
                    {order.shippingStatus || "PENDING"}
                  </td>

                  <td className="px-6 py-5 text-zinc-400">
                    {order.status}
                  </td>

                  <td className="px-6 py-5 text-zinc-400">
                    {order.createdAt.toLocaleDateString("pt-BR")}
                  </td>
                </tr>
              ))}

              {report.orders.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-zinc-400">
                    Nenhum pedido criado ainda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-6 grid gap-6 xl:grid-cols-2">
        <div className="overflow-hidden rounded-3xl border border-purple-500/25 bg-black/35">
          <div className="border-b border-purple-500/20 p-6">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">
              Estoque
            </p>

            <h2 className="mt-2 flex items-center gap-3 text-2xl font-black uppercase">
              <FaExclamationTriangle className="text-yellow-300" />
              Estoque baixo
            </h2>
          </div>

          <div className="grid gap-3 p-4">
            {report.lowStockProducts.map((product) => (
              <article key={product.id} className="flex items-center justify-between gap-4 rounded-2xl border border-yellow-500/20 bg-yellow-950/10 p-4">
                <div>
                  <h3 className="font-black uppercase text-white">{product.name}</h3>
                  <p className="mt-1 text-sm text-zinc-500">{product.category?.name || "Sem categoria"}</p>
                </div>

                <strong className="text-2xl font-black text-yellow-300">
                  {product.stockQuantity}
                </strong>
              </article>
            ))}

            {report.lowStockProducts.length === 0 && (
              <div className="rounded-2xl border border-purple-500/15 bg-black/30 p-6 text-center text-zinc-500">
                Nenhum produto com estoque baixo.
              </div>
            )}
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-purple-500/25 bg-black/35">
          <div className="border-b border-purple-500/20 p-6">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">
              Clientes
            </p>

            <h2 className="mt-2 flex items-center gap-3 text-2xl font-black uppercase">
              <FaUsers className="text-purple-300" />
              Clientes recentes
            </h2>
          </div>

          <div className="grid gap-3 p-4">
            {report.customers.map((customer) => (
              <article key={customer.id} className="rounded-2xl border border-purple-500/15 bg-black/30 p-4">
                <h3 className="font-black uppercase text-white">{customer.name}</h3>
                <p className="mt-1 text-sm text-zinc-500">{customer.email}</p>
                <p className="mt-2 text-xs font-black uppercase text-purple-300">
                  {customer.active ? "Ativo" : "Inativo"}
                </p>
              </article>
            ))}

            {report.customers.length === 0 && (
              <div className="rounded-2xl border border-purple-500/15 bg-black/30 p-6 text-center text-zinc-500">
                Nenhum cliente cadastrado.
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="mb-6 grid gap-6 xl:grid-cols-2">
        <div className="rounded-3xl border border-purple-500/25 bg-black/35 p-6">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">
            Conteúdo
          </p>

          <h2 className="mt-2 text-2xl font-black uppercase">
            Módulos da plataforma
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {report.moduleSummary.map((module) => (
              <div key={module.label} className="rounded-2xl border border-purple-500/15 bg-black/30 p-4">
                <p className="text-xs font-black uppercase text-zinc-500">{module.label}</p>
                <strong className="mt-2 block text-3xl font-black text-white">{module.value}</strong>
                <p className="mt-1 text-sm text-purple-300">{module.active} ativo(s)</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-purple-500/25 bg-black/35 p-6">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">
            Calendário
          </p>

          <h2 className="mt-2 flex items-center gap-3 text-2xl font-black uppercase">
            <FaCalendarAlt className="text-purple-300" />
            Próximos eventos
          </h2>

          <div className="mt-6 grid gap-3">
            {report.upcomingEvents.map((event) => (
              <article key={event.id} className="rounded-2xl border border-purple-500/15 bg-black/30 p-4">
                <h3 className="font-black uppercase text-white">{event.title}</h3>
                <p className="mt-1 text-sm text-zinc-500">
                  {event.game || "Evento"} — {event.startsAt.toLocaleDateString("pt-BR")}
                </p>
                <p className="mt-2 text-xs font-black uppercase text-purple-300">
                  {event.opponent || "Legendaryz"}
                </p>
              </article>
            ))}

            {report.upcomingEvents.length === 0 && (
              <div className="rounded-2xl border border-purple-500/15 bg-black/30 p-6 text-center text-zinc-500">
                Nenhum evento futuro cadastrado.
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-purple-500/25 bg-purple-950/20 p-6">
        <h2 className="text-2xl font-black uppercase text-purple-100">
          Ações rápidas
        </h2>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/admin/pedidos" className="rounded-2xl border border-purple-500/40 px-5 py-3 text-xs font-black uppercase text-purple-200 transition hover:bg-purple-950/40">
            Operar pedidos
          </Link>

          <Link href="/admin/produtos" className="rounded-2xl border border-purple-500/40 px-5 py-3 text-xs font-black uppercase text-purple-200 transition hover:bg-purple-950/40">
            Gerenciar produtos
          </Link>

          <Link href="/admin/gerenciar" className="rounded-2xl border border-purple-500/40 px-5 py-3 text-xs font-black uppercase text-purple-200 transition hover:bg-purple-950/40">
            Central CRUD
          </Link>

          <Link href="/admin/calendario" className="rounded-2xl border border-purple-500/40 px-5 py-3 text-xs font-black uppercase text-purple-200 transition hover:bg-purple-950/40">
            Calendário
          </Link>
        </div>
      </section>
    </>
  );
}