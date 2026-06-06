import Link from "next/link";
import { FaGift, FaTicketAlt, FaUserPlus } from "react-icons/fa";
import { PublicFooter } from "@/components/public/PublicFooter";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicPageHero } from "@/components/public/PublicPageHero";

export default function CadastroPage() {
  return (
    <>
      <PublicHeader />
      <main>
        <PublicPageHero
          eyebrow="Área do cliente"
          title="Cadastro"
          description="Crie sua conta futuramente para acompanhar pedidos, receber cupons, acessar vantagens e participar dos benefícios da comunidade LGZ."
          icon={FaUserPlus}
        />

        <section className="lgz-container grid gap-4 py-10 md:grid-cols-3">
          <article className="lgz-panel rounded-3xl p-6">
            <FaGift className="mb-5 text-4xl text-purple-300" />
            <h2 className="text-2xl font-black uppercase">Vantagens</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-400">Benefícios futuros para clientes cadastrados.</p>
          </article>

          <article className="lgz-panel rounded-3xl p-6">
            <FaTicketAlt className="mb-5 text-4xl text-purple-300" />
            <h2 className="text-2xl font-black uppercase">Cupons</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-400">Cupons e campanhas especiais da Legendaryz.</p>
          </article>

          <article className="lgz-panel rounded-3xl p-6">
            <FaUserPlus className="mb-5 text-4xl text-purple-300" />
            <h2 className="text-2xl font-black uppercase">Conta LGZ</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-400">Base preparada para cadastro real nas próximas fases.</p>
          </article>
        </section>

        <section className="lgz-container pb-10">
          <div className="lgz-panel rounded-3xl p-8 text-center">
            <h2 className="text-3xl font-black uppercase">Já tem uma conta?</h2>
            <p className="mt-3 text-zinc-400">Use o login único para entrar como cliente ou admin.</p>
            <Link href="/login" className="lgz-button mt-6">Ir para login</Link>
          </div>
        </section>
      </main>
      <PublicFooter />
    </>
  );
}