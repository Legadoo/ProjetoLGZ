import { AdminModuleTemplate } from "@/components/admin/AdminModuleTemplate";
import { requireAdminUser } from "@/lib/session";

export default async function AdminModulePage() {
  await requireAdminUser();

  return (
    <AdminModuleTemplate
      moduleKey="pedidos"
      title="Pedidos"
      description="Acompanhe pedidos de clientes, status de compra, itens, total, cupons aplicados e histórico de movimentação."
      actionLabel="Ver pedidos"
    />
  );
}