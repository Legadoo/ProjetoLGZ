import Link from "next/link";
import { FaDiscord, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";

export function PublicFooter() {
  return (
    <footer className="mt-10 border-t border-purple-500/30 bg-black/70">
      <div className="lgz-container grid gap-8 py-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <strong className="block text-3xl font-black uppercase text-white">
            Legendaryz
          </strong>

          <p className="mt-4 max-w-md text-sm leading-7 text-zinc-400">
            Organização de e-sports, comunidade gamer e plataforma digital.
            Seja lendário, faça parte da família LGZ.
          </p>

          <div className="mt-6 flex gap-3 text-purple-300">
            <a href="https://instagram.com/legendaryzgg" target="_blank" className="grid h-11 w-11 place-items-center rounded-xl border border-purple-500/30 bg-purple-950/30 transition hover:bg-purple-700/40 hover:text-white" aria-label="Instagram Legendaryz">
              <FaInstagram />
            </a>

            <a href="#" className="grid h-11 w-11 place-items-center rounded-xl border border-purple-500/30 bg-purple-950/30 transition hover:bg-purple-700/40 hover:text-white" aria-label="YouTube Legendaryz">
              <FaYoutube />
            </a>

            <a href="#" className="grid h-11 w-11 place-items-center rounded-xl border border-purple-500/30 bg-purple-950/30 transition hover:bg-purple-700/40 hover:text-white" aria-label="Discord Legendaryz">
              <FaDiscord />
            </a>

            <a href="#" className="grid h-11 w-11 place-items-center rounded-xl border border-purple-500/30 bg-purple-950/30 transition hover:bg-purple-700/40 hover:text-white" aria-label="TikTok Legendaryz">
              <FaTiktok />
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-black uppercase tracking-[0.25em] text-purple-300">
            Plataforma
          </h3>

          <div className="grid gap-3 text-sm text-zinc-400">
            <Link href="/loja" className="hover:text-purple-200">Loja</Link>
            <Link href="/lgznetwork" className="hover:text-purple-200">LGZNetwork</Link>
            <Link href="/calendario" className="hover:text-purple-200">Calendário</Link>
            <Link href="/times" className="hover:text-purple-200">Times</Link>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-black uppercase tracking-[0.25em] text-purple-300">
            Legendaryz
          </h3>

          <div className="grid gap-3 text-sm text-zinc-400">
            <Link href="/influenciadores" className="hover:text-purple-200">Influenciadores</Link>
            <Link href="/staff" className="hover:text-purple-200">Staff</Link>
            <Link href="/sobre" className="hover:text-purple-200">Sobre nós</Link>
            <Link href="/login" className="hover:text-purple-200">Login</Link>
          </div>
        </div>
      </div>

      <div className="border-t border-purple-500/20 py-5">
        <div className="lgz-container flex flex-col gap-3 text-sm text-zinc-500 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Legendaryz. Todos os direitos reservados.</p>
          <p>Projeto LGZ — plataforma oficial.</p>
        </div>
      </div>
    </footer>
  );
}