import Link from "next/link";
import { FaShoppingBag, FaShoppingCart } from "react-icons/fa";
import { CustomerPageHeader } from "@/components/customer/CustomerPageHeader";
import { requireCustomer } from "@/lib/session";
import { getCustomerOrders } from "@/services/cart.service";
import { formatCurrencyBRL } from "@/services/product.service";

export default async function CustomerPedidosPage() {
  const customer = await requireCustomer();
  const orders = await getCustomerOrders(customer.id);

  return (
    <>
      <CustomerPageHeader
        eyebrow="Histórico"
        title="Meus pedidos"
        description="Acompanhe os pedidos criados a partir do carrinho da Legendaryz."
        icon={FaShoppingBag}
      />

      <div className="grid gap-4">
        {orders.map((order) => (
          <article key={order.id} className="rounded-3xl border border-purple-500/25 bg-black/35 p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-purple-400">
                  Pedido #{order.id.slice(-6).toUpperCase()}
                </p>

                <h2 className="mt-2 text-2xl font-black uppercase">
                  {formatCurrencyBRL(order.total)}
                </h2>

                <p className="mt-2 text-sm text-zinc-400">
                  Criado em {order.createdAt.toLocaleDateString("pt-BR")}
                </p>

                {order.coupon && (
                  <p className="mt-2 text-sm text-purple-300">
                    Cupom usado: {order.coupon.code}
                  </p>
                )}
              </div>

              <span className="w-fit rounded-full border border-yellow-500/30 bg-yellow-950/20 px-4 py-2 text-xs font-black uppercase text-yellow-300">
                {order.status}
              </span>
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
          </article>
        ))}

        {orders.length === 0 && (
          <div className="rounded-3xl border border-purple-500/25 bg-black/35 p-8 text-center">
            <FaShoppingBag className="mx-auto mb-5 text-5xl text-purple-300" />

            <h2 className="text-3xl font-black uppercase">Nenhum pedido ainda</h2>

            <p className="mt-3 text-zinc-400">
              Adicione produtos ao carrinho e finalize um pedido.
            </p>

            <Link href="/loja" className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-purple-500/40 px-5 py-3 text-xs font-black uppercase text-purple-200 transition hover:bg-purple-950/40">
              <FaShoppingCart />
              Ir para loja
            </Link>
          </div>
        )}
      </div>
    </>
  );
}