import { FaCog, FaPalette, FaSave } from "react-icons/fa";
import { updateSiteConfigAction } from "@/actions/site.actions";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminStatCard } from "@/components/admin/AdminStatCard";
import { requireAdminUser } from "@/lib/session";
import { getSiteConfig } from "@/services/site.service";

export default async function AdminConfiguracoesPage() {
  await requireAdminUser();

  const config = await getSiteConfig();

  return (
    <>
      <AdminPageHeader
        eyebrow="Identidade do site"
        title="Configurações"
        description="Gerencie informações globais do site público: marca, logo, favicon, cores, redes sociais e texto do rodapé."
        icon={FaCog}
        actionLabel="Configurações gerais"
      />

      <section className="mb-6 grid gap-4 md:grid-cols-3">
        <AdminStatCard
          title="Marca"
          value={config.brandName}
          description="Nome exibido no site público."
          icon={FaCog}
        />

        <AdminStatCard
          title="Cor primária"
          value={config.primaryColor}
          description="Referência principal da identidade visual."
          icon={FaPalette}
        />

        <AdminStatCard
          title="Cor secundária"
          value={config.secondaryColor}
          description="Referência complementar da identidade visual."
          icon={FaPalette}
        />
      </section>

      <section className="rounded-3xl border border-purple-500/25 bg-black/35 p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl border border-purple-500/40 bg-purple-950/40 text-purple-200">
            <FaCog />
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-purple-400">
              Dados globais
            </p>
            <h2 className="text-2xl font-black uppercase">
              Configurações do site
            </h2>
          </div>
        </div>

        <form action={updateSiteConfigAction} className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-xs font-black uppercase text-zinc-400">Nome da marca</span>
            <input
              name="brandName"
              defaultValue={config.brandName}
              required
              className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-xs font-black uppercase text-zinc-400">Logo URL</span>
            <input
              name="logoUrl"
              defaultValue={config.logoUrl || ""}
              placeholder="Opcional: https://..."
              className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-xs font-black uppercase text-zinc-400">Favicon URL</span>
            <input
              name="faviconUrl"
              defaultValue={config.faviconUrl || ""}
              placeholder="Opcional"
              className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-xs font-black uppercase text-zinc-400">Cor primária</span>
            <input
              name="primaryColor"
              defaultValue={config.primaryColor}
              className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-xs font-black uppercase text-zinc-400">Cor secundária</span>
            <input
              name="secondaryColor"
              defaultValue={config.secondaryColor}
              className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-xs font-black uppercase text-zinc-400">Instagram</span>
            <input
              name="instagramUrl"
              defaultValue={config.instagramUrl || ""}
              placeholder="https://instagram.com/legendaryzgg"
              className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-xs font-black uppercase text-zinc-400">TikTok</span>
            <input
              name="tiktokUrl"
              defaultValue={config.tiktokUrl || ""}
              placeholder="https://tiktok.com/@..."
              className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-xs font-black uppercase text-zinc-400">YouTube</span>
            <input
              name="youtubeUrl"
              defaultValue={config.youtubeUrl || ""}
              placeholder="https://youtube.com/..."
              className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-xs font-black uppercase text-zinc-400">Discord</span>
            <input
              name="discordUrl"
              defaultValue={config.discordUrl || ""}
              placeholder="https://discord.gg/..."
              className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300"
            />
          </label>

          <label className="grid gap-2 md:col-span-2">
            <span className="text-xs font-black uppercase text-zinc-400">Texto do rodapé</span>
            <textarea
              name="footerText"
              defaultValue={config.footerText || ""}
              placeholder="Texto institucional do rodapé"
              className="min-h-28 rounded-xl border border-purple-500/25 bg-black/40 p-4 text-white outline-none focus:border-purple-300"
            />
          </label>

          <button className="flex items-center justify-center gap-2 rounded-2xl border border-purple-400/50 bg-purple-700/30 px-5 py-4 text-sm font-black uppercase text-purple-100 transition hover:bg-purple-600/50 md:col-span-2">
            <FaSave />
            Salvar configurações
          </button>
        </form>
      </section>
    </>
  );
}