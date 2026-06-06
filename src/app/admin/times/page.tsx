import { AdminModuleTemplate } from "@/components/admin/AdminModuleTemplate";
import { requireAdminUser } from "@/lib/session";

export default async function AdminModulePage() {
  await requireAdminUser();

  return (
    <AdminModuleTemplate
      moduleKey="times"
      title="Times"
      description="Gerencie times da Legendaryz, modalidades, descrições, logos, status e apresentação pública."
      actionLabel="Novo time"
    />
  );
}