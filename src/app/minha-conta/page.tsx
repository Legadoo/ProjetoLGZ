import Link from "next/link";
import {
  FaGift,
  FaShoppingBasket,
  FaShoppingBag,
  FaTicketAlt,
  FaUser,
} from "react-icons/fa";
import { CustomerPageHeader } from "@/components/customer/CustomerPageHeader";
import { CustomerStatCard } from "@/components/customer/CustomerStatCard";
import { requireCustomer } from "@/lib/session";
import { getCustomerAccountOverview } from "@/services/customer.service";
import { formatCurrencyBRL } from "@/services/product.service";

export default async function MinhaContaPage() {
  const customer = await requireCustomer();
  const overview = await getCustomerAccountOverview(customer.id);

  const lastOrders = overview.orders.slice(0, 3);

  return (
    <>
      <CustomerPageHeader
        eyebrow="Resumo da conta"
        title="Painel do cliente"
        description="Acompanhe seus pedidos, carrinho, cupons disponíveis e vantagens da comunidade Legendaryz."
        icon={FaUser}
      />

      <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <CustomerStatCard
          title="Pedidos"
          value={String(overview.totalOrders)}
          description="Pedidos criados na plataforma."
          icon={FaShoppingBag}
        />

        <CustomerStatCard
          title="Pendentes"
          value={String(overview.pendingOrders)}
          description="Pedidos aguardando pagamento ou processamento."
          icon={FaShoppingBag}
        />

        <CustomerStatCard
          title="Carrinho"
          value={formatCurrencyBRL(overview.cartTotal)}
          description={`${overview.cartItemsCount} item(ns) no carrinho.`}
          icon={FaShoppingBasket}
        />

        <CustomerStatCard
          title="Cupons"
          value={String(overview.couponsCount)}
          description="Cupons ativos disponíveis."
          icon={FaTicketAlt}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_380px]">
        <div className="rounded-3xl border border-purple-500/25 bg-black/35 p-6">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">
                Últimos pedidos
              </p>

              <h2 className="mt-2 text-2xl font-black uppercase">
                Histórico recente
              </h2>
            </div>

            <Link href="/minha-conta/pedidos" className="rounded-2xl border border-purple-500/40 px-4 py-3 text-xs font-black uppercase text-purple-200 transition hover:bg-purple-950/40">
              Ver todos
            </Link>
          </div>

          <div className="grid gap-3">
            {lastOrders.map((order) => (
              <article key={order.id} className="rounded-2xl border border-purple-500/20 bg-black/30 p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-xs font-black uppercase text-purple-400">
                      Pedido #{order.id.slice(-6).toUpperCase()}
                    </p>

                    <h3 className="mt-1 text-xl font-black uppercase">
                      {formatCurrencyBRL(order.total)}
                    </h3>

                    <p className="mt-1 text-sm text-zinc-500">
                      {order.items.length} item(ns) — {order.createdAt.toLocaleDateString("pt-BR")}
                    </p>
                  </div>

                  <span className="w-fit rounded-full border border-yellow-500/30 bg-yellow-950/20 px-3 py-1 text-xs font-black uppercase text-yellow-300">
                    {order.status}
                  </span>
                </div>
              </article>
            ))}

            {lastOrders.length === 0 && (
              <div className="rounded-2xl border border-purple-500/20 bg-black/30 p-6 text-center text-zinc-400">
                Nenhum pedido ainda.
              </div>
            )}
          </div>
        </div>

        <aside className="grid gap-4">
          <div className="rounded-3xl border border-purple-500/25 bg-[radial-gradient(circle_at_80%_20%,rgba(176,38,255,0.22),transparent_35%),linear-gradient(135deg,rgba(16,4,27,0.96),rgba(4,0,8,0.96))] p-6">
            <FaGift className="mb-5 text-4xl text-purple-300" />

            <h2 className="text-2xl font-black uppercase">
              Vantagens LGZ
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              A área do cliente será o centro de benefícios, cupons, vantagens e histórico da comunidade Legendaryz.
            </p>

            <Link href="/minha-conta/vantagens" className="mt-6 inline-flex rounded-2xl border border-purple-500/40 px-5 py-3 text-xs font-black uppercase text-purple-200 transition hover:bg-purple-950/40">
              Ver vantagens
            </Link>
          </div>

          <div className="rounded-3xl border border-purple-500/25 bg-black/35 p-6">
            <FaShoppingBasket className="mb-5 text-4xl text-purple-300" />

            <h2 className="text-2xl font-black uppercase">
              Carrinho
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Você possui {overview.cartItemsCount} item(ns) no carrinho.
            </p>

            <Link href="/carrinho" className="mt-6 inline-flex rounded-2xl border border-purple-500/40 px-5 py-3 text-xs font-black uppercase text-purple-200 transition hover:bg-purple-950/40">
              Abrir carrinho
            </Link>
          </div>
        </aside>
      </section>
    </>
  );
}