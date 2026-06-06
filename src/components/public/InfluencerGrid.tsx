import { InfluencerCard } from "./InfluencerCard";

type InfluencerGridProps = {
  influencers: Array<{
    id: string;
    name: string;
    nickname: string | null;
    slug: string;
    shortBio: string | null;
    contentCategory: string | null;
    profileImageUrl: string | null;
    instagramUrl: string | null;
  }>;
};

export function InfluencerGrid({ influencers }: InfluencerGridProps) {
  return (
    <section className="lgz-container grid grid-cols-1 gap-5 py-8 md:grid-cols-2 xl:grid-cols-3">
      {influencers.map((influencer) => (
        <InfluencerCard key={influencer.id} influencer={influencer} />
      ))}
    </section>
  );
}