import { AdminModuleTemplate } from "@/components/admin/AdminModuleTemplate";
import { requireAdminUser } from "@/lib/session";

export default async function AdminModulePage() {
  await requireAdminUser();

  return (
    <AdminModuleTemplate
      moduleKey="banners"
      title="Banners"
      description="Controle banners, artes principais, chamadas, botões, links, seções e ordem de exibição no site público."
      actionLabel="Novo banner"
    />
  );
}