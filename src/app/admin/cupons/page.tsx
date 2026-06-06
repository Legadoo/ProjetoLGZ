import { AdminModuleTemplate } from "@/components/admin/AdminModuleTemplate";
import { requireAdminUser } from "@/lib/session";

export default async function AdminModulePage() {
  await requireAdminUser();

  return (
    <AdminModuleTemplate
      moduleKey="cupons"
      title="Cupons"
      description="Crie e organize cupons de desconto, campanhas promocionais, regras de uso, validade e limite de utilização."
      actionLabel="Novo cupom"
    />
  );
}