import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { requireAdminUser } from "@/lib/session";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await requireAdminUser();

  return (
    <main className="min-h-screen bg-[#050008] text-white">
      <AdminSidebar adminName={admin.name} adminRole={admin.role} />

      <section className="min-h-screen lg:pl-[304px]">
        <div className="min-h-screen bg-[radial-gradient(circle_at_80%_0%,rgba(176,38,255,0.18),transparent_35%),linear-gradient(180deg,rgba(10,0,18,0.96),rgba(3,0,8,1))]">
          <div className="border-b border-purple-500/20 bg-black/30 px-5 py-5 backdrop-blur-xl md:px-8">
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.35em] text-purple-400">
                  Legendaryz Management
                </p>

                <h1 className="mt-2 text-2xl font-black uppercase md:text-3xl">
                  Painel Administrativo
                </h1>
              </div>

              <p className="text-sm text-zinc-400">
                A barra lateral permanece fixa. O conteúdo muda nesta área central.
              </p>
            </div>
          </div>

          <div className="px-5 py-6 md:px-8 md:py-8">
            {children}
          </div>
        </div>
      </section>
    </main>
  );
}