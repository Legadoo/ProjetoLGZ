import { FaPlus, FaTrophy } from "react-icons/fa";
import { createTeamAction, toggleTeamStatusAction } from "@/actions/content.actions";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminStatCard } from "@/components/admin/AdminStatCard";
import { requireAdminUser } from "@/lib/session";
import { getAdminTeamsData } from "@/services/content.service";

export default async function AdminTimesPage() {
  await requireAdminUser();

  const teams = await getAdminTeamsData();
  const activeTeams = teams.filter((team) => team.active).length;
  const playersCount = teams.reduce((total, team) => total + team.players.length, 0);

  return (
    <>
      <AdminPageHeader
        eyebrow="Gestão competitiva"
        title="Times"
        description="Gerencie os times da Legendaryz, modalidades, descrição, logo e status público."
        icon={FaTrophy}
        actionLabel="Times LGZ"
      />

      <section className="mb-6 grid gap-4 md:grid-cols-3">
        <AdminStatCard title="Times" value={String(teams.length)} description="Total de times cadastrados." icon={FaTrophy} />
        <AdminStatCard title="Ativos" value={String(activeTeams)} description="Times visíveis no site público." icon={FaTrophy} />
        <AdminStatCard title="Jogadores" value={String(playersCount)} description="Jogadores vinculados aos times." icon={FaTrophy} />
      </section>

      <section className="mb-6 rounded-3xl border border-purple-500/25 bg-black/35 p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl border border-purple-500/40 bg-purple-950/40 text-purple-200">
            <FaPlus />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-purple-400">Novo time</p>
            <h2 className="text-2xl font-black uppercase">Cadastrar time</h2>
          </div>
        </div>

        <form action={createTeamAction} className="grid gap-4 md:grid-cols-2">
          <input name="name" required placeholder="Nome do time" className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300" />
          <input name="game" required placeholder="Jogo/modalidade" className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300" />
          <input name="logoUrl" placeholder="URL da logo" className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300 md:col-span-2" />
          <textarea name="description" placeholder="Descrição do time" className="min-h-28 rounded-xl border border-purple-500/25 bg-black/40 p-4 text-white outline-none focus:border-purple-300 md:col-span-2" />
          <button className="flex items-center justify-center gap-2 rounded-2xl border border-purple-400/50 bg-purple-700/30 px-5 py-3 text-sm font-black uppercase text-purple-100 transition hover:bg-purple-600/50 md:col-span-2">
            <FaPlus />
            Criar time
          </button>
        </form>
      </section>

      <section className="overflow-hidden rounded-3xl border border-purple-500/25 bg-black/35">
        <div className="border-b border-purple-500/20 p-6">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">Times cadastrados</p>
          <h2 className="mt-2 text-2xl font-black uppercase">Lista de times</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] border-collapse">
            <thead>
              <tr className="border-b border-purple-500/20 bg-purple-950/20 text-left text-xs uppercase tracking-[0.22em] text-zinc-500">
                <th className="px-6 py-4">Time</th>
                <th className="px-6 py-4">Jogo</th>
                <th className="px-6 py-4">Jogadores</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Ação</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team.id} className="border-b border-purple-500/10 text-sm">
                  <td className="px-6 py-5 font-bold text-white">{team.name}</td>
                  <td className="px-6 py-5 text-zinc-400">{team.game}</td>
                  <td className="px-6 py-5 text-zinc-400">{team.players.length}</td>
                  <td className="px-6 py-5">
                    <span className={`rounded-full border px-3 py-1 text-xs font-black uppercase ${team.active ? "border-emerald-500/30 bg-emerald-950/20 text-emerald-300" : "border-red-500/30 bg-red-950/20 text-red-300"}`}>
                      {team.active ? "Ativo" : "Inativo"}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <form action={toggleTeamStatusAction}>
                      <input type="hidden" name="id" value={team.id} />
                      <input type="hidden" name="active" value={String(team.active)} />
                      <button className="rounded-xl border border-purple-500/30 px-4 py-2 text-xs font-black uppercase text-purple-200 transition hover:bg-purple-700/30">
                        {team.active ? "Desativar" : "Ativar"}
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
              {teams.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-zinc-400">Nenhum time cadastrado.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}