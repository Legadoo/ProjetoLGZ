import { FaPlus, FaUsersCog } from "react-icons/fa";
import { createPlayerAction, togglePlayerStatusAction } from "@/actions/content.actions";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminStatCard } from "@/components/admin/AdminStatCard";
import { requireAdminUser } from "@/lib/session";
import { getAdminPlayersData } from "@/services/content.service";

export default async function AdminJogadoresPage() {
  await requireAdminUser();

  const { players, teams } = await getAdminPlayersData();
  const activePlayers = players.filter((player) => player.active).length;

  return (
    <>
      <AdminPageHeader
        eyebrow="Elenco LGZ"
        title="Jogadores"
        description="Cadastre jogadores, nicknames, funções, biografias, imagens e vínculo com os times da Legendaryz."
        icon={FaUsersCog}
        actionLabel="Jogadores"
      />

      <section className="mb-6 grid gap-4 md:grid-cols-3">
        <AdminStatCard title="Jogadores" value={String(players.length)} description="Total de jogadores cadastrados." icon={FaUsersCog} />
        <AdminStatCard title="Ativos" value={String(activePlayers)} description="Jogadores visíveis publicamente." icon={FaUsersCog} />
        <AdminStatCard title="Times" value={String(teams.length)} description="Times disponíveis para vínculo." icon={FaUsersCog} />
      </section>

      <section className="mb-6 rounded-3xl border border-purple-500/25 bg-black/35 p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl border border-purple-500/40 bg-purple-950/40 text-purple-200">
            <FaPlus />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-purple-400">Novo jogador</p>
            <h2 className="text-2xl font-black uppercase">Cadastrar jogador</h2>
          </div>
        </div>

        <form action={createPlayerAction} className="grid gap-4 md:grid-cols-2">
          <input name="nickname" required placeholder="Nickname" className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300" />
          <input name="realName" placeholder="Nome real" className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300" />
          <input name="role" placeholder="Função/posição" className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300" />
          <select name="teamId" className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300">
            <option value="">Sem time</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>{team.name} — {team.game}</option>
            ))}
          </select>
          <input name="imageUrl" placeholder="URL da imagem" className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300 md:col-span-2" />
          <textarea name="bio" placeholder="Biografia do jogador" className="min-h-28 rounded-xl border border-purple-500/25 bg-black/40 p-4 text-white outline-none focus:border-purple-300 md:col-span-2" />
          <button className="flex items-center justify-center gap-2 rounded-2xl border border-purple-400/50 bg-purple-700/30 px-5 py-3 text-sm font-black uppercase text-purple-100 transition hover:bg-purple-600/50 md:col-span-2">
            <FaPlus />
            Criar jogador
          </button>
        </form>
      </section>

      <section className="overflow-hidden rounded-3xl border border-purple-500/25 bg-black/35">
        <div className="border-b border-purple-500/20 p-6">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">Jogadores cadastrados</p>
          <h2 className="mt-2 text-2xl font-black uppercase">Lista de jogadores</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[920px] border-collapse">
            <thead>
              <tr className="border-b border-purple-500/20 bg-purple-950/20 text-left text-xs uppercase tracking-[0.22em] text-zinc-500">
                <th className="px-6 py-4">Nickname</th>
                <th className="px-6 py-4">Nome</th>
                <th className="px-6 py-4">Função</th>
                <th className="px-6 py-4">Time</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Ação</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player) => (
                <tr key={player.id} className="border-b border-purple-500/10 text-sm">
                  <td className="px-6 py-5 font-bold text-white">{player.nickname}</td>
                  <td className="px-6 py-5 text-zinc-400">{player.realName || "-"}</td>
                  <td className="px-6 py-5 text-zinc-400">{player.role || "-"}</td>
                  <td className="px-6 py-5 text-zinc-400">{player.team?.name || "Sem time"}</td>
                  <td className="px-6 py-5">
                    <span className={`rounded-full border px-3 py-1 text-xs font-black uppercase ${player.active ? "border-emerald-500/30 bg-emerald-950/20 text-emerald-300" : "border-red-500/30 bg-red-950/20 text-red-300"}`}>
                      {player.active ? "Ativo" : "Inativo"}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <form action={togglePlayerStatusAction}>
                      <input type="hidden" name="id" value={player.id} />
                      <input type="hidden" name="active" value={String(player.active)} />
                      <button className="rounded-xl border border-purple-500/30 px-4 py-2 text-xs font-black uppercase text-purple-200 transition hover:bg-purple-700/30">
                        {player.active ? "Desativar" : "Ativar"}
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
              {players.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-zinc-400">Nenhum jogador cadastrado.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}