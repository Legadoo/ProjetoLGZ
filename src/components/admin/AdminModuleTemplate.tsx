import {
  FaBoxOpen,
  FaCalendarAlt,
  FaCog,
  FaImage,
  FaPercent,
  FaShoppingBag,
  FaStar,
  FaTrophy,
  FaUserShield,
  FaUsers,
  FaUsersCog,
} from "react-icons/fa";
import type { IconType } from "react-icons";
import { AdminPageHeader } from "./AdminPageHeader";
import { AdminStatCard } from "./AdminStatCard";
import { AdminTableMock } from "./AdminTableMock";

type AdminModuleTemplateProps = {
  moduleKey: string;
  title: string;
  description: string;
  actionLabel: string;
};

const iconMap: Record<string, IconType> = {
  produtos: FaBoxOpen,
  pedidos: FaShoppingBag,
  clientes: FaUsers,
  cupons: FaPercent,
  times: FaTrophy,
  jogadores: FaUsersCog,
  influenciadores: FaStar,
  staff: FaUserShield,
  calendario: FaCalendarAlt,
  banners: FaImage,
  configuracoes: FaCog,
  usuarios: FaUsersCog,
};

export function AdminModuleTemplate({
  moduleKey,
  title,
  description,
  actionLabel,
}: AdminModuleTemplateProps) {
  const Icon = iconMap[moduleKey] || FaCog;

  const rows = [
    {
      name: `${title} exemplo 01`,
      type: "Registro base",
      status: "Ativo",
      updatedAt: "Hoje",
    },
    {
      name: `${title} exemplo 02`,
      type: "Preparado para CRUD",
      status: "Ativo",
      updatedAt: "Hoje",
    },
    {
      name: `${title} exemplo 03`,
      type: "Mock visual",
      status: "Ativo",
      updatedAt: "Hoje",
    },
  ];

  return (
    <>
      <AdminPageHeader
        eyebrow="Módulo administrativo"
        title={title}
        description={description}
        icon={Icon}
        actionLabel={actionLabel}
      />

      <section className="mb-6 grid gap-4 md:grid-cols-3">
        <AdminStatCard
          title="Registros"
          value="0"
          description="Dados reais serão conectados ao Prisma nas próximas fases."
          icon={Icon}
        />

        <AdminStatCard
          title="Ativos"
          value="0"
          description="Base preparada para controle de status ativo e inativo."
          icon={Icon}
        />

        <AdminStatCard
          title="Pendências"
          value="0"
          description="Área reservada para alertas, revisões e ações administrativas."
          icon={Icon}
        />
      </section>

      <section className="mb-6 grid gap-4 lg:grid-cols-[1fr_360px]">
        <div className="rounded-3xl border border-purple-500/25 bg-black/35 p-6">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">
            Estrutura do módulo
          </p>

          <h2 className="mt-2 text-2xl font-black uppercase">
            Preparado para gestão real
          </h2>

          <p className="mt-3 text-sm leading-7 text-zinc-400">
            Esta página já possui a estrutura visual base para listagem, filtros,
            busca, criação, edição, ativação e desativação de registros. Na fase
            de CRUD, os dados serão conectados ao banco SQLite via Prisma.
          </p>
        </div>

        <div className="rounded-3xl border border-purple-500/25 bg-[radial-gradient(circle_at_80%_20%,rgba(176,38,255,0.20),transparent_35%),linear-gradient(135deg,rgba(16,4,27,0.96),rgba(4,0,8,0.96))] p-6">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">
            Próxima evolução
          </p>

          <h2 className="mt-2 text-2xl font-black uppercase">
            CRUD do módulo
          </h2>

          <p className="mt-3 text-sm leading-7 text-zinc-400">
            O próximo passo será transformar esta tela em uma gestão funcional,
            com formulário, banco de dados, validação e ações reais.
          </p>
        </div>
      </section>

      <AdminTableMock
        title={`Últimos registros de ${title}`}
        description="Tabela visual temporária para simular a futura listagem administrativa."
        rows={rows}
      />
    </>
  );
}