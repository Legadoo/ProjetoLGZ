import type { IconType } from "react-icons";
import {
  FaCrown,
  FaGamepad,
  FaHandshake,
  FaRocket,
  FaShieldAlt,
  FaUsers,
} from "react-icons/fa";
import { PublicFooter } from "@/components/public/PublicFooter";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicPageHero } from "@/components/public/PublicPageHero";

type AboutItem = {
  title: string;
  description: string;
  icon: IconType;
};

const aboutItems: AboutItem[] = [
  {
    title: "Identidade Legendaryz",
    description:
      "A Legendaryz nasceu para ser mais que um time. É uma organização, comunidade gamer e projeto digital com foco em e-sports, conteúdo, loja e conexão entre pessoas.",
    icon: FaCrown,
  },
  {
    title: "Comunidade gamer",
    description:
      "A LGZ valoriza jogadores, membros, influenciadores, staff e todos que fazem parte da caminhada da organização.",
    icon: FaUsers,
  },
  {
    title: "Competitividade",
    description:
      "A organização carrega uma postura competitiva, com foco em evolução, presença em jogos, calendário de partidas e construção de times.",
    icon: FaGamepad,
  },
  {
    title: "Confiança e gestão",
    description:
      "O projeto foi pensado como uma plataforma real, com administração interna, controle de conteúdo, produtos, pedidos, clientes e relatórios.",
    icon: FaShieldAlt,
  },
  {
    title: "Parcerias e influência",
    description:
      "Influenciadores, criadores e parceiros terão espaço próprio dentro da plataforma, com páginas individuais e presença oficial na marca.",
    icon: FaHandshake,
  },
  {
    title: "Visão de futuro",
    description:
      "A Legendaryz está sendo preparada para crescer como ecossistema digital, unindo loja, comunidade, LGZNetwork, eventos e oportunidades.",
    icon: FaRocket,
  },
];

export default function SobrePage() {
  return (
    <>
      <PublicHeader />

      <main>
        <PublicPageHero
          eyebrow="Sobre a organização"
          title="Sobre nós"
          description="Conheça a essência da Legendaryz: uma organização de e-sports, comunidade gamer e plataforma digital construída para crescer com identidade própria."
          icon={FaCrown}
        />

        <section className="lgz-container py-10">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {aboutItems.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="lgz-panel rounded-3xl p-6 transition hover:-translate-y-1 hover:border-purple-400"
                >
                  <div className="mb-5 grid h-16 w-16 place-items-center rounded-2xl border border-purple-500/40 bg-purple-950/40 text-3xl text-purple-200 shadow-[0_0_25px_rgba(176,38,255,0.16)]">
                    <Icon />
                  </div>

                  <h2 className="text-2xl font-black uppercase text-white">
                    {item.title}
                  </h2>

                  <p className="mt-3 text-sm leading-7 text-zinc-400">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="lgz-container pb-12">
          <div className="overflow-hidden rounded-[2rem] border border-purple-500/30 bg-[radial-gradient(circle_at_80%_20%,rgba(176,38,255,0.25),transparent_35%),linear-gradient(135deg,rgba(14,0,27,0.96),rgba(3,0,8,0.96))] p-8 shadow-[0_0_55px_rgba(126,34,206,0.14)] md:p-10">
            <p className="text-xs font-black uppercase tracking-[0.35em] text-purple-400">
              Seja lendário
            </p>

            <h2 className="mt-4 text-4xl font-black uppercase md:text-6xl">
              A LGZ é construída por pessoas
            </h2>

            <p className="mt-6 max-w-4xl text-lg leading-8 text-zinc-300">
              A Legendaryz representa esforço, visão, comunidade e presença.
              Cada jogador, cliente, influenciador, staff e membro ajuda a
              fortalecer a marca e transformar a LGZ em uma plataforma oficial,
              organizada e preparada para o futuro.
            </p>
          </div>
        </section>
      </main>

      <PublicFooter />
    </>
  );
}