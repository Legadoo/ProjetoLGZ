import { FaCrown, FaGift, FaStar } from "react-icons/fa";
import { CustomerPageHeader } from "@/components/customer/CustomerPageHeader";
import { requireCustomer } from "@/lib/session";
import { getCustomerBenefits } from "@/services/customer.service";

export default async function CustomerVantagensPage() {
  await requireCustomer();

  const benefits = await getCustomerBenefits();

  return (
    <>
      <CustomerPageHeader
        eyebrow="Benefícios"
        title="Vantagens"
        description="Veja vantagens disponíveis para clientes cadastrados da Legendaryz. Esta área será expandida nas próximas fases."
        icon={FaGift}
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {benefits.map((benefit) => (
          <article key={benefit.id} className="rounded-3xl border border-purple-500/25 bg-black/35 p-6 transition hover:-translate-y-1 hover:border-purple-400/60">
            <div className="mb-5 grid h-16 w-16 place-items-center rounded-2xl border border-purple-500/40 bg-purple-950/40 text-3xl text-purple-200">
              {benefit.type === "VIP" ? <FaCrown /> : benefit.type === "COMMUNITY" ? <FaStar /> : <FaGift />}
            </div>

            <p className="text-xs font-black uppercase tracking-[0.25em] text-purple-400">
              {benefit.type || "Benefício"}
            </p>

            <h2 className="mt-2 text-2xl font-black uppercase">
              {benefit.title}
            </h2>

            <p className="mt-3 min-h-20 text-sm leading-7 text-zinc-400">
              {benefit.description || "Vantagem disponível para clientes Legendaryz."}
            </p>

            <span className="mt-6 inline-flex rounded-full border border-emerald-500/30 bg-emerald-950/20 px-4 py-2 text-xs font-black uppercase text-emerald-300">
              Disponível
            </span>
          </article>
        ))}

        {benefits.length === 0 && (
          <div className="rounded-3xl border border-purple-500/25 bg-black/35 p-8 text-center md:col-span-2 xl:col-span-3">
            <FaGift className="mx-auto mb-5 text-5xl text-purple-300" />

            <h2 className="text-3xl font-black uppercase">
              Nenhuma vantagem ativa
            </h2>

            <p className="mt-3 text-zinc-400">
              As vantagens cadastradas aparecerão aqui.
            </p>
          </div>
        )}
      </section>
    </>
  );
}