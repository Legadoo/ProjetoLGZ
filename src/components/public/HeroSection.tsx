import Link from "next/link";
import {
  FaCalendarAlt,
  FaChevronRight,
  FaClock,
  FaCrown,
  FaGamepad,
  FaShieldAlt,
  FaUsers,
} from "react-icons/fa";
import { getMainHomeBanner } from "@/services/site.service";

export async function HeroSection() {
  const banner = await getMainHomeBanner();

  const title = banner?.title || "Welcome to Legendaryz";
  const subtitle =
    banner?.subtitle ||
    "Uma plataforma gamer para unir e-sports, comunidade, influenciadores, loja, calendário de jogos e a família LGZ em um só lugar.";

  const buttonText = banner?.buttonText || "Conheça a LGZ";
  const buttonUrl = banner?.buttonUrl || "/sobre";

  return (
    <section className="lgz-container mt-6 overflow-hidden rounded-[2rem] border border-purple-500/30 bg-[radial-gradient(circle_at_72%_35%,rgba(176,38,255,0.32),transparent_32%),radial-gradient(circle_at_18%_80%,rgba(88,28,135,0.26),transparent_34%),linear-gradient(135deg,rgba(11,0,20,0.98),rgba(3,0,8,0.98))] shadow-[0_0_60px_rgba(126,34,206,0.18)]">
      <div className="grid min-h-[640px] items-center gap-8 p-6 md:p-10 lg:grid-cols-[1.05fr_0.95fr] xl:p-14">
        <div>
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-purple-500/35 bg-purple-950/30 px-5 py-3 text-xs font-black uppercase tracking-[0.25em] text-purple-200">
            <FaCrown />
            Organização oficial de e-sports
          </div>

          <h1 className="max-w-4xl text-5xl font-black uppercase leading-[0.9] md:text-7xl xl:text-8xl">
            {title}
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-300 md:text-xl">
            {subtitle}
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link href={buttonUrl} className="lgz-button">
              {buttonText} <FaChevronRight />
            </Link>

            <Link href="/influenciadores" className="lgz-button lgz-button-outline">
              Ver influenciadores <FaChevronRight />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-purple-500/25 bg-black/35 p-5">
              <FaUsers className="mb-3 text-2xl text-purple-300" />
              <strong className="block text-2xl font-black">Comunidade</strong>
              <span className="text-sm text-zinc-400">Players e membros</span>
            </div>

            <div className="rounded-2xl border border-purple-500/25 bg-black/35 p-5">
              <FaGamepad className="mb-3 text-2xl text-purple-300" />
              <strong className="block text-2xl font-black">E-sports</strong>
              <span className="text-sm text-zinc-400">Times e campeonatos</span>
            </div>

            <div className="rounded-2xl border border-purple-500/25 bg-black/35 p-5">
              <FaShieldAlt className="mb-3 text-2xl text-purple-300" />
              <strong className="block text-2xl font-black">LGZ</strong>
              <span className="text-sm text-zinc-400">Desde 2017</span>
            </div>
          </div>
        </div>

        <div className="grid gap-5">
          <div className="relative mx-auto grid aspect-square w-full max-w-[520px] place-items-center overflow-hidden rounded-full border border-purple-400/30 bg-black/30 shadow-[0_0_90px_rgba(176,38,255,0.22)]">
            {banner?.imageUrl ? (
              <img
                src={banner.imageUrl}
                alt={banner.title}
                className="h-full w-full object-cover opacity-80"
              />
            ) : (
              <>
                <div className="absolute inset-8 rounded-full border border-purple-500/20" />
                <div className="absolute inset-16 rounded-full border border-purple-500/20" />

                <div className="relative grid h-56 w-56 place-items-center rounded-full border border-purple-400/50 bg-[radial-gradient(circle,rgba(176,38,255,0.40),rgba(10,0,18,0.92))] text-7xl font-black text-purple-100 shadow-[0_0_70px_rgba(176,38,255,0.5)] md:h-72 md:w-72 md:text-8xl">
                  LGZ
                </div>
              </>
            )}
          </div>

          <div className="lgz-panel rounded-3xl p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl border border-purple-500/40 bg-purple-950/40 text-purple-200">
                <FaGamepad />
              </div>

              <div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-purple-400">
                  Próximo jogo
                </p>
                <strong className="text-xl uppercase">Legendaryz Match</strong>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="text-center">
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-2xl border border-purple-500/40 bg-purple-950/40 font-black">
                  LGZ
                </div>
                <strong className="mt-3 block text-sm uppercase">Legendaryz</strong>
              </div>

              <strong className="text-4xl text-purple-300 drop-shadow-[0_0_14px_rgba(176,38,255,1)]">
                VS
              </strong>

              <div className="text-center">
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-2xl border border-zinc-500/40 bg-zinc-900/80 font-black">
                  RT
                </div>
                <strong className="mt-3 block text-sm uppercase">Rival Team</strong>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 text-sm text-zinc-300 sm:grid-cols-2">
              <span className="flex items-center gap-2 rounded-xl bg-black/30 p-3">
                <FaCalendarAlt className="text-purple-300" />
                Próxima data
              </span>

              <span className="flex items-center gap-2 rounded-xl bg-black/30 p-3">
                <FaClock className="text-purple-300" />
                Ver calendário
              </span>
            </div>

            <Link href="/calendario" className="lgz-button mt-6 w-full">
              Ver calendário <FaChevronRight />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}