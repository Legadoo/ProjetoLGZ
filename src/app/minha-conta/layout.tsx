import Link from "next/link";
import {
  FaGift,
  FaHome,
  FaShoppingBag,
  FaSignOutAlt,
  FaTicketAlt,
  FaUser,
} from "react-icons/fa";
import { logoutCustomerAction } from "@/actions/auth.actions";
import { requireCustomer } from "@/lib/session";

const customerNavItems = [
  {
    href: "/minha-conta",
    label: "Resumo",
    icon: FaHome,
  },
  {
    href: "/minha-conta/pedidos",
    label: "Pedidos",
    icon: FaShoppingBag,
  },
  {
    href: "/minha-conta/cupons",
    label: "Cupons",
    icon: FaTicketAlt,
  },
  {
    href: "/minha-conta/vantagens",
    label: "Vantagens",
    icon: FaGift,
  },
  {
    href: "/minha-conta/dados",
    label: "Meus dados",
    icon: FaUser,
  },
];

export default async function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const customer = await requireCustomer();

  return (
    <main className="min-h-screen bg-[#050008] text-white">
      <header className="border-b border-purple-500/30 bg-black/75 backdrop-blur-xl">
        <div className="lgz-container flex min-h-24 flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
          <Link href="/" className="group flex items-center gap-3">
            <div className="grid h-14 w-14 place-items-center rounded-2xl border border-purple-500/50 bg-purple-950/40 text-xl font-black text-purple-100 shadow-[0_0_28px_rgba(176,38,255,0.28)]">
              LGZ
            </div>

            <div>
              <strong className="block text-xl font-black uppercase tracking-wider">
                Minha conta
              </strong>
              <span className="text-xs font-bold uppercase tracking-[0.28em] text-purple-300">
                Área do cliente
              </span>
            </div>
          </Link>

          <nav className="flex flex-wrap gap-3">
            {customerNavItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex items-center gap-2 rounded-2xl border border-purple-500/30 bg-purple-950/20 px-4 py-3 text-xs font-black uppercase text-purple-100 transition hover:bg-purple-800/30"
                >
                  <Icon />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <form action={logoutCustomerAction}>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-red-500/40 bg-red-950/20 px-4 py-3 text-xs font-black uppercase text-red-200 transition hover:bg-red-900/40"
            >
              <FaSignOutAlt />
              Sair
            </button>
          </form>
        </div>
      </header>

      <section className="lgz-container py-8">
        <div className="mb-6 rounded-3xl border border-purple-500/30 bg-[radial-gradient(circle_at_90%_20%,rgba(176,38,255,0.18),transparent_35%),linear-gradient(135deg,rgba(16,4,27,0.92),rgba(4,0,8,0.92))] p-6">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">
            Cliente logado
          </p>

          <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-black uppercase text-purple-100">
                {customer.name}
              </h1>

              <p className="mt-1 text-sm text-zinc-400">
                {customer.email}
              </p>
            </div>

            <Link
              href="/"
              className="rounded-2xl border border-purple-500/40 px-5 py-3 text-sm font-black uppercase text-purple-200 transition hover:bg-purple-950/40"
            >
              Voltar ao site
            </Link>
          </div>
        </div>

        {children}
      </section>
    </main>
  );
}