import Link from "next/link";
import { logoutAdminAction } from "@/actions/auth.actions";
import { getCurrentAdminUser } from "@/lib/session";

const adminItems = [
  ["Dashboard", "/admin/dashboard"],
  ["Produtos", "/admin/produtos"],
  ["Pedidos", "/admin/pedidos"],
  ["Clientes", "/admin/clientes"],
  ["Cupons", "/admin/cupons"],
  ["Times", "/admin/times"],
  ["Jogadores", "/admin/jogadores"],
  ["Influenciadores", "/admin/influenciadores"],
  ["Staff", "/admin/staff"],
  ["Calendário", "/admin/calendario"],
  ["Banners", "/admin/banners"],
  ["Configurações", "/admin/configuracoes"],
  ["Usuários", "/admin/usuarios"],
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getCurrentAdminUser();

  return (
    <main className="min-h-screen bg-[#050008] text-white">
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="border-r border-purple-500/30 bg-black/70 p-5">
          <div className="mb-6 rounded-2xl border border-purple-500/40 bg-purple-950/30 p-5">
            <strong className="block text-2xl uppercase">LGZ Admin</strong>
            <span className="text-sm text-purple-300">Painel interno</span>

            {admin && (
              <div className="mt-4 rounded-xl border border-purple-500/30 bg-black/30 p-3">
                <p className="text-sm font-black uppercase text-white">{admin.name}</p>
                <p className="text-xs uppercase text-purple-300">{admin.role}</p>
              </div>
            )}
          </div>

          <nav className="grid gap-2">
            {adminItems.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="rounded-xl border border-transparent px-4 py-3 text-sm font-bold uppercase text-zinc-300 transition hover:border-purple-500/40 hover:bg-purple-950/30 hover:text-white"
              >
                {label}
              </Link>
            ))}
          </nav>

          {admin && (
            <form action={logoutAdminAction} className="mt-6">
              <button
                type="submit"
                className="w-full rounded-xl border border-red-500/40 bg-red-950/20 px-4 py-3 text-sm font-black uppercase text-red-200 transition hover:bg-red-900/40"
              >
                Sair do admin
              </button>
            </form>
          )}
        </aside>

        <section className="p-5 md:p-8">{children}</section>
      </div>
    </main>
  );
}