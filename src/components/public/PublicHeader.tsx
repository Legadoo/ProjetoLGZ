import Link from "next/link";

const navItems = [
  { href: "/", label: "Home", description: "Principal" },
  { href: "/loja", label: "Loja", description: "Loja da E-sports" },
  { href: "/lgznetwork", label: "LGZNetwork", description: "Loja do servidor" },
  { href: "/calendario", label: "Calendário", description: "Próximos jogos" },
  { href: "/times", label: "Times", description: "Jogadores" },
  { href: "/influenciadores", label: "Influenciadores", description: "Criadores" },
  { href: "/staff", label: "Staff", description: "Equipe" },
  { href: "/sobre", label: "Sobre nós", description: "História LGZ" },
];

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-purple-500/30 bg-black/75 backdrop-blur-xl">
      <div className="lgz-container flex min-h-24 items-center gap-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="grid h-14 w-14 place-items-center rounded-2xl border border-purple-500/40 bg-purple-950/40 text-2xl font-black text-purple-300">
            LGZ
          </div>
          <div>
            <strong className="block text-xl uppercase tracking-wider">Legendaryz</strong>
            <span className="text-xs uppercase text-purple-300">Seja lendário</span>
          </div>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-2 xl:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl border border-transparent px-4 py-3 text-sm transition hover:border-purple-500/40 hover:bg-purple-950/30"
            >
              <strong className="block uppercase">{item.label}</strong>
              <span className="text-xs text-zinc-400">{item.description}</span>
            </Link>
          ))}
        </nav>

        <Link href="/cadastro" className="ml-auto hidden rounded-xl border border-purple-500/50 px-5 py-3 text-sm font-black uppercase text-purple-200 transition hover:bg-purple-950/40 md:block">
          Cadastro
        </Link>

        <button className="ml-auto text-4xl text-purple-400 xl:hidden" aria-label="Abrir menu">
          ☰
        </button>
      </div>
    </header>
  );
}
