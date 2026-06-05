import { CategoryGrid } from "@/components/public/CategoryGrid";
import { HeroSection } from "@/components/public/HeroSection";
import { PublicFooter } from "@/components/public/PublicFooter";
import { PublicHeader } from "@/components/public/PublicHeader";

export default function HomePage() {
  return (
    <>
      <PublicHeader />
      <main>
        <HeroSection />
        <CategoryGrid />
      </main>
      <PublicFooter />
    </>
  );
}
