import Link from "next/link";
import type { IconType } from "react-icons";
import {
  FaCalendarAlt,
  FaChevronRight,
  FaGamepad,
  FaInfoCircle,
  FaMicrophoneAlt,
  FaShieldAlt,
  FaShoppingCart,
  FaUserPlus,
  FaUsers,
} from "react-icons/fa";

type CategoryCard = {
  title: string;
  description: string;
  href: string;
  icon: IconType;
  featured?: boolean;
};

const cards: CategoryCard[] = [
  {
    title: "Loja",
    description: "Loja da E-sports. Produtos oficiais, drops e itens da Legendaryz.",
    href: "/loja",
    icon: FaShoppingCart,
  },
  {
    title: "LGZNetwork",
    description: "Área do servidor Minecraft, ranks, vantagens e itens digitais.",
    href: "/lgznetwork",
    icon: FaGamepad,
  },
  {
    title: "Calendário",
    description: "Próximos jogos, confrontos, horários e transmissões.",
    href: "/calendario",
    icon: FaCalendarAlt,
  },
  {
    title: "Times",
    description: "Elencos, jogadores, modalidades e identidade competitiva.",
    href: "/times",
    icon: FaUsers,
  },
  {
    title: "Influenciadores",
    description: "Criadores de conteúdo que representam o universo LGZ.",
    href: "/influenciadores",
    icon: FaMicrophoneAlt,
    featured: true,
  },
  {
    title: "Staff",
    description: "Equipe responsável por operação, eventos e comunidade.",
    href: "/staff",
    icon: FaShieldAlt,
  },
  {
    title: "Sobre nós",
    description: "História, missão e visão da Legendaryz.",
    href: "/sobre",
    icon: FaInfoCircle,
  },
  {
    title: "Cadastro",
    description: "Crie sua conta para benefícios, cupons e área do cliente.",
    href: "/cadastro",
    icon: FaUserPlus,
  },
];

export function CategoryGrid() {
  return (
    <section className="lgz-container py-10">
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">
            Explore a plataforma
          </p>
          <h2 className="mt-3 text-4xl font-black uppercase md:text-5xl">
            Áreas da Legendaryz
          </h2>
        </div>

        <p className="max-w-xl text-sm leading-6 text-zinc-400">
          A base pública da LGZ será o ponto central para loja, comunidade, times,
          influenciadores, staff e calendário.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <Link
              key={card.href}
              href={card.href}
              className={`lgz-panel group relative overflow-hidden rounded-3xl p-6 transition hover:-translate-y-1 hover:border-purple-400 ${
                card.featured ? "xl:col-span-2" : ""
              }`}
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-purple-600/10 blur-2xl transition group-hover:bg-purple-500/25" />

              <div className="relative mb-6 grid h-16 w-16 place-items-center rounded-2xl border border-purple-500/40 bg-purple-950/40 text-3xl text-purple-200 shadow-[0_0_22px_rgba(176,38,255,0.35)] transition group-hover:scale-105 group-hover:bg-purple-700/40">
                <Icon />
              </div>

              <h3 className="relative mb-3 text-2xl font-black uppercase text-purple-200">
                {card.title}
              </h3>

              <p className="relative min-h-16 text-sm leading-6 text-zinc-300">
                {card.description}
              </p>

              <span className="relative mt-6 inline-flex items-center gap-2 rounded-xl border border-purple-500/50 px-4 py-3 text-sm font-black uppercase text-purple-200 transition group-hover:bg-purple-600 group-hover:text-white">
                Acessar <FaChevronRight />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}