import { AdminModuleTemplate } from "@/components/admin/AdminModuleTemplate";
import { requireAdminUser } from "@/lib/session";

export default async function AdminModulePage() {
  await requireAdminUser();

  return (
    <AdminModuleTemplate
      moduleKey="influenciadores"
      title="Influenciadores"
      description="Gerencie influenciadores, páginas individuais por slug, biografia, redes sociais, banners, galeria e destaque na home."
      actionLabel="Novo influenciador"
    />
  );
}