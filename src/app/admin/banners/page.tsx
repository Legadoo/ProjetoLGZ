import { FaImage, FaPlus } from "react-icons/fa";
import { createBannerAction, toggleBannerStatusAction } from "@/actions/site.actions";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminStatCard } from "@/components/admin/AdminStatCard";
import { requireAdminUser } from "@/lib/session";
import { getAdminBanners } from "@/services/site.service";

export default async function AdminBannersPage() {
  await requireAdminUser();

  const banners = await getAdminBanners();
  const activeBanners = banners.filter((banner) => banner.active).length;
  const homeHeroBanners = banners.filter((banner) => banner.section === "HOME_HERO").length;

  return (
    <>
      <AdminPageHeader
        eyebrow="Artes e chamadas"
        title="Banners"
        description="Gerencie banners, artes, chamadas principais, botões e seções do site público da Legendaryz."
        icon={FaImage}
        actionLabel="Gestão de banners"
      />

      <section className="mb-6 grid gap-4 md:grid-cols-3">
        <AdminStatCard
          title="Banners"
          value={String(banners.length)}
          description="Total de banners cadastrados."
          icon={FaImage}
        />

        <AdminStatCard
          title="Ativos"
          value={String(activeBanners)}
          description="Banners visíveis no site público."
          icon={FaImage}
        />

        <AdminStatCard
          title="Home Hero"
          value={String(homeHeroBanners)}
          description="Banners cadastrados para o topo da Home."
          icon={FaImage}
        />
      </section>

      <section className="mb-6 rounded-3xl border border-purple-500/25 bg-black/35 p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl border border-purple-500/40 bg-purple-950/40 text-purple-200">
            <FaPlus />
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-purple-400">
              Novo banner
            </p>
            <h2 className="text-2xl font-black uppercase">
              Cadastrar arte/chamada
            </h2>
          </div>
        </div>

        <form action={createBannerAction} className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-xs font-black uppercase text-zinc-400">Título</span>
            <input
              name="title"
              required
              placeholder="Ex: Welcome to Legendaryz"
              className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-xs font-black uppercase text-zinc-400">Seção</span>
            <select
              name="section"
              className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300"
            >
              <option value="HOME_HERO">HOME_HERO</option>
              <option value="LOJA">LOJA</option>
              <option value="LGZNETWORK">LGZNETWORK</option>
              <option value="INFLUENCIADORES">INFLUENCIADORES</option>
              <option value="SOBRE">SOBRE</option>
            </select>
          </label>

          <label className="grid gap-2 md:col-span-2">
            <span className="text-xs font-black uppercase text-zinc-400">Subtítulo</span>
            <textarea
              name="subtitle"
              placeholder="Texto de apoio do banner"
              className="min-h-28 rounded-xl border border-purple-500/25 bg-black/40 p-4 text-white outline-none focus:border-purple-300"
            />
          </label>

          <label className="grid gap-2 md:col-span-2">
            <span className="text-xs font-black uppercase text-zinc-400">URL da imagem</span>
            <input
              name="imageUrl"
              placeholder="Opcional: https://..."
              className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-xs font-black uppercase text-zinc-400">Texto do botão</span>
            <input
              name="buttonText"
              placeholder="Ex: Conheça mais"
              className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-xs font-black uppercase text-zinc-400">URL do botão</span>
            <input
              name="buttonUrl"
              placeholder="Ex: /sobre"
              className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300"
            />
          </label>

          <label className="grid gap-2 md:col-span-2">
            <span className="text-xs font-black uppercase text-zinc-400">Ordem</span>
            <input
              name="sortOrder"
              type="number"
              defaultValue="0"
              className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300"
            />
          </label>

          <button className="flex items-center justify-center gap-2 rounded-2xl border border-purple-400/50 bg-purple-700/30 px-5 py-3 text-sm font-black uppercase text-purple-100 transition hover:bg-purple-600/50 md:col-span-2">
            <FaPlus />
            Criar banner
          </button>
        </form>
      </section>

      <section className="overflow-hidden rounded-3xl border border-purple-500/25 bg-black/35">
        <div className="border-b border-purple-500/20 p-6">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">
            Banners cadastrados
          </p>

          <h2 className="mt-2 text-2xl font-black uppercase">
            Lista de banners
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] border-collapse">
            <thead>
              <tr className="border-b border-purple-500/20 bg-purple-950/20 text-left text-xs uppercase tracking-[0.22em] text-zinc-500">
                <th className="px-6 py-4">Banner</th>
                <th className="px-6 py-4">Seção</th>
                <th className="px-6 py-4">Botão</th>
                <th className="px-6 py-4">Ordem</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Ação</th>
              </tr>
            </thead>

            <tbody>
              {banners.map((banner) => (
                <tr key={banner.id} className="border-b border-purple-500/10 text-sm">
                  <td className="px-6 py-5">
                    <p className="font-bold text-white">{banner.title}</p>
                    <p className="mt-1 line-clamp-1 text-xs text-zinc-500">
                      {banner.subtitle || "Sem subtítulo"}
                    </p>
                  </td>

                  <td className="px-6 py-5 text-purple-300">{banner.section || "-"}</td>

                  <td className="px-6 py-5 text-zinc-400">
                    {banner.buttonText || "-"}
                  </td>

                  <td className="px-6 py-5 text-zinc-400">
                    {banner.sortOrder}
                  </td>

                  <td className="px-6 py-5">
                    <span className={`rounded-full border px-3 py-1 text-xs font-black uppercase ${
                      banner.active
                        ? "border-emerald-500/30 bg-emerald-950/20 text-emerald-300"
                        : "border-red-500/30 bg-red-950/20 text-red-300"
                    }`}>
                      {banner.active ? "Ativo" : "Inativo"}
                    </span>
                  </td>

                  <td className="px-6 py-5 text-right">
                    <form action={toggleBannerStatusAction}>
                      <input type="hidden" name="id" value={banner.id} />
                      <input type="hidden" name="active" value={String(banner.active)} />

                      <button className="rounded-xl border border-purple-500/30 px-4 py-2 text-xs font-black uppercase text-purple-200 transition hover:bg-purple-700/30">
                        {banner.active ? "Desativar" : "Ativar"}
                      </button>
                    </form>
                  </td>
                </tr>
              ))}

              {banners.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-zinc-400">
                    Nenhum banner cadastrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}