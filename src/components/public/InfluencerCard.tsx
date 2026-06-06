import Link from "next/link";
import { FaChevronRight, FaInstagram, FaStar } from "react-icons/fa";
import type { InfluencerPreview } from "@/services/influencer.service";

export function InfluencerCard({ influencer }: { influencer: InfluencerPreview }) {
  return (
    <Link
      href={`/influenciadores/${influencer.slug}`}
      className="lgz-panel group overflow-hidden rounded-3xl transition hover:-translate-y-1 hover:border-purple-400"
    >
      <div className="relative grid h-72 place-items-center overflow-hidden bg-[radial-gradient(circle,rgba(176,38,255,0.38),transparent_58%),linear-gradient(135deg,#17002a,#050008)]">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.08),transparent)] opacity-0 transition group-hover:opacity-100" />

        <div className="relative grid h-36 w-36 place-items-center rounded-full border border-purple-400/50 bg-black/50 text-5xl font-black text-purple-200 shadow-[0_0_45px_rgba(176,38,255,0.45)]">
          {influencer.nickname.slice(0, 2).toUpperCase()}
        </div>

        <div className="absolute left-5 top-5 rounded-full border border-purple-500/35 bg-black/45 px-4 py-2 text-xs font-black uppercase text-purple-200">
          <span className="inline-flex items-center gap-2">
            <FaStar />
            Oficial LGZ
          </span>
        </div>
      </div>

      <div className="p-6">
        <p className="text-xs font-black uppercase tracking-[0.25em] text-purple-400">
          {influencer.contentCategory}
        </p>

        <h3 className="mt-3 text-3xl font-black uppercase">
          {influencer.nickname}
        </h3>

        <p className="mt-1 text-sm font-bold uppercase text-zinc-500">
          {influencer.name}
        </p>

        <p className="mt-4 min-h-20 text-sm leading-6 text-zinc-300">
          {influencer.shortBio}
        </p>

        <div className="mt-6 flex items-center justify-between gap-4">
          <span className="inline-flex items-center gap-2 rounded-xl border border-purple-500/50 px-4 py-3 text-sm font-black uppercase text-purple-200 transition group-hover:bg-purple-600 group-hover:text-white">
            Ver perfil <FaChevronRight />
          </span>

          {influencer.instagramUrl && (
            <span className="grid h-11 w-11 place-items-center rounded-xl border border-purple-500/30 bg-purple-950/30 text-purple-200">
              <FaInstagram />
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}