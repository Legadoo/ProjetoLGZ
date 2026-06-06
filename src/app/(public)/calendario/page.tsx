import { FaCalendarAlt } from "react-icons/fa";
import { HomeMatchesPreview } from "@/components/public/HomeMatchesPreview";
import { PublicFooter } from "@/components/public/PublicFooter";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicPageHero } from "@/components/public/PublicPageHero";

export default function CalendarioPage() {
  return (
    <>
      <PublicHeader />
      <main>
        <PublicPageHero
          eyebrow="Próximos jogos"
          title="Calendário"
          description="Acompanhe os próximos jogos, eventos, confrontos e transmissões oficiais da Legendaryz."
          icon={FaCalendarAlt}
        />

        <HomeMatchesPreview />
      </main>
      <PublicFooter />
    </>
  );
}