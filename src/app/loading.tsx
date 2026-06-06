export default function Loading() {
  return (
    <main className="min-h-screen bg-[#050008] text-white">
      <section className="flex min-h-screen items-center justify-center px-6">
        <div className="text-center">
          <div className="mx-auto mb-6 grid h-24 w-24 animate-pulse place-items-center rounded-3xl border border-purple-500/50 bg-purple-950/30 text-3xl font-black text-purple-100 shadow-[0_0_50px_rgba(176,38,255,0.35)]">
            LGZ
          </div>

          <p className="text-xs font-black uppercase tracking-[0.35em] text-purple-400">
            Carregando Legendaryz
          </p>

          <h1 className="mt-4 text-4xl font-black uppercase md:text-5xl">
            Preparando experiência
          </h1>

          <p className="mt-4 text-sm text-zinc-400">
            Aguarde um instante...
          </p>
        </div>
      </section>
    </main>
  );
}