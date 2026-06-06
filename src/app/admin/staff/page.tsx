import { AdminModuleTemplate } from "@/components/admin/AdminModuleTemplate";
import { requireAdminUser } from "@/lib/session";

export default async function AdminModulePage() {
  await requireAdminUser();

  return (
    <AdminModuleTemplate
      moduleKey="staff"
      title="Staff"
      description="Organize os membros da staff, cargos, biografias, imagens e status de exibição pública."
      actionLabel="Novo staff"
    />
  );
}