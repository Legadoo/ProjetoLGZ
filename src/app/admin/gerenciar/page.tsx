import { FaTools } from "react-icons/fa";
import { AdminCrudManager } from "@/components/admin/AdminCrudManager";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { requireAdminUser } from "@/lib/session";
import { getAdminCrudOverview } from "@/services/crud.service";
import { formatCurrencyBRL } from "@/services/product.service";

export default async function AdminGerenciarPage() {
  await requireAdminUser();

  const data = await getAdminCrudOverview();

  const sections = [
    {
      key: "products",
      label: "Produtos",
      model: "product",
      iconName: "products",
      items: data.products.map((item) => ({
        id: item.id,
        title: item.name,
        subtitle: `${item.category?.name || "Sem categoria"} — ${formatCurrencyBRL(item.price)} — /${item.slug}`,
        status: item.active ? "Ativo" : "Inativo",
      })),
    },
    {
      key: "categories",
      label: "Categorias",
      model: "category",
      iconName: "categories",
      items: data.categories.map((item) => ({
        id: item.id,
        title: item.name,
        subtitle: `${item.type} — /${item.slug}`,
        status: item.active ? "Ativa" : "Inativa",
      })),
    },
    {
      key: "coupons",
      label: "Cupons",
      model: "coupon",
      iconName: "coupons",
      items: data.coupons.map((item) => ({
        id: item.id,
        title: item.code,
        subtitle: item.description || "Sem descrição",
        status: item.active ? "Ativo" : "Inativo",
      })),
    },
    {
      key: "teams",
      label: "Times",
      model: "team",
      iconName: "teams",
      items: data.teams.map((item) => ({
        id: item.id,
        title: item.name,
        subtitle: item.game,
        status: item.active ? "Ativo" : "Inativo",
      })),
    },
    {
      key: "players",
      label: "Jogadores",
      model: "player",
      iconName: "players",
      items: data.players.map((item) => ({
        id: item.id,
        title: item.nickname,
        subtitle: `${item.role || "Sem função"} — ${item.team?.name || "Sem time"} — ${item.realName || "Sem nome real"}`,
        status: item.active ? "Ativo" : "Inativo",
      })),
    },
    {
      key: "influencers",
      label: "Influenciadores",
      model: "influencer",
      iconName: "influencers",
      items: data.influencers.map((item) => ({
        id: item.id,
        title: item.nickname || item.name,
        subtitle: `/influenciadores/${item.slug} — ${item.contentCategory || "Sem categoria"}`,
        status: item.active ? "Ativo" : "Inativo",
      })),
    },
    {
      key: "staff",
      label: "Staff",
      model: "staff",
      iconName: "staff",
      items: data.staff.map((item) => ({
        id: item.id,
        title: item.nickname || item.name,
        subtitle: `${item.role} — ${item.name}`,
        status: item.active ? "Ativo" : "Inativo",
      })),
    },
    {
      key: "events",
      label: "Calendário",
      model: "event",
      iconName: "events",
      items: data.events.map((item) => ({
        id: item.id,
        title: item.title,
        subtitle: `${item.game || "Evento"} — ${item.opponent || "Sem adversário"} — ${item.startsAt.toLocaleDateString("pt-BR")}`,
        status: item.active ? "Ativo" : "Inativo",
      })),
    },
    {
      key: "banners",
      label: "Banners",
      model: "banner",
      iconName: "banners",
      items: data.banners.map((item) => ({
        id: item.id,
        title: item.title,
        subtitle: `${item.section || "Sem seção"} — ${item.buttonText || "Sem botão"}`,
        status: item.active ? "Ativo" : "Inativo",
      })),
    },
  ];

  const orders = data.orders.map((order) => ({
    id: order.id,
    title: `Pedido #${order.id.slice(-6).toUpperCase()}`,
    subtitle: `${order.customer.name} — ${formatCurrencyBRL(order.total)} — ${order.items.length} item(ns)`,
    customer: order.customer.name,
    total: formatCurrencyBRL(order.total),
    status: order.status,
  }));

  return (
    <>
      <AdminPageHeader
        eyebrow="Central CRUD"
        title="Gerenciar registros"
        description="Filtre por módulo, pesquise registros, edite, exclua ou cancele pedidos sem precisar rolar uma tela gigante."
        icon={FaTools}
        actionLabel="CRUD com filtros"
      />

      <AdminCrudManager sections={sections} orders={orders} />
    </>
  );
}