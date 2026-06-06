import { AdminModuleTemplate } from "@/components/admin/AdminModuleTemplate";
import { requireAdminUser } from "@/lib/session";

export default async function AdminModulePage() {
  await requireAdminUser();

  return (
    <AdminModuleTemplate
      moduleKey="jogadores"
      title="Jogadores"
      description="Cadastre jogadores, nicknames, funções, biografias, imagens e vínculo com times da organização."
      actionLabel="Novo jogador"
    />
  );
}