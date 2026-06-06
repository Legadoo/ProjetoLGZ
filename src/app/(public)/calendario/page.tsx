import { FaCalendarAlt } from "react-icons/fa";
import { PublicCalendarList } from "@/components/public/PublicCalendarList";
import { PublicFooter } from "@/components/public/PublicFooter";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicPageHero } from "@/components/public/PublicPageHero";
import { getPublicAllMatchEvents } from "@/services/calendar.service";

export default async function CalendarioPage() {
  const { upcomingEvents, pastEvents } = await getPublicAllMatchEvents();

  return (
    <>
      <PublicHeader />

      <main>
        <PublicPageHero
          eyebrow="Próximos jogos"
          title="Calendário"
          description="Acompanhe os próximos jogos, eventos, confrontos, treinos, lives e atividades oficiais da Legendaryz."
          icon={FaCalendarAlt}
        />

        <PublicCalendarList
          upcomingEvents={upcomingEvents}
          pastEvents={pastEvents}
        />
      </main>

      <PublicFooter />
    </>
  );
}