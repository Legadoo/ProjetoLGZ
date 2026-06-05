import { notFound } from "next/navigation";
import { InfluencerProfileHero } from "@/components/public/InfluencerProfileHero";
import { PublicFooter } from "@/components/public/PublicFooter";
import { PublicHeader } from "@/components/public/PublicHeader";
import { getInfluencerBySlug, getInfluencers } from "@/services/influencer.service";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getInfluencers().map((influencer) => ({
    slug: influencer.slug,
  }));
}

export default async function InfluencerProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const influencer = getInfluencerBySlug(slug);

  if (!influencer) {
    notFound();
  }

  return (
    <>
      <PublicHeader />
      <main>
        <InfluencerProfileHero influencer={influencer} />

        <section className="lgz-container grid gap-5 py-8 lg:grid-cols-3">
          <article className="lgz-panel rounded-2xl p-6 lg:col-span-2">
            <h2 className="text-3xl font-black uppercase text-purple-300">
              História na Legendaryz
            </h2>
            <p className="mt-4 text-lg leading-8 text-zinc-300">
              {influencer.legendaryzStory}
            </p>
          </article>

          <aside className="lgz-panel rounded-2xl p-6">
            <h2 className="text-2xl font-black uppercase text-purple-300">
              Redes sociais
            </h2>

            <div className="mt-5 flex flex-col gap-3 text-sm">
              {influencer.instagramUrl && (
                <a
                  className="rounded-lg border border-purple-500/30 p-3 hover:bg-purple-950/40"
                  href={influencer.instagramUrl}
                  target="_blank"
                >
                  Instagram
                </a>
              )}

              {influencer.tiktokUrl && (
                <a
                  className="rounded-lg border border-purple-500/30 p-3 hover:bg-purple-950/40"
                  href={influencer.tiktokUrl}
                  target="_blank"
                >
                  TikTok
                </a>
              )}

              {influencer.youtubeUrl && (
                <a
                  className="rounded-lg border border-purple-500/30 p-3 hover:bg-purple-950/40"
                  href={influencer.youtubeUrl}
                  target="_blank"
                >
                  YouTube
                </a>
              )}
            </div>
          </aside>
        </section>

        <section className="lgz-container pb-10">
          <div className="lgz-panel rounded-2xl p-6">
            <h2 className="text-3xl font-black uppercase text-purple-300">
              Galeria
            </h2>
            <p className="mt-3 text-zinc-300">
              Estrutura preparada para artes, fotos, vídeos e destaques futuros do influenciador.
            </p>
          </div>
        </section>
      </main>
      <PublicFooter />
    </>
  );
}