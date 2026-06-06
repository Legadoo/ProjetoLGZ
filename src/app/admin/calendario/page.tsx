import { FaCalendarAlt, FaClock, FaPlus } from "react-icons/fa";
import {
  createMatchEventAction,
  toggleMatchEventStatusAction,
} from "@/actions/calendar.actions";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminStatCard } from "@/components/admin/AdminStatCard";
import { requireAdminUser } from "@/lib/session";
import {
  formatDateTimeBR,
  getAdminMatchEvents,
} from "@/services/calendar.service";

export default async function AdminCalendarioPage() {
  await requireAdminUser();

  const events = await getAdminMatchEvents();
  const now = new Date();
  const activeEvents = events.filter((event) => event.active).length;
  const upcomingEvents = events.filter((event) => event.startsAt >= now).length;

  return (
    <>
      <AdminPageHeader
        eyebrow="Agenda Legendaryz"
        title="Calendário"
        description="Cadastre jogos, eventos, treinos, campeonatos, lives e atividades públicas da Legendaryz."
        icon={FaCalendarAlt}
        actionLabel="Gestão de eventos"
      />

      <section className="mb-6 grid gap-4 md:grid-cols-3">
        <AdminStatCard
          title="Eventos"
          value={String(events.length)}
          description="Total de eventos cadastrados."
          icon={FaCalendarAlt}
        />

        <AdminStatCard
          title="Ativos"
          value={String(activeEvents)}
          description="Eventos visíveis no site público."
          icon={FaCalendarAlt}
        />

        <AdminStatCard
          title="Futuros"
          value={String(upcomingEvents)}
          description="Eventos com data futura."
          icon={FaClock}
        />
      </section>

      <section className="mb-6 rounded-3xl border border-purple-500/25 bg-black/35 p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl border border-purple-500/40 bg-purple-950/40 text-purple-200">
            <FaPlus />
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-purple-400">
              Novo evento
            </p>
            <h2 className="text-2xl font-black uppercase">
              Cadastrar jogo/evento
            </h2>
          </div>
        </div>

        <form action={createMatchEventAction} className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-xs font-black uppercase text-zinc-400">Título</span>
            <input
              name="title"
              required
              placeholder="Ex: Legendaryz vs Rival Team"
              className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-xs font-black uppercase text-zinc-400">Jogo/modalidade</span>
            <input
              name="game"
              placeholder="Ex: Blood Strike"
              className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-xs font-black uppercase text-zinc-400">Adversário/evento</span>
            <input
              name="opponent"
              placeholder="Ex: Rival Team"
              className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-xs font-black uppercase text-zinc-400">Data e hora</span>
            <input
              name="startsAt"
              required
              type="datetime-local"
              className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300"
            />
          </label>

          <label className="grid gap-2 md:col-span-2">
            <span className="text-xs font-black uppercase text-zinc-400">Link de transmissão</span>
            <input
              name="streamUrl"
              placeholder="Opcional: YouTube, Twitch, Kick..."
              className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300"
            />
          </label>

          <label className="grid gap-2 md:col-span-2">
            <span className="text-xs font-black uppercase text-zinc-400">Descrição</span>
            <textarea
              name="description"
              placeholder="Descrição do evento"
              className="min-h-28 rounded-xl border border-purple-500/25 bg-black/40 p-4 text-white outline-none focus:border-purple-300"
            />
          </label>

          <button className="flex items-center justify-center gap-2 rounded-2xl border border-purple-400/50 bg-purple-700/30 px-5 py-3 text-sm font-black uppercase text-purple-100 transition hover:bg-purple-600/50 md:col-span-2">
            <FaPlus />
            Criar evento
          </button>
        </form>
      </section>

      <section className="overflow-hidden rounded-3xl border border-purple-500/25 bg-black/35">
        <div className="border-b border-purple-500/20 p-6">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">
            Eventos cadastrados
          </p>

          <h2 className="mt-2 text-2xl font-black uppercase">
            Lista do calendário
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] border-collapse">
            <thead>
              <tr className="border-b border-purple-500/20 bg-purple-950/20 text-left text-xs uppercase tracking-[0.22em] text-zinc-500">
                <th className="px-6 py-4">Evento</th>
                <th className="px-6 py-4">Jogo</th>
                <th className="px-6 py-4">Adversário</th>
                <th className="px-6 py-4">Data</th>
                <th className="px-6 py-4">Transmissão</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Ação</th>
              </tr>
            </thead>

            <tbody>
              {events.map((event) => (
                <tr key={event.id} className="border-b border-purple-500/10 text-sm">
                  <td className="px-6 py-5">
                    <p className="font-bold text-white">{event.title}</p>
                    <p className="mt-1 line-clamp-1 text-xs text-zinc-500">
                      {event.description || "Sem descrição"}
                    </p>
                  </td>

                  <td className="px-6 py-5 text-zinc-400">
                    {event.game || "-"}
                  </td>

                  <td className="px-6 py-5 text-zinc-400">
                    {event.opponent || "-"}
                  </td>

                  <td className="px-6 py-5 text-zinc-400">
                    {formatDateTimeBR(event.startsAt)}
                  </td>

                  <td className="px-6 py-5 text-zinc-400">
                    {event.streamUrl ? "Sim" : "Não"}
                  </td>

                  <td className="px-6 py-5">
                    <span className={`rounded-full border px-3 py-1 text-xs font-black uppercase ${
                      event.active
                        ? "border-emerald-500/30 bg-emerald-950/20 text-emerald-300"
                        : "border-red-500/30 bg-red-950/20 text-red-300"
                    }`}>
                      {event.active ? "Ativo" : "Inativo"}
                    </span>
                  </td>

                  <td className="px-6 py-5 text-right">
                    <form action={toggleMatchEventStatusAction}>
                      <input type="hidden" name="id" value={event.id} />
                      <input type="hidden" name="active" value={String(event.active)} />

                      <button className="rounded-xl border border-purple-500/30 px-4 py-2 text-xs font-black uppercase text-purple-200 transition hover:bg-purple-700/30">
                        {event.active ? "Desativar" : "Ativar"}
                      </button>
                    </form>
                  </td>
                </tr>
              ))}

              {events.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-zinc-400">
                    Nenhum evento cadastrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}