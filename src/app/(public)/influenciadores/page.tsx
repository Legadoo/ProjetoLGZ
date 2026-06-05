import { InfluencerGrid } from "@/components/public/InfluencerGrid";
import { PublicFooter } from "@/components/public/PublicFooter";
import { PublicHeader } from "@/components/public/PublicHeader";
import { getInfluencers } from "@/services/influencer.service";

export default function InfluenciadoresPage() {
  const influencers = getInfluencers();

  return (
    <>
      <PublicHeader />
      <main>
        <section className="lgz-container mt-6 rounded-3xl border border-purple-500/30 bg-[radial-gradient(circle_at_80%_20%,rgba(176,38,255,0.26),transparent_30%),linear-gradient(135deg,#12001f,#030006)] p-8 md:p-12">
          <p className="text-sm font-black uppercase tracking-widest text-purple-400">
            Criadores Legendaryz
          </p>
          <h1 className="mt-3 text-5xl font-black uppercase md:text-7xl">
            Influenciadores
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-300">
            Conheça os nomes que representam a Legendaryz no conteúdo, na comunidade e no lifestyle gamer.
            Cada card leva para uma página individual com biografia, história, redes sociais e destaque oficial.
          </p>
        </section>

        <InfluencerGrid influencers={influencers} />
      </main>
      <PublicFooter />
    </>
  );
}
