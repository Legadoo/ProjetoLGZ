import Link from "next/link";
import { FaShoppingCart, FaTicketAlt } from "react-icons/fa";
import { CustomerPageHeader } from "@/components/customer/CustomerPageHeader";
import { requireCustomer } from "@/lib/session";
import { getActiveCoupons } from "@/services/cart.service";
import { formatCurrencyBRL } from "@/services/product.service";

export default async function CustomerCuponsPage() {
  await requireCustomer();

  const coupons = await getActiveCoupons();

  return (
    <>
      <CustomerPageHeader
        eyebrow="Campanhas"
        title="Cupons"
        description="Cupons ativos disponíveis para uso no carrinho da Legendaryz."
        icon={FaTicketAlt}
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {coupons.map((coupon) => (
          <article key={coupon.id} className="rounded-3xl border border-purple-500/25 bg-black/35 p-6">
            <FaTicketAlt className="mb-5 text-4xl text-purple-300" />

            <p className="text-xs font-black uppercase tracking-[0.25em] text-purple-400">
              Cupom disponível
            </p>

            <h2 className="mt-2 text-3xl font-black uppercase text-white">
              {coupon.code}
            </h2>

            <p className="mt-3 min-h-12 text-sm leading-6 text-zinc-400">
              {coupon.description || "Cupom de desconto Legendaryz."}
            </p>

            <p className="mt-5 text-xl font-black text-purple-300">
              {coupon.discountType === "FIXED"
                ? formatCurrencyBRL(coupon.discountValue)
                : `${coupon.discountValue}% OFF`}
            </p>

            <p className="mt-3 text-xs uppercase text-zinc-500">
              Usos: {coupon.usedCount}{coupon.maxUses ? `/${coupon.maxUses}` : ""}
            </p>

            <Link
              href={`/carrinho?coupon=${coupon.code}`}
              className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-purple-500/40 px-5 py-3 text-xs font-black uppercase text-purple-200 transition hover:bg-purple-950/40"
            >
              <FaShoppingCart />
              Usar no carrinho
            </Link>
          </article>
        ))}

        {coupons.length === 0 && (
          <div className="rounded-3xl border border-purple-500/25 bg-black/35 p-8 text-center md:col-span-2 xl:col-span-3">
            <FaTicketAlt className="mx-auto mb-5 text-5xl text-purple-300" />
            <h2 className="text-3xl font-black uppercase">Nenhum cupom ativo</h2>
            <p className="mt-3 text-zinc-400">Aguarde novas campanhas da Legendaryz.</p>
          </div>
        )}
      </section>
    </>
  );
}