import {
  FaInstagram,
  FaMicrophoneAlt,
  FaStar,
  FaTiktok,
  FaTwitch,
  FaYoutube,
} from "react-icons/fa";
import type { InfluencerPreview } from "@/services/influencer.service";

export function InfluencerProfileHero({ influencer }: { influencer: InfluencerPreview }) {
  return (
    <section className="lgz-container mt-6 overflow-hidden rounded-[2rem] border border-purple-500/30 bg-[radial-gradient(circle_at_75%_18%,rgba(176,38,255,0.34),transparent_32%),linear-gradient(135deg,#12001f,#030006)] shadow-[0_0_60px_rgba(126,34,206,0.18)]">
      <div className="grid gap-8 p-6 md:p-10 lg:grid-cols-[390px_1fr] xl:p-12">
        <div className="grid h-[420px] place-items-center rounded-[1.7rem] border border-purple-500/40 bg-[radial-gradient(circle,rgba(176,38,255,0.28),transparent_55%),linear-gradient(135deg,#0b0014,#050008)] shadow-[0_0_40px_rgba(176,38,255,0.20)]">
          <div className="grid h-52 w-52 place-items-center rounded-full border border-purple-400/50 bg-black/50 text-7xl font-black text-purple-200 shadow-[0_0_50px_rgba(176,38,255,0.45)]">
            {influencer.nickname.slice(0, 2).toUpperCase()}
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="mb-6 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-purple-500/35 bg-purple-950/30 px-5 py-3 text-xs font-black uppercase tracking-[0.22em] text-purple-200">
              <FaStar />
              Perfil oficial Legendaryz
            </span>

            <span className="inline-flex items-center gap-2 rounded-full border border-purple-500/35 bg-black/35 px-5 py-3 text-xs font-black uppercase tracking-[0.22em] text-purple-200">
              <FaMicrophoneAlt />
              {influencer.contentCategory}
            </span>
          </div>

          <h1 className="text-5xl font-black uppercase leading-none md:text-7xl">
            {influencer.nickname}
          </h1>

          <p className="mt-3 text-xl font-bold uppercase text-zinc-400">
            {influencer.name}
          </p>

          <p className="mt-7 max-w-3xl text-2xl font-black leading-9 text-purple-200">
            “{influencer.highlightPhrase}”
          </p>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300">
            {influencer.fullBio}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {influencer.instagramUrl && (
              <a href={influencer.instagramUrl} target="_blank" className="grid h-12 w-12 place-items-center rounded-xl border border-purple-500/35 bg-purple-950/30 text-purple-200 transition hover:bg-purple-700/40">
                <FaInstagram />
              </a>
            )}

            {influencer.tiktokUrl && (
              <a href={influencer.tiktokUrl} target="_blank" className="grid h-12 w-12 place-items-center rounded-xl border border-purple-500/35 bg-purple-950/30 text-purple-200 transition hover:bg-purple-700/40">
                <FaTiktok />
              </a>
            )}

            {influencer.youtubeUrl && (
              <a href={influencer.youtubeUrl} target="_blank" className="grid h-12 w-12 place-items-center rounded-xl border border-purple-500/35 bg-purple-950/30 text-purple-200 transition hover:bg-purple-700/40">
                <FaYoutube />
              </a>
            )}

            {influencer.twitchUrl && (
              <a href={influencer.twitchUrl} target="_blank" className="grid h-12 w-12 place-items-center rounded-xl border border-purple-500/35 bg-purple-950/30 text-purple-200 transition hover:bg-purple-700/40">
                <FaTwitch />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}