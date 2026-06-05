import { PublicFooter } from "@/components/public/PublicFooter";
import { PublicHeader } from "@/components/public/PublicHeader";

export default function LgzNetworkPage() {
  return (
    <>
      <PublicHeader />
      <main className="lgz-container py-10">
        <section className="lgz-panel rounded-3xl p-8 md:p-12">
          <p className="text-sm font-black uppercase tracking-widest text-purple-400">Servidor Minecraft</p>
          <h1 className="mt-3 text-5xl font-black uppercase">LGZNetwork</h1>
          <p className="mt-4 max-w-3xl text-zinc-300">
            Base preparada para loja do servidor, ranks, itens, vantagens e produtos digitais.
          </p>
        </section>
      </main>
      <PublicFooter />
    </>
  );
}
