import { requireAdminUser } from "@/lib/session";

export default async function AdminModulePage() {
  await requireAdminUser();

  return (
    <section className="lgz-panel rounded-3xl p-8">
      <p className="text-sm font-black uppercase tracking-widest text-purple-400">
        Módulo administrativo
      </p>

      <h1 className="mt-3 text-4xl font-black uppercase">Banners</h1>

      <p className="mt-4 max-w-3xl text-zinc-300">
        Página base criada para evolução futura do módulo Banners.
      </p>
    </section>
  );
}