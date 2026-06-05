import Link from "next/link";
import { FaCalendarAlt, FaClock, FaGamepad } from "react-icons/fa";

export function HeroSection() {
  return (
    <section className="lgz-container mt-6 overflow-hidden rounded-3xl border border-purple-500/30 bg-[radial-gradient(circle_at_70%_45%,rgba(176,38,255,0.30),transparent_30%),linear-gradient(135deg,rgba(10,0,18,0.96),rgba(2,0,5,0.96))] p-6 shadow-[0_0_50px_rgba(126,34,206,0.16)] md:p-12">
      <div className="grid min-h-[420px] items-center gap-8 lg:grid-cols-[1fr_0.9fr_320px]">
        <div>
          <p className="mb-4 text-sm font-black uppercase tracking-widest text-purple-400">
            Seja lendário
          </p>

          <h1 className="max-w-2xl text-5xl font-black uppercase leading-none md:text-7xl">
            Welcome to <span className="lgz-text-gradient block">Legendaryz</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-300">
            Mais que um time, somos uma família. Honra, foco e dedicação em cada batalha.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link href="/sobre" className="lgz-button">
              Conheça mais →
            </Link>

            <Link href="/times" className="lgz-button lgz-button-outline">
              Nossos times →
            </Link>
          </div>
        </div>

        <div className="relative grid min-h-[320px] place-items-center">
          <div className="absolute h-72 w-72 rounded-full bg-purple-600/30 blur-3xl" />

          <div className="relative grid h-72 w-72 place-items-center rounded-full border border-purple-400/40 bg-black/40 text-center text-7xl font-black text-purple-300 shadow-[0_0_60px_rgba(176,38,255,0.5)] md:h-96 md:w-96">
            LGZ
          </div>
        </div>

        <div className="lgz-panel rounded-2xl p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl border border-purple-500/40 bg-purple-950/40 text-purple-200">
              <FaGamepad />
            </div>

            <p className="text-xl font-black uppercase text-purple-400">
              Próximo jogo
            </p>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="text-center">
              <div className="mx-auto grid h-20 w-20 place-items-center rounded-2xl border border-purple-500/40 bg-purple-950/40 font-black">
                LGZ
              </div>
              <strong className="mt-3 block text-sm uppercase">Legendaryz</strong>
            </div>

            <strong className="text-4xl text-purple-400 drop-shadow-[0_0_14px_rgba(176,38,255,1)]">
              VS
            </strong>

            <div className="text-center">
              <div className="mx-auto grid h-20 w-20 place-items-center rounded-2xl border border-zinc-500/40 bg-zinc-900/80 font-black">
                RT
              </div>
              <strong className="mt-3 block text-sm uppercase">Rival Team</strong>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 text-sm text-zinc-300 sm:grid-cols-2">
            <span className="flex items-center gap-2">
              <FaCalendarAlt className="text-purple-300" />
              08/06/2026
            </span>

            <span className="flex items-center gap-2">
              <FaClock className="text-purple-300" />
              20:00 BRT
            </span>
          </div>

          <Link href="/calendario" className="lgz-button mt-6 w-full">
            Ver calendário →
          </Link>
        </div>
      </div>
    </section>
  );
}