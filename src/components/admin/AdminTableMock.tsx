type AdminTableMockProps = {
  title: string;
  description: string;
  rows: Array<{
    name: string;
    type: string;
    status: string;
    updatedAt: string;
  }>;
};

export function AdminTableMock({
  title,
  description,
  rows,
}: AdminTableMockProps) {
  return (
    <section className="overflow-hidden rounded-3xl border border-purple-500/25 bg-black/35">
      <div className="border-b border-purple-500/20 p-6">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">
          Dados recentes
        </p>

        <h2 className="mt-2 text-2xl font-black uppercase">
          {title}
        </h2>

        <p className="mt-2 text-sm leading-6 text-zinc-400">
          {description}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse">
          <thead>
            <tr className="border-b border-purple-500/20 bg-purple-950/20 text-left text-xs uppercase tracking-[0.22em] text-zinc-500">
              <th className="px-6 py-4">Nome</th>
              <th className="px-6 py-4">Tipo</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Atualização</th>
              <th className="px-6 py-4 text-right">Ação</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => (
              <tr key={`${row.name}-${row.type}`} className="border-b border-purple-500/10 text-sm">
                <td className="px-6 py-5 font-bold text-white">{row.name}</td>
                <td className="px-6 py-5 text-zinc-400">{row.type}</td>
                <td className="px-6 py-5">
                  <span className="rounded-full border border-emerald-500/30 bg-emerald-950/20 px-3 py-1 text-xs font-black uppercase text-emerald-300">
                    {row.status}
                  </span>
                </td>
                <td className="px-6 py-5 text-zinc-400">{row.updatedAt}</td>
                <td className="px-6 py-5 text-right">
                  <button className="rounded-xl border border-purple-500/30 px-4 py-2 text-xs font-black uppercase text-purple-200 transition hover:bg-purple-700/30">
                    Ver
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}