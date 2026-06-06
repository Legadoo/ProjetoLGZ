import { FaPlus, FaStar } from "react-icons/fa";
import { createInfluencerAction, toggleInfluencerStatusAction } from "@/actions/content.actions";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminStatCard } from "@/components/admin/AdminStatCard";
import { requireAdminUser } from "@/lib/session";
import { getAdminInfluencersData } from "@/services/content.service";

export default async function AdminInfluenciadoresPage() {
  await requireAdminUser();

  const influencers = await getAdminInfluencersData();
  const activeInfluencers = influencers.filter((item) => item.active).length;
  const featuredInfluencers = influencers.filter((item) => item.featured).length;

  return (
    <>
      <AdminPageHeader
        eyebrow="Criadores de conteúdo"
        title="Influenciadores"
        description="Gerencie influenciadores, slugs, biografias, redes sociais e páginas individuais públicas da Legendaryz."
        icon={FaStar}
        actionLabel="Influenciadores"
      />

      <section className="mb-6 grid gap-4 md:grid-cols-3">
        <AdminStatCard title="Influenciadores" value={String(influencers.length)} description="Total de influenciadores cadastrados." icon={FaStar} />
        <AdminStatCard title="Ativos" value={String(activeInfluencers)} description="Influenciadores visíveis publicamente." icon={FaStar} />
        <AdminStatCard title="Destaques" value={String(featuredInfluencers)} description="Marcados como destaque." icon={FaStar} />
      </section>

      <section className="mb-6 rounded-3xl border border-purple-500/25 bg-black/35 p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl border border-purple-500/40 bg-purple-950/40 text-purple-200">
            <FaPlus />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-purple-400">Novo influenciador</p>
            <h2 className="text-2xl font-black uppercase">Cadastrar perfil</h2>
          </div>
        </div>

        <form action={createInfluencerAction} className="grid gap-4 md:grid-cols-2">
          <input name="name" required placeholder="Nome" className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300" />
          <input name="nickname" placeholder="Nickname" className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300" />
          <input name="slug" placeholder="Slug opcional. Ex: chapolin" className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300" />
          <input name="contentCategory" placeholder="Categoria de conteúdo" className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300" />
          <input name="profileImageUrl" placeholder="URL da foto principal" className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300" />
          <input name="bannerImageUrl" placeholder="URL do banner" className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300" />
          <input name="highlightPhrase" placeholder="Frase destaque" className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300 md:col-span-2" />
          <textarea name="shortBio" placeholder="Bio curta" className="min-h-24 rounded-xl border border-purple-500/25 bg-black/40 p-4 text-white outline-none focus:border-purple-300 md:col-span-2" />
          <textarea name="fullBio" placeholder="Bio completa" className="min-h-28 rounded-xl border border-purple-500/25 bg-black/40 p-4 text-white outline-none focus:border-purple-300 md:col-span-2" />
          <textarea name="legendaryzStory" placeholder="História dentro da Legendaryz" className="min-h-28 rounded-xl border border-purple-500/25 bg-black/40 p-4 text-white outline-none focus:border-purple-300 md:col-span-2" />
          <input name="instagramUrl" placeholder="Instagram URL" className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300" />
          <input name="tiktokUrl" placeholder="TikTok URL" className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300" />
          <input name="youtubeUrl" placeholder="YouTube URL" className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300" />
          <input name="twitchUrl" placeholder="Twitch URL" className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300" />
          <input name="twitterUrl" placeholder="Twitter/X URL" className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300" />
          <input name="kickUrl" placeholder="Kick URL" className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300" />
          <input name="sortOrder" type="number" defaultValue="0" placeholder="Ordem" className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300" />

          <div className="flex flex-wrap gap-3 rounded-xl border border-purple-500/25 bg-black/30 p-4 md:col-span-2">
            <label className="flex items-center gap-2 text-sm font-black uppercase text-purple-200">
              <input name="featured" type="checkbox" />
              Destaque
            </label>
            <label className="flex items-center gap-2 text-sm font-black uppercase text-purple-200">
              <input name="showOnHome" type="checkbox" />
              Aparecer na Home
            </label>
            <label className="flex items-center gap-2 text-sm font-black uppercase text-purple-200">
              <input name="showOnInfluencersPage" type="checkbox" defaultChecked />
              Aparecer na página de influenciadores
            </label>
          </div>

          <button className="flex items-center justify-center gap-2 rounded-2xl border border-purple-400/50 bg-purple-700/30 px-5 py-3 text-sm font-black uppercase text-purple-100 transition hover:bg-purple-600/50 md:col-span-2">
            <FaPlus />
            Criar influenciador
          </button>
        </form>
      </section>

      <section className="overflow-hidden rounded-3xl border border-purple-500/25 bg-black/35">
        <div className="border-b border-purple-500/20 p-6">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">Influenciadores cadastrados</p>
          <h2 className="mt-2 text-2xl font-black uppercase">Lista de influenciadores</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] border-collapse">
            <thead>
              <tr className="border-b border-purple-500/20 bg-purple-950/20 text-left text-xs uppercase tracking-[0.22em] text-zinc-500">
                <th className="px-6 py-4">Nome</th>
                <th className="px-6 py-4">Slug</th>
                <th className="px-6 py-4">Categoria</th>
                <th className="px-6 py-4">Home</th>
                <th className="px-6 py-4">Página</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Ação</th>
              </tr>
            </thead>
            <tbody>
              {influencers.map((influencer) => (
                <tr key={influencer.id} className="border-b border-purple-500/10 text-sm">
                  <td className="px-6 py-5">
                    <p className="font-bold text-white">{influencer.nickname || influencer.name}</p>
                    <p className="text-xs text-zinc-500">{influencer.name}</p>
                  </td>
                  <td className="px-6 py-5 text-purple-300">/{influencer.slug}</td>
                  <td className="px-6 py-5 text-zinc-400">{influencer.contentCategory || "-"}</td>
                  <td className="px-6 py-5 text-zinc-400">{influencer.showOnHome ? "Sim" : "Não"}</td>
                  <td className="px-6 py-5 text-zinc-400">{influencer.showOnInfluencersPage ? "Sim" : "Não"}</td>
                  <td className="px-6 py-5">
                    <span className={`rounded-full border px-3 py-1 text-xs font-black uppercase ${influencer.active ? "border-emerald-500/30 bg-emerald-950/20 text-emerald-300" : "border-red-500/30 bg-red-950/20 text-red-300"}`}>
                      {influencer.active ? "Ativo" : "Inativo"}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <form action={toggleInfluencerStatusAction}>
                      <input type="hidden" name="id" value={influencer.id} />
                      <input type="hidden" name="active" value={String(influencer.active)} />
                      <button className="rounded-xl border border-purple-500/30 px-4 py-2 text-xs font-black uppercase text-purple-200 transition hover:bg-purple-700/30">
                        {influencer.active ? "Desativar" : "Ativar"}
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
              {influencers.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-zinc-400">Nenhum influenciador cadastrado.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}