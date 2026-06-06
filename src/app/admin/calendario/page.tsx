import { AdminModuleTemplate } from "@/components/admin/AdminModuleTemplate";
import { requireAdminUser } from "@/lib/session";

export default async function AdminModulePage() {
  await requireAdminUser();

  return (
    <AdminModuleTemplate
      moduleKey="calendario"
      title="Calendário"
      description="Cadastre próximos jogos, eventos, adversários, horários, descrição e links de transmissão."
      actionLabel="Novo evento"
    />
  );
}