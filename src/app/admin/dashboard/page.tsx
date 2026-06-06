import {
  FaBoxOpen,
  FaCalendarAlt,
  FaChartLine,
  FaCog,
  FaImage,
  FaPercent,
  FaShoppingBag,
  FaStar,
  FaTrophy,
  FaUsers,
} from "react-icons/fa";
import { AdminModuleCard } from "@/components/admin/AdminModuleCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminStatCard } from "@/components/admin/AdminStatCard";
import { AdminTableMock } from "@/components/admin/AdminTableMock";
import { requireAdminUser } from "@/lib/session";

const modules = [
  {
    title: "Produtos",
    description: "Gerencie produtos da loja e da LGZNetwork.",
    href: "/admin/produtos",
    icon: FaBoxOpen,
  },
  {
    title: "Pedidos",
    description: "Acompanhe pedidos, status e histórico de compras.",
    href: "/admin/pedidos",
    icon: FaShoppingBag,
  },
  {
    title: "Clientes",
    description: "Gerencie clientes cadastrados, vantagens e dados.",
    href: "/admin/clientes",
    icon: FaUsers,
  },
  {
    title: "Influenciadores",
    description: "Controle perfis, bios, slugs, redes e destaques.",
    href: "/admin/influenciadores",
    icon: FaStar,
  },
  {
    title: "Calendário",
    description: "Cadastre jogos, eventos, adversários e transmissões.",
    href: "/admin/calendario",
    icon: FaCalendarAlt,
  },
  {
    title: "Banners",
    description: "Gerencie artes, chamadas e seções públicas.",
    href: "/admin/banners",
    icon: FaImage,
  },
];

const rows = [
  {
    name: "Base pública criada",
    type: "Sistema",
    status: "Ativo",
    updatedAt: "Hoje",
  },
  {
    name: "Login único aplicado",
    type: "Autenticação",
    status: "Ativo",
    updatedAt: "Hoje",
  },
  {
    name: "Sidebar admin fixa",
    type: "Interface",
    status: "Ativo",
    updatedAt: "Hoje",
  },
];

export default async function AdminDashboardPage() {
  const admin = await requireAdminUser();

  return (
    <>
      <AdminPageHeader
        eyebrow="Dashboard geral"
        title={`Bem-vindo, ${admin.name}`}
        description="Visão administrativa da plataforma Legendaryz. Aqui ficarão os indicadores principais de loja, clientes, influenciadores, pedidos, times, calendário e configurações."
        icon={FaChartLine}
        actionLabel="Atualizar visão"
      />

      <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard
          title="Produtos"
          value="0"
          description="Produtos cadastrados na loja e LGZNetwork."
          icon={FaBoxOpen}
        />

        <AdminStatCard
          title="Pedidos"
          value="0"
          description="Pedidos futuros da plataforma."
          icon={FaShoppingBag}
        />

        <AdminStatCard
          title="Clientes"
          value="1"
          description="Clientes cadastrados para testes."
          icon={FaUsers}
        />

        <AdminStatCard
          title="Cupons"
          value="0"
          description="Campanhas e descontos futuros."
          icon={FaPercent}
        />
      </section>

      <section className="mb-6 grid gap-4 lg:grid-cols-[1fr_380px]">
        <div className="rounded-3xl border border-purple-500/25 bg-black/35 p-6">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">
            Módulos principais
          </p>

          <h2 className="mt-2 text-2xl font-black uppercase">
            Gestão da Legendaryz
          </h2>

          <p className="mt-3 text-sm leading-7 text-zinc-400">
            O painel está estruturado como um sistema administrativo real.
            Cada módulo terá, nas próximas fases, listagem, cadastro, edição,
            exclusão lógica, filtros e integração com Prisma.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {modules.map((module) => (
              <AdminModuleCard key={module.href} {...module} />
            ))}
          </div>
        </div>

        <aside className="grid gap-4">
          <div className="rounded-3xl border border-purple-500/25 bg-[radial-gradient(circle_at_80%_20%,rgba(176,38,255,0.22),transparent_35%),linear-gradient(135deg,rgba(16,4,27,0.96),rgba(4,0,8,0.96))] p-6">
            <FaTrophy className="mb-5 text-4xl text-purple-300" />

            <h2 className="text-2xl font-black uppercase">
              Legendaryz OS
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Painel central para operação da organização: loja, comunidade,
              influenciadores, times, calendário e administração.
            </p>
          </div>

          <div className="rounded-3xl border border-purple-500/25 bg-black/35 p-6">
            <FaCog className="mb-5 text-4xl text-purple-300" />

            <h2 className="text-2xl font-black uppercase">
              Próximas fases
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              A próxima etapa será transformar os módulos em CRUDs reais,
              começando pelos conteúdos principais da plataforma.
            </p>
          </div>
        </aside>
      </section>

      <AdminTableMock
        title="Atividades recentes"
        description="Resumo visual temporário das últimas movimentações do sistema."
        rows={rows}
      />
    </>
  );
}