import Link from "next/link";
import { FaShoppingBag, FaShoppingCart, FaTimesCircle, FaTruck } from "react-icons/fa";
import { cancelCustomerOrderAction } from "@/actions/crud.actions";
import { CustomerPageHeader } from "@/components/customer/CustomerPageHeader";
import { requireCustomer } from "@/lib/session";
import { getCustomerOrders } from "@/services/cart.service";
import { formatCurrencyBRL } from "@/services/product.service";
import {
  getOrderStatusLabel,
  getPaymentMethodLabel,
  getPaymentStatusLabel,
  getShippingStatusLabel,
} from "@/services/sales.service";

export default async function CustomerPedidosPage() {
  const customer = await requireCustomer();
  const orders = await getCustomerOrders(customer.id);

  return (
    <>
      <CustomerPageHeader
        eyebrow="Histórico"
        title="Meus pedidos"
        description="Acompanhe pagamento, preparação, envio, rastreio e entrega dos seus pedidos."
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

              <div className="flex flex-col gap-3">
                <span className={`w-fit rounded-full border px-4 py-2 text-xs font-black uppercase ${
                  order.status === "CANCELED"
                    ? "border-red-500/30 bg-red-950/20 text-red-300"
                    : "border-purple-500/30 bg-purple-950/20 text-purple-200"
                }`}>
                  {getOrderStatusLabel(order.status)}
                </span>

                {order.status === "PENDING" && (
                  <form action={cancelCustomerOrderAction}>
                    <input type="hidden" name="id" value={order.id} />
                    <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-500/40 px-4 py-2 text-xs font-black uppercase text-red-200 transition hover:bg-red-950/30">
                      <FaTimesCircle />
                      Cancelar pedido
                    </button>
                  </form>
                )}
              </div>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-purple-500/15 bg-black/30 p-4">
                <p className="text-xs font-black uppercase text-purple-400">Pagamento</p>
                <p className="mt-2 text-sm text-zinc-300">{getPaymentMethodLabel(order.paymentMethod)}</p>
                <p className="mt-1 text-sm text-purple-300">{getPaymentStatusLabel(order.paymentStatus)}</p>
              </div>

              <div className="rounded-2xl border border-purple-500/15 bg-black/30 p-4">
                <p className="text-xs font-black uppercase text-purple-400">Envio</p>
                <p className="mt-2 text-sm text-zinc-300">{getShippingStatusLabel(order.shippingStatus)}</p>
                <p className="mt-1 text-sm text-zinc-500">
                  {order.shippingCity || "-"} / {order.shippingState || "-"}
                </p>
              </div>

              <div className="rounded-2xl border border-purple-500/15 bg-black/30 p-4">
                <p className="text-xs font-black uppercase text-purple-400">Rastreio</p>
                {order.shippingTrackingCode ? (
                  <>
                    <p className="mt-2 text-sm text-purple-300">{order.shippingTrackingCode}</p>
                    <p className="mt-1 text-sm text-zinc-500">{order.shippingCarrier || "Transportadora"}</p>
                  </>
                ) : (
                  <p className="mt-2 text-sm text-zinc-500">Ainda não informado</p>
                )}
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