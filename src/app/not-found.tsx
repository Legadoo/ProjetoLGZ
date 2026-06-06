import Link from "next/link";
import { FaHome, FaSearch } from "react-icons/fa";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#050008] text-white">
      <section className="lgz-container flex min-h-screen items-center justify-center py-16">
        <div className="max-w-3xl text-center">
          <div className="mx-auto mb-8 grid h-28 w-28 place-items-center rounded-[2rem] border border-purple-500/50 bg-purple-950/30 text-5xl font-black text-purple-100 shadow-[0_0_60px_rgba(176,38,255,0.35)]">
            404
          </div>

          <p className="text-xs font-black uppercase tracking-[0.35em] text-purple-400">
            Página não encontrada
          </p>

          <h1 className="mt-4 text-5xl font-black uppercase leading-none md:text-7xl">
            Essa rota saiu do mapa
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
            A página que você tentou acessar não existe ou foi movida dentro da plataforma Legendaryz.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/" className="lgz-button">
              <FaHome />
              Voltar para Home
            </Link>

            <Link href="/influenciadores" className="lgz-button lgz-button-outline">
              <FaSearch />
              Ver influenciadores
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}