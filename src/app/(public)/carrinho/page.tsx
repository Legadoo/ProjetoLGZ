import Link from "next/link";
import {
  FaShoppingCart,
  FaTag,
  FaTrash,
  FaPlus,
  FaMinus,
  FaCheckCircle,
} from "react-icons/fa";
import {
  applyCouponRedirectAction,
  removeCartItemAction,
  updateCartItemQuantityAction,
} from "@/actions/cart.actions";
import { PublicFooter } from "@/components/public/PublicFooter";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicPageHero } from "@/components/public/PublicPageHero";
import { requireCustomer } from "@/lib/session";
import { getCustomerCart } from "@/services/cart.service";
import { formatCurrencyBRL } from "@/services/product.service";

type PageProps = {
  searchParams?: Promise<{
    coupon?: string;
    error?: string;
  }>;
};

export default async function CarrinhoPage({ searchParams }: PageProps) {
  const customer = await requireCustomer();
  const params = await searchParams;
  const couponCode = params?.coupon || "";

  const cart = await getCustomerCart(customer.id, couponCode);

  return (
    <>
      <PublicHeader />

      <main>
        <PublicPageHero
          eyebrow="Carrinho de compras"
          title="Seu carrinho"
          description="Revise os produtos escolhidos, aplique cupons e avance para o checkout com dados de entrega."
          icon={FaShoppingCart}
        />

        <section className="lgz-container grid gap-6 py-10 lg:grid-cols-[1fr_380px]">
          <div className="space-y-4">
            {cart.items.length === 0 ? (
              <div className="lgz-panel rounded-3xl p-8 text-center">
                <FaShoppingCart className="mx-auto mb-5 text-5xl text-purple-300" />

                <h2 className="text-3xl font-black uppercase">
                  Carrinho vazio
                </h2>

                <p className="mt-3 text-zinc-400">
                  Adicione produtos da loja ou da LGZNetwork para criar um pedido.
                </p>

                <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                  <Link href="/loja" className="lgz-button">
                    Ver loja
                  </Link>

                  <Link href="/lgznetwork" className="lgz-button lgz-button-outline">
                    Ver LGZNetwork
                  </Link>
                </div>
              </div>
            ) : (
              cart.items.map((item) => (
                <article key={item.id} className="lgz-panel rounded-3xl p-5">
                  <div className="grid gap-5 md:grid-cols-[120px_1fr_auto] md:items-center">
                    <div className="grid h-28 w-full place-items-center rounded-2xl border border-purple-500/30 bg-purple-950/20 text-4xl text-purple-200 md:w-28">
                      <FaShoppingCart />
                    </div>

                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.25em] text-purple-400">
                        {item.product.category?.name || "Produto"}
                      </p>

                      <h2 className="mt-2 text-2xl font-black uppercase">
                        {item.product.name}
                      </h2>

                      <p className="mt-2 text-sm text-zinc-400">
                        Unitário: {formatCurrencyBRL(item.product.price)}
                      </p>

                      <p className="mt-1 text-sm font-black text-purple-300">
                        Subtotal: {formatCurrencyBRL(item.product.price * item.quantity)}
                      </p>
                    </div>

                    <div className="grid gap-3">
                      <form action={updateCartItemQuantityAction} className="flex flex-wrap items-center gap-2">
                        <input type="hidden" name="cartItemId" value={item.id} />

                        <button
                          name="quantity"
                          value={Math.max(1, item.quantity - 1)}
                          className="grid h-10 w-10 place-items-center rounded-xl border border-purple-500/30 text-purple-200 hover:bg-purple-700/30"
                        >
                          <FaMinus />
                        </button>

                        <input
                          name="quantity"
                          defaultValue={item.quantity}
                          className="h-10 w-16 rounded-xl border border-purple-500/30 bg-black/40 text-center text-white outline-none"
                        />

                        <button className="rounded-xl border border-purple-500/30 px-4 py-2 text-xs font-black uppercase text-purple-200 hover:bg-purple-700/30">
                          Atualizar
                        </button>

                        <button
                          name="quantity"
                          value={item.quantity + 1}
                          className="grid h-10 w-10 place-items-center rounded-xl border border-purple-500/30 text-purple-200 hover:bg-purple-700/30"
                        >
                          <FaPlus />
                        </button>
                      </form>

                      <form action={removeCartItemAction}>
                        <input type="hidden" name="cartItemId" value={item.id} />
                        <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/40 px-4 py-2 text-xs font-black uppercase text-red-200 hover:bg-red-950/30">
                          <FaTrash />
                          Remover
                        </button>
                      </form>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>

          <aside className="h-fit rounded-3xl border border-purple-500/25 bg-black/35 p-6">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-purple-400">
              Resumo
            </p>

            <h2 className="mt-2 text-3xl font-black uppercase">
              Pedido
            </h2>

            <div className="mt-6 grid gap-3 border-b border-purple-500/20 pb-6 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-zinc-400">Subtotal</span>
                <strong>{cart.subtotalFormatted}</strong>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-zinc-400">Desconto</span>
                <strong className="text-purple-300">-{cart.discountFormatted}</strong>
              </div>

              <div className="flex justify-between gap-4 text-xl">
                <span className="font-black uppercase">Total</span>
                <strong className="text-purple-300">{cart.totalFormatted}</strong>
              </div>
            </div>

            <form action={applyCouponRedirectAction} className="mt-6">
              <label className="grid gap-2">
                <span className="text-xs font-black uppercase text-zinc-400">
                  Cupom
                </span>

                <div className="flex gap-2">
                  <input
                    name="couponCode"
                    defaultValue={couponCode}
                    placeholder="Ex: LGZ10"
                    className="h-12 min-w-0 flex-1 rounded-xl border border-purple-500/30 bg-black/40 px-4 text-white outline-none focus:border-purple-300"
                  />

                  <button className="grid h-12 w-12 place-items-center rounded-xl border border-purple-500/40 text-purple-200 hover:bg-purple-700/30">
                    <FaTag />
                  </button>
                </div>
              </label>
            </form>

            {cart.couponMessage && (
              <div className="mt-4 rounded-xl border border-purple-500/25 bg-purple-950/20 p-3 text-sm text-purple-100">
                {cart.couponMessage}
              </div>
            )}

            {params?.error === "empty" && (
              <div className="mt-4 rounded-xl border border-red-500/30 bg-red-950/20 p-3 text-sm text-red-200">
                O carrinho está vazio.
              </div>
            )}

            {params?.error === "stock" && (
              <div className="mt-4 rounded-xl border border-red-500/30 bg-red-950/20 p-3 text-sm text-red-200">
                Um produto possui quantidade maior que o estoque disponível.
              </div>
            )}

            <Link
              href={couponCode ? `/checkout?coupon=${couponCode}` : "/checkout"}
              className={`mt-6 flex w-full items-center justify-center gap-2 rounded-2xl border border-purple-400/50 bg-purple-700/30 px-5 py-4 text-sm font-black uppercase text-purple-100 transition hover:bg-purple-600/50 ${
                cart.items.length === 0 ? "pointer-events-none opacity-50" : ""
              }`}
            >
              <FaCheckCircle />
              Ir para checkout
            </Link>

            <p className="mt-4 text-center text-xs leading-5 text-zinc-500">
              O pagamento será confirmado manualmente pelo admin nesta fase.
            </p>
          </aside>
        </section>
      </main>

      <PublicFooter />
    </>
  );
}