import Link from "next/link";
import { FaCreditCard, FaMapMarkerAlt, FaShoppingBag } from "react-icons/fa";
import { checkoutCartAction } from "@/actions/cart.actions";
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

export default async function CheckoutPage({ searchParams }: PageProps) {
  const customer = await requireCustomer();
  const params = await searchParams;
  const couponCode = params?.coupon || "";

  const cart = await getCustomerCart(customer.id, couponCode);

  return (
    <>
      <PublicHeader />

      <main>
        <PublicPageHero
          eyebrow="Finalização"
          title="Checkout"
          description="Informe os dados de entrega e escolha a forma de pagamento. Nesta fase, a confirmação do pagamento é manual pelo admin."
          icon={FaShoppingBag}
        />

        <section className="lgz-container grid gap-6 py-10 lg:grid-cols-[1fr_390px]">
          <form action={checkoutCartAction} className="grid gap-6">
            <input type="hidden" name="couponCode" value={couponCode} />

            <section className="rounded-3xl border border-purple-500/25 bg-black/35 p-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl border border-purple-500/40 bg-purple-950/40 text-purple-200">
                  <FaMapMarkerAlt />
                </div>

                <div>
                  <p className="text-xs font-black uppercase tracking-[0.25em] text-purple-400">
                    Entrega
                  </p>
                  <h2 className="text-2xl font-black uppercase">
                    Dados de envio
                  </h2>
                </div>
              </div>

              {params?.error === "address" && (
                <div className="mb-5 rounded-xl border border-red-500/30 bg-red-950/20 p-4 text-sm text-red-200">
                  Preencha todos os dados obrigatórios de entrega.
                </div>
              )}

              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-xs font-black uppercase text-zinc-400">Nome para entrega</span>
                  <input name="shippingName" defaultValue={customer.name} required className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300" />
                </label>

                <label className="grid gap-2">
                  <span className="text-xs font-black uppercase text-zinc-400">Telefone</span>
                  <input name="shippingPhone" defaultValue={customer.phone || ""} required className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300" />
                </label>

                <label className="grid gap-2">
                  <span className="text-xs font-black uppercase text-zinc-400">CEP</span>
                  <input name="shippingZipCode" required placeholder="Ex: 00000-000" className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300" />
                </label>

                <label className="grid gap-2">
                  <span className="text-xs font-black uppercase text-zinc-400">Estado</span>
                  <input name="shippingState" required placeholder="Ex: RJ" className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300" />
                </label>

                <label className="grid gap-2">
                  <span className="text-xs font-black uppercase text-zinc-400">Cidade</span>
                  <input name="shippingCity" required placeholder="Ex: Queimados" className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300" />
                </label>

                <label className="grid gap-2">
                  <span className="text-xs font-black uppercase text-zinc-400">Bairro</span>
                  <input name="shippingNeighborhood" required className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300" />
                </label>

                <label className="grid gap-2">
                  <span className="text-xs font-black uppercase text-zinc-400">Rua</span>
                  <input name="shippingStreet" required className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300" />
                </label>

                <label className="grid gap-2">
                  <span className="text-xs font-black uppercase text-zinc-400">Número</span>
                  <input name="shippingNumber" required className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300" />
                </label>

                <label className="grid gap-2 md:col-span-2">
                  <span className="text-xs font-black uppercase text-zinc-400">Complemento</span>
                  <input name="shippingComplement" placeholder="Opcional" className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300" />
                </label>
              </div>
            </section>

            <section className="rounded-3xl border border-purple-500/25 bg-black/35 p-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl border border-purple-500/40 bg-purple-950/40 text-purple-200">
                  <FaCreditCard />
                </div>

                <div>
                  <p className="text-xs font-black uppercase tracking-[0.25em] text-purple-400">
                    Pagamento
                  </p>
                  <h2 className="text-2xl font-black uppercase">
                    Forma de pagamento
                  </h2>
                </div>
              </div>

              <div className="grid gap-3">
                <label className="flex items-center gap-3 rounded-2xl border border-purple-500/25 bg-black/30 p-4 text-sm font-black uppercase text-purple-100">
                  <input type="radio" name="paymentMethod" value="PIX_MANUAL" defaultChecked />
                  Pix manual
                </label>

                <label className="flex items-center gap-3 rounded-2xl border border-purple-500/25 bg-black/30 p-4 text-sm font-black uppercase text-purple-100">
                  <input type="radio" name="paymentMethod" value="CARD_MANUAL" />
                  Cartão manual
                </label>

                <label className="flex items-center gap-3 rounded-2xl border border-purple-500/25 bg-black/30 p-4 text-sm font-black uppercase text-purple-100">
                  <input type="radio" name="paymentMethod" value="CASH" />
                  Pagamento combinado
                </label>
              </div>

              <div className="mt-5 rounded-2xl border border-yellow-500/25 bg-yellow-950/10 p-4 text-sm leading-6 text-yellow-100">
                Nesta fase, o sistema cria o pedido e o admin confirma o pagamento manualmente no painel.
              </div>
            </section>

            <button
              disabled={cart.items.length === 0}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-purple-400/50 bg-purple-700/30 px-5 py-4 text-sm font-black uppercase text-purple-100 transition hover:bg-purple-600/50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FaShoppingBag />
              Finalizar pedido
            </button>
          </form>

          <aside className="h-fit rounded-3xl border border-purple-500/25 bg-black/35 p-6">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-purple-400">
              Resumo final
            </p>

            <h2 className="mt-2 text-3xl font-black uppercase">
              Compra
            </h2>

            <div className="mt-6 grid gap-3">
              {cart.items.map((item) => (
                <div key={item.id} className="rounded-2xl border border-purple-500/20 bg-black/30 p-4">
                  <p className="font-black uppercase text-white">{item.product.name}</p>
                  <p className="mt-1 text-sm text-zinc-500">Qtd: {item.quantity}</p>
                  <p className="mt-2 text-sm font-black text-purple-300">
                    {formatCurrencyBRL(item.product.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-3 border-t border-purple-500/20 pt-6 text-sm">
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

            {cart.items.length === 0 && (
              <Link href="/loja" className="mt-6 flex w-full justify-center rounded-2xl border border-purple-500/40 px-5 py-3 text-xs font-black uppercase text-purple-200">
                Voltar para loja
              </Link>
            )}
          </aside>
        </section>
      </main>

      <PublicFooter />
    </>
  );
}