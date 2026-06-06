import { FaMicrophoneAlt } from "react-icons/fa";
import { InfluencerGrid } from "@/components/public/InfluencerGrid";
import { PublicFooter } from "@/components/public/PublicFooter";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicPageHero } from "@/components/public/PublicPageHero";
import { getInfluencers } from "@/services/influencer.service";

export default function InfluenciadoresPage() {
  const influencers = getInfluencers();

  return (
    <>
      <PublicHeader />

      <main>
        <PublicPageHero
          eyebrow="Criadores Legendaryz"
          title="Influenciadores"
          description="Conheça os criadores de conteúdo que representam a Legendaryz no cenário gamer, na comunidade e no lifestyle digital. Cada card leva para uma página individual com perfil oficial."
          icon={FaMicrophoneAlt}
        />

        <InfluencerGrid influencers={influencers} />
      </main>

      <PublicFooter />
    </>
  );
}