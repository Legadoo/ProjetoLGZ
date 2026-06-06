import { FaGamepad, FaTrophy, FaUser } from "react-icons/fa";

type PublicTeamGridProps = {
  teams: Array<{
    id: string;
    name: string;
    game: string;
    description: string | null;
    logoUrl: string | null;
    players: Array<{
      id: string;
      nickname: string;
      realName: string | null;
      role: string | null;
      imageUrl: string | null;
      bio: string | null;
    }>;
  }>;
};

export function PublicTeamGrid({ teams }: PublicTeamGridProps) {
  return (
    <section className="lgz-container py-10">
      {teams.length === 0 ? (
        <div className="lgz-panel rounded-3xl p-8 text-center">
          <FaTrophy className="mx-auto mb-5 text-5xl text-purple-300" />
          <h2 className="text-3xl font-black uppercase">Nenhum time ativo</h2>
          <p className="mt-3 text-zinc-400">Cadastre times no painel administrativo.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {teams.map((team) => (
            <article key={team.id} className="lgz-panel overflow-hidden rounded-[2rem]">
              <div className="grid gap-6 p-6 lg:grid-cols-[320px_1fr]">
                <div className="grid min-h-64 place-items-center rounded-3xl border border-purple-500/30 bg-[radial-gradient(circle,rgba(176,38,255,0.25),transparent_60%),linear-gradient(135deg,#150024,#050008)]">
                  {team.logoUrl ? (
                    <img src={team.logoUrl} alt={team.name} className="max-h-44 max-w-44 object-contain" />
                  ) : (
                    <div className="grid h-36 w-36 place-items-center rounded-full border border-purple-500/40 bg-black/40 text-5xl text-purple-200">
                      <FaTrophy />
                    </div>
                  )}
                </div>

                <div>
                  <p className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-950/30 px-4 py-2 text-xs font-black uppercase text-purple-200">
                    <FaGamepad />
                    {team.game}
                  </p>

                  <h2 className="mt-4 text-4xl font-black uppercase md:text-5xl">
                    {team.name}
                  </h2>

                  <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-400">
                    {team.description || "Time oficial da Legendaryz."}
                  </p>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {team.players.map((player) => (
                      <div key={player.id} className="rounded-2xl border border-purple-500/20 bg-black/30 p-4">
                        <div className="mb-4 grid h-16 w-16 place-items-center rounded-2xl border border-purple-500/30 bg-purple-950/30 text-purple-200">
                          <FaUser />
                        </div>

                        <h3 className="text-xl font-black uppercase">{player.nickname}</h3>

                        <p className="mt-1 text-xs font-bold uppercase text-purple-300">
                          {player.role || "Player"}
                        </p>

                        <p className="mt-3 text-sm leading-6 text-zinc-400">
                          {player.bio || "Jogador da Legendaryz."}
                        </p>
                      </div>
                    ))}

                    {team.players.length === 0 && (
                      <div className="rounded-2xl border border-purple-500/20 bg-black/30 p-4 text-sm text-zinc-400">
                        Nenhum jogador ativo vinculado ainda.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}