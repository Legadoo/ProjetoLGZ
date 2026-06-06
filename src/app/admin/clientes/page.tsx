import { AdminModuleTemplate } from "@/components/admin/AdminModuleTemplate";
import { requireAdminUser } from "@/lib/session";

export default async function AdminModulePage() {
  await requireAdminUser();

  return (
    <AdminModuleTemplate
      moduleKey="clientes"
      title="Clientes"
      description="Gerencie clientes cadastrados, dados de contato, status da conta, vantagens, cupons e histórico de pedidos."
      actionLabel="Novo cliente"
    />
  );
}