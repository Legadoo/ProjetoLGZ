import { CategoryGrid } from "@/components/public/CategoryGrid";
import { HeroSection } from "@/components/public/HeroSection";
import { HomeInfluencersPreview } from "@/components/public/HomeInfluencersPreview";
import { HomeMatchesPreview } from "@/components/public/HomeMatchesPreview";
import { HomeStorePreview } from "@/components/public/HomeStorePreview";
import { PublicFooter } from "@/components/public/PublicFooter";
import { PublicHeader } from "@/components/public/PublicHeader";

export default function HomePage() {
  return (
    <>
      <PublicHeader />

      <main>
        <HeroSection />
        <CategoryGrid />
        <HomeStorePreview />
        <HomeInfluencersPreview />
        <HomeMatchesPreview />
      </main>

      <PublicFooter />
    </>
  );
}