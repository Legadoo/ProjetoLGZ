import { AdminModuleTemplate } from "@/components/admin/AdminModuleTemplate";
import { requireAdminUser } from "@/lib/session";

export default async function AdminModulePage() {
  await requireAdminUser();

  return (
    <AdminModuleTemplate
      moduleKey="configuracoes"
      title="Configurações"
      description="Gerencie identidade visual, links sociais, logo, favicon, cores, rodapé e configurações globais do site."
      actionLabel="Editar configurações"
    />
  );
}