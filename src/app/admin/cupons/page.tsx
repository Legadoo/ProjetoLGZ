import { FaPercent, FaPlus, FaTicketAlt } from "react-icons/fa";
import { createCouponAction, toggleCouponStatusAction } from "@/actions/coupon.actions";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminStatCard } from "@/components/admin/AdminStatCard";
import { requireAdminUser } from "@/lib/session";
import { getAdminCoupons } from "@/services/cart.service";
import { formatCurrencyBRL } from "@/services/product.service";

export default async function AdminCuponsPage() {
  await requireAdminUser();

  const coupons = await getAdminCoupons();
  const activeCoupons = coupons.filter((coupon) => coupon.active).length;
  const inactiveCoupons = coupons.filter((coupon) => !coupon.active).length;

  return (
    <>
      <AdminPageHeader
        eyebrow="Campanhas e descontos"
        title="Cupons"
        description="Crie, visualize e ative/desative cupons que poderão ser usados pelos clientes no carrinho."
        icon={FaTicketAlt}
        actionLabel="Gestão de cupons"
      />

      <section className="mb-6 grid gap-4 md:grid-cols-3">
        <AdminStatCard
          title="Total"
          value={String(coupons.length)}
          description="Quantidade total de cupons criados."
          icon={FaTicketAlt}
        />

        <AdminStatCard
          title="Ativos"
          value={String(activeCoupons)}
          description="Cupons disponíveis para uso."
          icon={FaPercent}
        />

        <AdminStatCard
          title="Inativos"
          value={String(inactiveCoupons)}
          description="Cupons ocultos ou desativados."
          icon={FaTicketAlt}
        />
      </section>

      <section className="mb-6 rounded-3xl border border-purple-500/25 bg-black/35 p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl border border-purple-500/40 bg-purple-950/40 text-purple-200">
            <FaPlus />
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-purple-400">
              Novo cupom
            </p>
            <h2 className="text-2xl font-black uppercase">
              Criar cupom
            </h2>
          </div>
        </div>

        <form action={createCouponAction} className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <label className="grid gap-2">
            <span className="text-xs font-black uppercase text-zinc-400">Código</span>
            <input
              name="code"
              required
              placeholder="Ex: LGZ10"
              className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-xs font-black uppercase text-zinc-400">Tipo</span>
            <select
              name="discountType"
              className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300"
            >
              <option value="PERCENTAGE">Porcentagem</option>
              <option value="FIXED">Valor fixo</option>
            </select>
          </label>

          <label className="grid gap-2">
            <span className="text-xs font-black uppercase text-zinc-400">Desconto</span>
            <input
              name="discountValue"
              required
              placeholder="Ex: 10 ou 25,00"
              className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-xs font-black uppercase text-zinc-400">Máximo de usos</span>
            <input
              name="maxUses"
              type="number"
              min="0"
              placeholder="Opcional"
              className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300"
            />
          </label>

          <label className="grid gap-2 xl:col-span-2">
            <span className="text-xs font-black uppercase text-zinc-400">Descrição</span>
            <input
              name="description"
              placeholder="Descrição do cupom"
              className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-xs font-black uppercase text-zinc-400">Início</span>
            <input
              name="startsAt"
              type="date"
              className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-xs font-black uppercase text-zinc-400">Expira em</span>
            <input
              name="expiresAt"
              type="date"
              className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300"
            />
          </label>

          <button className="flex items-center justify-center gap-2 rounded-2xl border border-purple-400/50 bg-purple-700/30 px-5 py-3 text-sm font-black uppercase text-purple-100 transition hover:bg-purple-600/50 md:col-span-2 xl:col-span-4">
            <FaPlus />
            Criar cupom
          </button>
        </form>
      </section>

      <section className="overflow-hidden rounded-3xl border border-purple-500/25 bg-black/35">
        <div className="border-b border-purple-500/20 p-6">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">
            Cupons cadastrados
          </p>

          <h2 className="mt-2 text-2xl font-black uppercase">
            Lista de cupons
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[920px] border-collapse">
            <thead>
              <tr className="border-b border-purple-500/20 bg-purple-950/20 text-left text-xs uppercase tracking-[0.22em] text-zinc-500">
                <th className="px-6 py-4">Código</th>
                <th className="px-6 py-4">Descrição</th>
                <th className="px-6 py-4">Tipo</th>
                <th className="px-6 py-4">Valor</th>
                <th className="px-6 py-4">Usos</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Ação</th>
              </tr>
            </thead>

            <tbody>
              {coupons.map((coupon) => (
                <tr key={coupon.id} className="border-b border-purple-500/10 text-sm">
                  <td className="px-6 py-5 font-black text-purple-300">{coupon.code}</td>
                  <td className="px-6 py-5 text-zinc-400">{coupon.description || "-"}</td>
                  <td className="px-6 py-5 text-zinc-400">
                    {coupon.discountType === "FIXED" ? "Valor fixo" : "Porcentagem"}
                  </td>
                  <td className="px-6 py-5 font-bold text-white">
                    {coupon.discountType === "FIXED"
                      ? formatCurrencyBRL(coupon.discountValue)
                      : `${coupon.discountValue}%`}
                  </td>
                  <td className="px-6 py-5 text-zinc-400">
                    {coupon.usedCount}{coupon.maxUses ? `/${coupon.maxUses}` : ""}
                  </td>
                  <td className="px-6 py-5">
                    <span className={`rounded-full border px-3 py-1 text-xs font-black uppercase ${
                      coupon.active
                        ? "border-emerald-500/30 bg-emerald-950/20 text-emerald-300"
                        : "border-red-500/30 bg-red-950/20 text-red-300"
                    }`}>
                      {coupon.active ? "Ativo" : "Inativo"}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <form action={toggleCouponStatusAction}>
                      <input type="hidden" name="id" value={coupon.id} />
                      <input type="hidden" name="active" value={String(coupon.active)} />
                      <button className="rounded-xl border border-purple-500/30 px-4 py-2 text-xs font-black uppercase text-purple-200 transition hover:bg-purple-700/30">
                        {coupon.active ? "Desativar" : "Ativar"}
                      </button>
                    </form>
                  </td>
                </tr>
              ))}

              {coupons.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-zinc-400">
                    Nenhum cupom cadastrado ainda.
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