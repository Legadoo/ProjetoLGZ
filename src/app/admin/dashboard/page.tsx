const cards = [
  "Produtos",
  "Pedidos",
  "Clientes",
  "Influenciadores",
  "Times",
  "Calendário",
];

export default function AdminDashboardPage() {
  return (
    <section>
      <p className="text-sm font-black uppercase tracking-widest text-purple-400">Visão geral</p>
      <h1 className="mt-3 text-4xl font-black uppercase">Dashboard</h1>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <div key={card} className="lgz-panel rounded-2xl p-6">
            <p className="text-sm uppercase text-zinc-400">Módulo</p>
            <h2 className="mt-2 text-2xl font-black uppercase text-purple-300">{card}</h2>
            <p className="mt-3 text-sm text-zinc-400">Estrutura preparada para a próxima fase.</p>
          </div>
        ))}
      </div>
    </section>
  );
}
