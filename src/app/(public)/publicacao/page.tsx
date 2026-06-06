import {
  FaCheckCircle,
  FaDatabase,
  FaRocket,
  FaServer,
  FaShieldAlt,
} from "react-icons/fa";
import { PublicFooter } from "@/components/public/PublicFooter";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicPageHero } from "@/components/public/PublicPageHero";

const items = [
  {
    title: "Next.js configurado",
    description: "Projeto preparado com App Router, TypeScript, TailwindCSS e estrutura pública/admin/cliente.",
    icon: FaRocket,
  },
  {
    title: "SQLite com Prisma",
    description: "Banco local estruturado para produtos, clientes, pedidos, influenciadores, staff, calendário e configurações.",
    icon: FaDatabase,
  },
  {
    title: "Admin protegido",
    description: "Área administrativa separada dos clientes, com painel, CRUD, relatórios e operação de pedidos.",
    icon: FaShieldAlt,
  },
  {
    title: "Publicação preparada",
    description: "Scripts de produção, sitemap, robots, manifest, loading, 404 e checklist de deploy preparados.",
    icon: FaServer,
  },
];

export default function PublicacaoPage() {
  return (
    <>
      <PublicHeader />

      <main>
        <PublicPageHero
          eyebrow="Status técnico"
          title="Publicação"
          description="Página de conferência técnica do ProjetoLGZ antes da publicação final em ambiente de produção."
          icon={FaRocket}
        />

        <section className="lgz-container grid gap-5 py-10 md:grid-cols-2">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="lgz-panel rounded-3xl p-6 transition hover:-translate-y-1 hover:border-purple-400"
              >
                <div className="mb-5 grid h-16 w-16 place-items-center rounded-2xl border border-purple-500/40 bg-purple-950/40 text-3xl text-purple-200">
                  <Icon />
                </div>

                <h2 className="text-2xl font-black uppercase">
                  {item.title}
                </h2>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  {item.description}
                </p>

                <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/20 px-4 py-2 text-xs font-black uppercase text-emerald-300">
                  <FaCheckCircle />
                  Preparado
                </div>
              </article>
            );
          })}
        </section>
      </main>

      <PublicFooter />
    </>
  );
}