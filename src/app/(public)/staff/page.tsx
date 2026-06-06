import { FaShieldAlt } from "react-icons/fa";
import { PublicFooter } from "@/components/public/PublicFooter";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicPageHero } from "@/components/public/PublicPageHero";
import { PublicStaffGrid } from "@/components/public/PublicStaffGrid";
import { getPublicStaff } from "@/services/content.service";

export default async function StaffPage() {
  const staff = await getPublicStaff();

  return (
    <>
      <PublicHeader />

      <main>
        <PublicPageHero
          eyebrow="Equipe interna"
          title="Staff"
          description="Conheça a equipe que organiza, protege, movimenta e faz a Legendaryz acontecer."
          icon={FaShieldAlt}
        />

        <PublicStaffGrid staff={staff} />
      </main>

      <PublicFooter />
    </>
  );
}