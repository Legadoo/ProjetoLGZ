import { FaUserEdit } from "react-icons/fa";
import { updateCustomerProfileAction } from "@/actions/customer.actions";
import { CustomerPageHeader } from "@/components/customer/CustomerPageHeader";
import { requireCustomer } from "@/lib/session";

export default async function CustomerDadosPage() {
  const customer = await requireCustomer();

  return (
    <>
      <CustomerPageHeader
        eyebrow="Perfil"
        title="Meus dados"
        description="Atualize suas informações básicas de cliente. Alteração de senha será implementada em fase futura."
        icon={FaUserEdit}
      />

      <section className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <form action={updateCustomerProfileAction} className="rounded-3xl border border-purple-500/25 bg-black/35 p-6">
          <div className="grid gap-4">
            <label className="grid gap-2">
              <span className="text-xs font-black uppercase text-zinc-400">
                Nome
              </span>

              <input
                name="name"
                required
                defaultValue={customer.name}
                className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-xs font-black uppercase text-zinc-400">
                E-mail
              </span>

              <input
                value={customer.email}
                disabled
                className="h-12 cursor-not-allowed rounded-xl border border-purple-500/25 bg-black/20 px-4 text-zinc-500 outline-none"
              />

              <span className="text-xs text-zinc-500">
                O e-mail de login não será alterado nesta fase.
              </span>
            </label>

            <label className="grid gap-2">
              <span className="text-xs font-black uppercase text-zinc-400">
                Telefone
              </span>

              <input
                name="phone"
                defaultValue={customer.phone || ""}
                placeholder="Ex: (21) 99999-9999"
                className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-xs font-black uppercase text-zinc-400">
                CPF/documento
              </span>

              <input
                name="document"
                defaultValue={customer.document || ""}
                placeholder="Opcional"
                className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300"
              />
            </label>
          </div>

          <button className="mt-6 w-full rounded-2xl border border-purple-400/50 bg-purple-700/30 px-5 py-4 text-sm font-black uppercase text-purple-100 transition hover:bg-purple-600/50">
            Salvar dados
          </button>
        </form>

        <aside className="h-fit rounded-3xl border border-purple-500/25 bg-[radial-gradient(circle_at_80%_20%,rgba(176,38,255,0.18),transparent_35%),linear-gradient(135deg,rgba(16,4,27,0.96),rgba(4,0,8,0.96))] p-6">
          <h2 className="text-2xl font-black uppercase">
            Conta LGZ
          </h2>

          <p className="mt-3 text-sm leading-7 text-zinc-400">
            Estes dados serão usados futuramente para pedidos, benefícios,
            campanhas, comunicação e vantagens da comunidade Legendaryz.
          </p>

          <div className="mt-6 grid gap-3 text-sm">
            <div className="rounded-2xl border border-purple-500/20 bg-black/30 p-4">
              <p className="text-zinc-500">Status</p>
              <strong className="text-emerald-300">Ativo</strong>
            </div>

            <div className="rounded-2xl border border-purple-500/20 bg-black/30 p-4">
              <p className="text-zinc-500">Tipo de conta</p>
              <strong className="text-purple-300">Cliente</strong>
            </div>
          </div>
        </aside>
      </section>
    </>
  );
}