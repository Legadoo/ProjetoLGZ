import { FaDiscord, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";

export function PublicFooter() {
  return (
    <footer className="mt-10 border-t border-purple-500/30 bg-black/60">
      <div className="lgz-container flex flex-col gap-4 py-8 text-sm text-zinc-400 md:flex-row md:items-center md:justify-between">
        <strong className="text-2xl uppercase text-white">Legendaryz</strong>

        <p>© 2026 Legendaryz. Todos os direitos reservados.</p>

        <div className="flex gap-3 text-purple-300">
          <a
            href="https://instagram.com/legendaryzgg"
            target="_blank"
            className="grid h-10 w-10 place-items-center rounded-xl border border-purple-500/30 bg-purple-950/30 transition hover:bg-purple-700/40 hover:text-white"
            aria-label="Instagram Legendaryz"
          >
            <FaInstagram />
          </a>

          <a
            href="#"
            className="grid h-10 w-10 place-items-center rounded-xl border border-purple-500/30 bg-purple-950/30 transition hover:bg-purple-700/40 hover:text-white"
            aria-label="YouTube Legendaryz"
          >
            <FaYoutube />
          </a>

          <a
            href="#"
            className="grid h-10 w-10 place-items-center rounded-xl border border-purple-500/30 bg-purple-950/30 transition hover:bg-purple-700/40 hover:text-white"
            aria-label="Discord Legendaryz"
          >
            <FaDiscord />
          </a>

          <a
            href="#"
            className="grid h-10 w-10 place-items-center rounded-xl border border-purple-500/30 bg-purple-950/30 transition hover:bg-purple-700/40 hover:text-white"
            aria-label="TikTok Legendaryz"
          >
            <FaTiktok />
          </a>
        </div>
      </div>
    </footer>
  );
}