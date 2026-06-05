import { PublicFooter } from "@/components/public/PublicFooter";
import { PublicHeader } from "@/components/public/PublicHeader";

export default function SobrePage() {
  return (
    <>
      <PublicHeader />
      <main className="lgz-container py-10">
        <section className="lgz-panel rounded-3xl p-8 md:p-12">
          <p className="text-sm font-black uppercase tracking-widest text-purple-400">Sobre a organização</p>
          <h1 className="mt-3 text-5xl font-black uppercase">Sobre nós</h1>
          <p className="mt-4 max-w-3xl text-zinc-300">
            A Legendaryz é uma organização de e-sports, comunidade gamer e projeto digital criado para conectar jogadores,
            criadores, staff, loja, eventos e comunidade em uma única plataforma.
          </p>
        </section>
      </main>
      <PublicFooter />
    </>
  );
}
