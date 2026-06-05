import { PublicFooter } from "@/components/public/PublicFooter";
import { PublicHeader } from "@/components/public/PublicHeader";

export default function CadastroPage() {
  return (
    <>
      <PublicHeader />
      <main className="lgz-container py-10">
        <section className="mx-auto max-w-2xl rounded-3xl border border-purple-500/30 bg-black/50 p-8">
          <p className="text-sm font-black uppercase tracking-widest text-purple-400">Área do cliente</p>
          <h1 className="mt-3 text-4xl font-black uppercase">Cadastro</h1>
          <p className="mt-4 text-zinc-300">
            Tela base para futuro cadastro de clientes, vantagens, cupons e pedidos.
          </p>
        </section>
      </main>
      <PublicFooter />
    </>
  );
}
