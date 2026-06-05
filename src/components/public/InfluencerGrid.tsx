import type { InfluencerPreview } from "@/services/influencer.service";
import { InfluencerCard } from "./InfluencerCard";

export function InfluencerGrid({ influencers }: { influencers: InfluencerPreview[] }) {
  return (
    <section className="lgz-container grid grid-cols-1 gap-5 py-8 md:grid-cols-2 xl:grid-cols-3">
      {influencers.map((influencer) => (
        <InfluencerCard key={influencer.slug} influencer={influencer} />
      ))}
    </section>
  );
}
