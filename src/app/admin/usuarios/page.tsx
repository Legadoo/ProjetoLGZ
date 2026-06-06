import { AdminModuleTemplate } from "@/components/admin/AdminModuleTemplate";
import { requireAdminUser } from "@/lib/session";

export default async function AdminModulePage() {
  await requireAdminUser();

  return (
    <AdminModuleTemplate
      moduleKey="usuarios"
      title="Usuários administrativos"
      description="Gerencie contas internas do painel, cargos administrativos, permissões futuras e status dos usuários."
      actionLabel="Novo usuário"
    />
  );
}