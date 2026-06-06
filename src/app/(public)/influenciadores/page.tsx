import { FaMicrophoneAlt } from "react-icons/fa";
import { InfluencerGrid } from "@/components/public/InfluencerGrid";
import { PublicFooter } from "@/components/public/PublicFooter";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicPageHero } from "@/components/public/PublicPageHero";
import { getPublicInfluencers } from "@/services/content.service";

export default async function InfluenciadoresPage() {
  const influencers = await getPublicInfluencers();

  return (
    <>
      <PublicHeader />

      <main>
        <PublicPageHero
          eyebrow="Criadores Legendaryz"
          title="Influenciadores"
          description="Conheça os criadores de conteúdo cadastrados oficialmente na Legendaryz. Cada card leva para uma página individual com perfil completo."
          icon={FaMicrophoneAlt}
        />

        <InfluencerGrid influencers={influencers} />
      </main>

      <PublicFooter />
    </>
  );
}