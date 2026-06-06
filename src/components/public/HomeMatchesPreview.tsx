import Link from "next/link";
import { FaCalendarAlt, FaChevronRight, FaClock, FaGamepad } from "react-icons/fa";

const matches = [
  {
    game: "Blood Strike",
    opponent: "Rival Team",
    date: "08/06/2026",
    time: "20:00 BRT",
  },
  {
    game: "Minecraft",
    opponent: "Evento LGZNetwork",
    date: "12/06/2026",
    time: "19:00 BRT",
  },
  {
    game: "Comunidade",
    opponent: "Treino aberto",
    date: "15/06/2026",
    time: "21:00 BRT",
  },
];

export function HomeMatchesPreview() {
  return (
    <section className="lgz-container py-10">
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">
            Agenda LGZ
          </p>
          <h2 className="mt-3 text-4xl font-black uppercase md:text-5xl">
            Próximos jogos
          </h2>
        </div>

        <Link href="/calendario" className="lgz-button lgz-button-outline">
          Ver calendário <FaChevronRight />
        </Link>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {matches.map((match) => (
          <article key={`${match.game}-${match.date}`} className="lgz-panel rounded-3xl p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-2xl border border-purple-500/40 bg-purple-950/40 text-purple-200">
                <FaGamepad />
              </div>

              <span className="rounded-full border border-purple-500/30 bg-purple-950/30 px-4 py-2 text-xs font-black uppercase text-purple-200">
                {match.game}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="text-center">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl border border-purple-500/40 bg-purple-950/40 font-black">
                  LGZ
                </div>
                <strong className="mt-2 block text-xs uppercase">Legendaryz</strong>
              </div>

              <strong className="text-3xl font-black text-purple-300">VS</strong>

              <div className="text-center">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl border border-zinc-500/40 bg-zinc-900/80 font-black">
                  OP
                </div>
                <strong className="mt-2 block text-xs uppercase">{match.opponent}</strong>
              </div>
            </div>

            <div className="mt-6 grid gap-3 text-sm text-zinc-300">
              <span className="flex items-center gap-2 rounded-xl bg-black/30 p-3">
                <FaCalendarAlt className="text-purple-300" />
                {match.date}
              </span>

              <span className="flex items-center gap-2 rounded-xl bg-black/30 p-3">
                <FaClock className="text-purple-300" />
                {match.time}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}