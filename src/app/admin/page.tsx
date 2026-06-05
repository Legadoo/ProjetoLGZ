import Link from "next/link";
import { requireAdminUser } from "@/lib/session";

export default async function AdminPage() {
  await requireAdminUser();

  return (
    <section className="lgz-panel rounded-3xl p-8">
      <p className="text-sm font-black uppercase tracking-widest text-purple-400">
        Painel administrativo
      </p>

      <h1 className="mt-3 text-4xl font-black uppercase">
        Admin Legendaryz
      </h1>

      <p className="mt-4 max-w-3xl text-zinc-300">
        Base inicial do painel interno. Nas próximas fases, esta área terá autenticação,
        CRUDs, dashboard, gestão de produtos, pedidos, clientes, influenciadores, staff,
        calendário e banners.
      </p>

      <Link href="/admin/dashboard" className="lgz-button mt-8">
        Abrir dashboard →
      </Link>
    </section>
  );
}