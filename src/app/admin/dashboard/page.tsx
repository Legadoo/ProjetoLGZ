import Link from "next/link";
import {
  FaBoxOpen,
  FaCalendarAlt,
  FaChartLine,
  FaClipboardList,
  FaExclamationTriangle,
  FaMoneyBillWave,
  FaShoppingBag,
  FaStar,
  FaUsers,
} from "react-icons/fa";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminStatCard } from "@/components/admin/AdminStatCard";
import { requireAdminUser } from "@/lib/session";
import { formatCurrencyBRL } from "@/services/product.service";
import { formatPercent, getAdminReportData } from "@/services/report.service";

export default async function AdminDashboardPage() {
  const admin = await requireAdminUser();
  const report = await getAdminReportData();

  return (
    <>
      <AdminPageHeader
        eyebrow="Dashboard geral"
        title={`Bem-vindo, ${admin.name}`}
        description="Visão estratégica da plataforma Legendaryz: vendas, pedidos, estoque, clientes, conteúdo, calendário e operação geral."
        icon={FaChartLine}
        actionLabel="Visão executiva"
      />

      <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard
          title="Faturamento"
          value={formatCurrencyBRL(report.totals.totalRevenue)}
          description={`Mês atual: ${formatCurrencyBRL(report.totals.currentMonthRevenue)} (${formatPercent(report.totals.revenueChange)})`}
          icon={FaMoneyBillWave}
        />

        <AdminStatCard
          title="Pedidos"
          value={String(report.totals.totalOrders)}
          description={`Mês atual: ${report.totals.currentMonthOrders} pedido(s) (${formatPercent(report.totals.ordersChange)})`}
          icon={FaShoppingBag}
        />

        <AdminStatCard
          title="Ticket médio"
          value={formatCurrencyBRL(report.totals.averageTicket)}
          description={`${report.totals.totalItemsSold} item(ns) vendidos em pedidos válidos.`}
          icon={FaClipboardList}
        />

        <AdminStatCard
          title="Clientes"
          value={String(report.totals.totalCustomers)}
          description={`${report.totals.activeCustomers} cliente(s) ativo(s) cadastrados.`}
          icon={FaUsers}
        />
      </section>

      <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard
          title="Produtos ativos"
          value={String(report.totals.activeProducts)}
          description={`${report.totals.lowStockProducts} produto(s) com estoque baixo.`}
          icon={FaBoxOpen}
        />

        <AdminStatCard
          title="Pedidos pendentes"
          value={String(report.totals.pendingOrders)}
          description={`${report.totals.paidOrders} pedido(s) com pagamento confirmado.`}
          icon={FaShoppingBag}
        />

        <AdminStatCard
          title="Influenciadores"
          value={String(report.totals.activeInfluencers)}
          description="Influenciadores ativos aparecendo no site público."
          icon={FaStar}
        />

        <AdminStatCard
          title="Próximos eventos"
          value={String(report.totals.upcomingEvents)}
          description="Jogos, eventos e atividades futuras no calendário."
          icon={FaCalendarAlt}
        />
      </section>

      <section className="mb-6 grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-purple-500/25 bg-black/35 p-6">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">
                Últimos 14 dias
              </p>

              <h2 className="mt-2 text-2xl font-black uppercase">
                Receita diária
              </h2>
            </div>

            <Link
              href="/admin/relatorios"
              className="w-fit rounded-2xl border border-purple-500/40 px-5 py-3 text-xs font-black uppercase text-purple-200 transition hover:bg-purple-950/40"
            >
              Ver relatórios
            </Link>
          </div>

          <div className="grid gap-3">
            {report.revenueLast14Days.map((item) => {
              const width = Math.max(4, (item.revenue / report.maxDailyRevenue) * 100);

              return (
                <div key={item.label} className="grid gap-2 md:grid-cols-[80px_1fr_120px] md:items-center">
                  <span className="text-xs font-black uppercase text-zinc-500">
                    {item.label}
                  </span>

                  <div className="h-4 overflow-hidden rounded-full border border-purple-500/20 bg-black/40">
                    <div
                      className="h-full rounded-full bg-purple-500 shadow-[0_0_18px_rgba(168,85,247,0.75)]"
                      style={{ width: `${width}%` }}
                    />
                  </div>

                  <span className="text-sm font-bold text-purple-200 md:text-right">
                    {formatCurrencyBRL(item.revenue)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-3xl border border-purple-500/25 bg-black/35 p-6">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">
            Status dos pedidos
          </p>

          <h2 className="mt-2 text-2xl font-black uppercase">
            Operação de vendas
          </h2>

          <div className="mt-6 grid gap-3">
            {report.orderStatusSummary.map((item) => (
              <div key={item.status} className="flex items-center justify-between gap-4 rounded-2xl border border-purple-500/15 bg-black/30 p-4">
                <div>
                  <p className="font-black uppercase text-white">{item.label}</p>
                  <p className="text-xs text-zinc-500">{item.status}</p>
                </div>

                <strong className="text-2xl font-black text-purple-300">
                  {item.value}
                </strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-6 grid gap-5 xl:grid-cols-2">
        <div className="rounded-3xl border border-purple-500/25 bg-black/35 p-6">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">
            Pedidos recentes
          </p>

          <h2 className="mt-2 text-2xl font-black uppercase">
            Últimas compras
          </h2>

          <div className="mt-6 grid gap-3">
            {report.recentOrders.map((order) => (
              <article key={order.id} className="flex flex-col gap-3 rounded-2xl border border-purple-500/15 bg-black/30 p-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs font-black uppercase text-purple-400">
                    Pedido #{order.id.slice(-6).toUpperCase()}
                  </p>

                  <h3 className="mt-1 font-black uppercase text-white">
                    {order.customer.name}
                  </h3>

                  <p className="mt-1 text-sm text-zinc-500">
                    {order.status} — {order.createdAt.toLocaleDateString("pt-BR")}
                  </p>
                </div>

                <strong className="text-xl font-black text-purple-300">
                  {formatCurrencyBRL(order.total)}
                </strong>
              </article>
            ))}

            {report.recentOrders.length === 0 && (
              <div className="rounded-2xl border border-purple-500/15 bg-black/30 p-6 text-center text-zinc-500">
                Nenhum pedido criado ainda.
              </div>
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-purple-500/25 bg-black/35 p-6">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">
            Estoque
          </p>

          <h2 className="mt-2 flex items-center gap-3 text-2xl font-black uppercase">
            <FaExclamationTriangle className="text-yellow-300" />
            Produtos com estoque baixo
          </h2>

          <div className="mt-6 grid gap-3">
            {report.lowStockProducts.slice(0, 8).map((product) => (
              <article key={product.id} className="flex flex-col gap-3 rounded-2xl border border-yellow-500/20 bg-yellow-950/10 p-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="font-black uppercase text-white">{product.name}</h3>
                  <p className="mt-1 text-sm text-zinc-500">
                    {product.category?.name || "Sem categoria"}
                  </p>
                </div>

                <strong className="text-xl font-black text-yellow-300">
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
      </section>

      <section className="rounded-3xl border border-purple-500/25 bg-black/35 p-6">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">
          Módulos
        </p>

        <h2 className="mt-2 text-2xl font-black uppercase">
          Resumo geral da plataforma
        </h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {report.moduleSummary.map((module) => (
            <div key={module.label} className="rounded-2xl border border-purple-500/15 bg-black/30 p-4">
              <p className="text-xs font-black uppercase text-zinc-500">{module.label}</p>
              <strong className="mt-2 block text-3xl font-black text-white">{module.value}</strong>
              <p className="mt-1 text-sm text-purple-300">{module.active} ativo(s)</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}