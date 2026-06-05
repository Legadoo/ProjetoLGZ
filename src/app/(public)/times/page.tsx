import { PublicFooter } from "@/components/public/PublicFooter";
import { PublicHeader } from "@/components/public/PublicHeader";

export default function TimesPage() {
  return (
    <>
      <PublicHeader />
      <main className="lgz-container py-10">
        <section className="lgz-panel rounded-3xl p-8 md:p-12">
          <p className="text-sm font-black uppercase tracking-widest text-purple-400">Elencos LGZ</p>
          <h1 className="mt-3 text-5xl font-black uppercase">Times</h1>
          <p className="mt-4 max-w-3xl text-zinc-300">
            Base preparada para apresentar times e jogadores, independente do jogo competitivo.
          </p>
        </section>
      </main>
      <PublicFooter />
    </>
  );
}
