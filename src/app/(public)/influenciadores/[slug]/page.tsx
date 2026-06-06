import { notFound } from "next/navigation";
import { FaImages, FaQuoteLeft, FaUserCheck } from "react-icons/fa";
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
          <article className="lgz-panel rounded-3xl p-6 lg:col-span-2">
            <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl border border-purple-500/40 bg-purple-950/40 text-purple-200">
              <FaUserCheck />
            </div>

            <h2 className="text-3xl font-black uppercase text-purple-200">
              História na Legendaryz
            </h2>

            <p className="mt-4 text-lg leading-8 text-zinc-300">
              {influencer.legendaryzStory}
            </p>
          </article>

          <aside className="lgz-panel rounded-3xl p-6">
            <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl border border-purple-500/40 bg-purple-950/40 text-purple-200">
              <FaQuoteLeft />
            </div>

            <h2 className="text-2xl font-black uppercase text-purple-200">
              Frase destaque
            </h2>

            <p className="mt-4 text-lg font-black leading-8 text-zinc-300">
              “{influencer.highlightPhrase}”
            </p>
          </aside>
        </section>

        <section className="lgz-container pb-10">
          <div className="lgz-panel rounded-3xl p-6">
            <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl border border-purple-500/40 bg-purple-950/40 text-purple-200">
              <FaImages />
            </div>

            <h2 className="text-3xl font-black uppercase text-purple-200">
              Galeria oficial
            </h2>

            <p className="mt-3 text-zinc-300">
              Estrutura preparada para artes, fotos, vídeos e destaques futuros do influenciador.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="grid h-48 place-items-center rounded-3xl border border-purple-500/25 bg-[radial-gradient(circle,rgba(176,38,255,0.20),transparent_60%),linear-gradient(135deg,#10001d,#050008)] text-sm font-black uppercase text-purple-300"
                >
                  Imagem {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </>
  );
}