import { FaCalendarAlt, FaClock, FaGamepad, FaPlay, FaTrophy } from "react-icons/fa";
import { formatDateBR, formatTimeBR } from "@/services/calendar.service";

type PublicCalendarListProps = {
  upcomingEvents: Array<{
    id: string;
    title: string;
    game: string | null;
    opponent: string | null;
    startsAt: Date;
    description: string | null;
    streamUrl: string | null;
  }>;
  pastEvents: Array<{
    id: string;
    title: string;
    game: string | null;
    opponent: string | null;
    startsAt: Date;
    description: string | null;
    streamUrl: string | null;
  }>;
};

function EventCard({
  event,
  variant,
}: {
  event: PublicCalendarListProps["upcomingEvents"][number];
  variant: "upcoming" | "past";
}) {
  return (
    <article className="lgz-panel overflow-hidden rounded-3xl transition hover:-translate-y-1 hover:border-purple-400">
      <div className="grid gap-5 p-6 md:grid-cols-[160px_1fr_auto] md:items-center">
        <div className="grid min-h-36 place-items-center rounded-3xl border border-purple-500/30 bg-[radial-gradient(circle,rgba(176,38,255,0.26),transparent_60%),linear-gradient(135deg,#150024,#050008)]">
          <div className="grid h-20 w-20 place-items-center rounded-2xl border border-purple-500/40 bg-black/40 text-3xl text-purple-200">
            <FaTrophy />
          </div>
        </div>

        <div>
          <div className="mb-4 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-950/30 px-4 py-2 text-xs font-black uppercase text-purple-200">
              <FaGamepad />
              {event.game || "Evento LGZ"}
            </span>

            <span className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-black uppercase ${
              variant === "upcoming"
                ? "border-emerald-500/30 bg-emerald-950/20 text-emerald-300"
                : "border-zinc-500/30 bg-zinc-900/40 text-zinc-300"
            }`}>
              {variant === "upcoming" ? "Próximo" : "Finalizado"}
            </span>
          </div>

          <h2 className="text-3xl font-black uppercase md:text-4xl">
            {event.title}
          </h2>

          <p className="mt-2 text-sm font-bold uppercase text-purple-300">
            {event.opponent ? `Contra ${event.opponent}` : "Evento da Legendaryz"}
          </p>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-400">
            {event.description || "Evento oficial da Legendaryz."}
          </p>

          <div className="mt-5 flex flex-wrap gap-3 text-sm text-zinc-300">
            <span className="inline-flex items-center gap-2 rounded-xl border border-purple-500/20 bg-black/30 px-4 py-3">
              <FaCalendarAlt className="text-purple-300" />
              {formatDateBR(event.startsAt)}
            </span>

            <span className="inline-flex items-center gap-2 rounded-xl border border-purple-500/20 bg-black/30 px-4 py-3">
              <FaClock className="text-purple-300" />
              {formatTimeBR(event.startsAt)}
            </span>
          </div>
        </div>

        <div className="flex md:justify-end">
          {event.streamUrl ? (
            <a
              href={event.streamUrl}
              target="_blank"
              className="inline-flex items-center gap-2 rounded-2xl border border-purple-400/50 bg-purple-700/30 px-5 py-3 text-sm font-black uppercase text-purple-100 transition hover:bg-purple-600/50"
            >
              <FaPlay />
              Assistir
            </a>
          ) : (
            <span className="rounded-2xl border border-purple-500/25 px-5 py-3 text-xs font-black uppercase text-zinc-500">
              Sem link
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export function PublicCalendarList({
  upcomingEvents,
  pastEvents,
}: PublicCalendarListProps) {
  return (
    <section className="lgz-container py-10">
      <div className="mb-8">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">
          Agenda
        </p>

        <h2 className="mt-3 text-4xl font-black uppercase md:text-5xl">
          Próximos eventos
        </h2>
      </div>

      <div className="grid gap-5">
        {upcomingEvents.map((event) => (
          <EventCard key={event.id} event={event} variant="upcoming" />
        ))}

        {upcomingEvents.length === 0 && (
          <div className="lgz-panel rounded-3xl p-8 text-center">
            <FaCalendarAlt className="mx-auto mb-5 text-5xl text-purple-300" />

            <h3 className="text-3xl font-black uppercase">
              Nenhum evento futuro
            </h3>

            <p className="mt-3 text-zinc-400">
              Cadastre novos jogos no painel administrativo.
            </p>
          </div>
        )}
      </div>

      <div className="mt-12 mb-8">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">
          Histórico
        </p>

        <h2 className="mt-3 text-4xl font-black uppercase md:text-5xl">
          Eventos anteriores
        </h2>
      </div>

      <div className="grid gap-5">
        {pastEvents.map((event) => (
          <EventCard key={event.id} event={event} variant="past" />
        ))}

        {pastEvents.length === 0 && (
          <div className="rounded-3xl border border-purple-500/25 bg-black/35 p-8 text-center text-zinc-400">
            Nenhum evento anterior registrado.
          </div>
        )}
      </div>
    </section>
  );
}