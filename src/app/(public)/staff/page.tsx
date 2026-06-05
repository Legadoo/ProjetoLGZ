import { PublicFooter } from "@/components/public/PublicFooter";
import { PublicHeader } from "@/components/public/PublicHeader";

export default function StaffPage() {
  return (
    <>
      <PublicHeader />
      <main className="lgz-container py-10">
        <section className="lgz-panel rounded-3xl p-8 md:p-12">
          <p className="text-sm font-black uppercase tracking-widest text-purple-400">Equipe interna</p>
          <h1 className="mt-3 text-5xl font-black uppercase">Staff</h1>
          <p className="mt-4 max-w-3xl text-zinc-300">
            Estrutura inicial para apresentar a equipe que organiza, gerencia e faz a Legendaryz acontecer.
          </p>
        </section>
      </main>
      <PublicFooter />
    </>
  );
}
