import type { InfluencerPreview } from "@/services/influencer.service";

export function InfluencerProfileHero({ influencer }: { influencer: InfluencerPreview }) {
  return (
    <section className="lgz-container mt-6 overflow-hidden rounded-3xl border border-purple-500/30 bg-[radial-gradient(circle_at_70%_20%,rgba(176,38,255,0.32),transparent_30%),linear-gradient(135deg,#12001f,#030006)] p-6 md:p-12">
      <div className="grid items-center gap-8 lg:grid-cols-[360px_1fr]">
        <div className="grid h-80 place-items-center rounded-3xl border border-purple-500/40 bg-black/40 shadow-[0_0_40px_rgba(176,38,255,0.25)]">
          <div className="grid h-44 w-44 place-items-center rounded-full border border-purple-400/50 bg-purple-950/40 text-6xl font-black text-purple-200">
            {influencer.nickname.slice(0, 2).toUpperCase()}
          </div>
        </div>

        <div>
          <p className="text-sm font-black uppercase tracking-widest text-purple-400">
            Perfil oficial Legendaryz
          </p>
          <h1 className="mt-3 text-5xl font-black uppercase md:text-7xl">
            {influencer.nickname}
          </h1>
          <p className="mt-2 text-xl text-zinc-300">{influencer.name}</p>
          <p className="mt-6 max-w-3xl text-2xl font-black text-purple-200">
            “{influencer.highlightPhrase}”
          </p>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300">
            {influencer.fullBio}
          </p>
        </div>
      </div>
    </section>
  );
}
