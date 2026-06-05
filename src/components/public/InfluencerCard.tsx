import Link from "next/link";
import type { InfluencerPreview } from "@/services/influencer.service";

export function InfluencerCard({ influencer }: { influencer: InfluencerPreview }) {
  return (
    <Link
      href={`/influenciadores/${influencer.slug}`}
      className="lgz-panel group overflow-hidden rounded-2xl transition hover:-translate-y-1 hover:border-purple-400"
    >
      <div className="grid h-64 place-items-center bg-[radial-gradient(circle,rgba(176,38,255,0.35),transparent_55%),linear-gradient(135deg,#160026,#050008)]">
        <div className="grid h-32 w-32 place-items-center rounded-full border border-purple-400/50 bg-black/50 text-4xl font-black text-purple-300 shadow-[0_0_35px_rgba(176,38,255,0.45)]">
          {influencer.nickname.slice(0, 2).toUpperCase()}
        </div>
      </div>
      <div className="p-6">
        <p className="text-sm font-black uppercase text-purple-400">{influencer.contentCategory}</p>
        <h3 className="mt-2 text-3xl font-black uppercase">{influencer.nickname}</h3>
        <p className="mt-3 text-sm leading-6 text-zinc-300">{influencer.shortBio}</p>
        <span className="mt-6 inline-flex rounded-lg border border-purple-500/50 px-4 py-2 text-sm font-black uppercase text-purple-200 group-hover:bg-purple-600 group-hover:text-white">
          Ver perfil →
        </span>
      </div>
    </Link>
  );
}
