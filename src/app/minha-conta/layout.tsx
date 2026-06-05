import Link from "next/link";
import { logoutCustomerAction } from "@/actions/auth.actions";
import { getCurrentCustomer } from "@/lib/session";

export default async function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const customer = await getCurrentCustomer();

  return (
    <main className="min-h-screen bg-[#050008] text-white">
      <header className="border-b border-purple-500/30 bg-black/70">
        <div className="lgz-container flex min-h-20 flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="text-2xl font-black uppercase">
            Legendaryz
          </Link>

          <nav className="flex flex-wrap gap-4 text-sm text-zinc-300">
            <Link href="/minha-conta">Conta</Link>
            <Link href="/minha-conta/pedidos">Pedidos</Link>
            <Link href="/minha-conta/cupons">Cupons</Link>
            <Link href="/minha-conta/vantagens">Vantagens</Link>
            <Link href="/minha-conta/dados">Dados</Link>
          </nav>

          {customer && (
            <form action={logoutCustomerAction}>
              <button
                type="submit"
                className="rounded-xl border border-red-500/40 px-4 py-2 text-xs font-black uppercase text-red-200 transition hover:bg-red-950/30"
              >
                Sair
              </button>
            </form>
          )}
        </div>
      </header>

      <section className="lgz-container py-8">
        {customer && (
          <div className="mb-6 rounded-2xl border border-purple-500/30 bg-purple-950/20 p-4">
            <p className="text-sm uppercase text-zinc-400">Cliente logado</p>
            <h1 className="text-2xl font-black uppercase text-purple-200">{customer.name}</h1>
          </div>
        )}

        {children}
      </section>
    </main>
  );
}