import Link from "next/link";
import type { IconType } from "react-icons";
import {
  FaCalendarAlt,
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
    description: "Loja da E-sports. Produtos oficiais do nosso time.",
    href: "/loja",
    icon: FaShoppingCart,
  },
  {
    title: "LGZNetwork",
    description: "Loja do servidor do Minecraft. Ranks, itens e vantagens.",
    href: "/lgznetwork",
    icon: FaGamepad,
  },
  {
    title: "Calendário",
    description: "Próximos jogos e batalhas da Legendaryz.",
    href: "/calendario",
    icon: FaCalendarAlt,
  },
  {
    title: "Times",
    description: "Área de apresentação dos jogadores.",
    href: "/times",
    icon: FaUsers,
  },
  {
    title: "Influenciadores",
    description: "Conheça nossos criadores de conteúdo.",
    href: "/influenciadores",
    icon: FaMicrophoneAlt,
  },
  {
    title: "Staff",
    description: "Equipe que faz a Legendaryz acontecer.",
    href: "/staff",
    icon: FaShieldAlt,
  },
  {
    title: "Sobre nós",
    description: "Nosso propósito, história e conquistas.",
    href: "/sobre",
    icon: FaInfoCircle,
  },
  {
    title: "Cadastro",
    description: "Crie sua conta e faça parte da família LGZ.",
    href: "/cadastro",
    icon: FaUserPlus,
    featured: true,
  },
];

export function CategoryGrid() {
  return (
    <section className="lgz-container grid grid-cols-1 gap-4 py-6 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <Link
            key={card.href}
            href={card.href}
            className={`lgz-panel group rounded-2xl p-6 transition hover:-translate-y-1 hover:border-purple-400 ${
              card.featured ? "sm:col-span-2" : ""
            }`}
          >
            <div className="mb-6 grid h-16 w-16 place-items-center rounded-2xl border border-purple-500/40 bg-purple-950/40 text-3xl text-purple-200 shadow-[0_0_22px_rgba(176,38,255,0.35)] transition group-hover:scale-105 group-hover:bg-purple-700/40">
              <Icon />
            </div>

            <h3 className="mb-2 text-2xl font-black uppercase text-purple-300">
              {card.title}
            </h3>

            <p className="min-h-14 text-sm leading-6 text-zinc-300">
              {card.description}
            </p>

            <span className="mt-6 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-purple-500/50 text-xl text-purple-300 transition group-hover:bg-purple-600 group-hover:text-white">
              →
            </span>
          </Link>
        );
      })}
    </section>
  );
}