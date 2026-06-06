import { FaCrown, FaFire, FaInfoCircle, FaShieldAlt } from "react-icons/fa";
import { PublicFooter } from "@/components/public/PublicFooter";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicPageHero } from "@/components/public/PublicPageHero";

const values = [
  ["Honra", "Respeito pela comunidade, pelos jogadores e pela história da organização.", FaShieldAlt],
  ["Foco", "Construção contínua, planejamento e evolução digital.", FaFire],
  ["Legado", "A Legendaryz nasceu para ser lembrada e crescer com sua comunidade.", FaCrown],
];

export default function SobrePage() {
  return (
    <>
      <PublicHeader />
      <main>
        <PublicPageHero
          eyebrow="Sobre a organização"
          title="Sobre nós"
          description="A Legendaryz é uma organização de e-sports, comunidade gamer e projeto digital criado para conectar jogadores, criadores, staff, loja, eventos e comunidade em uma única plataforma."
          icon={FaInfoCircle}
        />

        <section className="lgz-container grid gap-4 py-10 md:grid-cols-3">
          {values.map(([title, description, Icon]) => (
            <article key={String(title)} className="lgz-panel rounded-3xl p-6">
              <div className="mb-5 grid h-16 w-16 place-items-center rounded-2xl border border-purple-500/40 bg-purple-950/40 text-3xl text-purple-200">
                <Icon />
              </div>
              <h2 className="text-2xl font-black uppercase">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-zinc-400">{description}</p>
            </article>
          ))}
        </section>
      </main>
      <PublicFooter />
    </>
  );
}