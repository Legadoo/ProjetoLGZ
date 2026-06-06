import { FaUsers } from "react-icons/fa";
import { PublicFooter } from "@/components/public/PublicFooter";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicPageHero } from "@/components/public/PublicPageHero";
import { PublicTeamGrid } from "@/components/public/PublicTeamGrid";
import { getPublicTeams } from "@/services/content.service";

export default async function TimesPage() {
  const teams = await getPublicTeams();

  return (
    <>
      <PublicHeader />

      <main>
        <PublicPageHero
          eyebrow="Elencos LGZ"
          title="Times"
          description="Conheça os times, modalidades e jogadores cadastrados oficialmente na Legendaryz."
          icon={FaUsers}
        />

        <PublicTeamGrid teams={teams} />
      </main>

      <PublicFooter />
    </>
  );
}