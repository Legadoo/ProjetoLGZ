import {
  FaBoxOpen,
  FaFolderPlus,
  FaLayerGroup,
  FaPlus,
  FaShoppingCart,
} from "react-icons/fa";
import {
  createProductAction,
  createProductCategoryAction,
  toggleProductCategoryStatusAction,
  toggleProductStatusAction,
} from "@/actions/product.actions";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminStatCard } from "@/components/admin/AdminStatCard";
import { requireAdminUser } from "@/lib/session";
import { formatCurrencyBRL, getProductsAdminData } from "@/services/product.service";

export default async function AdminProdutosPage() {
  await requireAdminUser();

  const { products, categories } = await getProductsAdminData();

  const activeProducts = products.filter((product) => product.active).length;
  const inactiveProducts = products.filter((product) => !product.active).length;
  const totalStock = products.reduce((total, product) => total + product.stockQuantity, 0);

  return (
    <>
      <AdminPageHeader
        eyebrow="Loja e produtos"
        title="Produtos"
        description="Gerencie produtos da loja oficial da Legendaryz e itens da LGZNetwork. Esta fase já conecta produtos e categorias ao Prisma com SQLite."
        icon={FaShoppingCart}
        actionLabel="Gestão inicial"
      />

      <section className="mb-6 grid gap-4 md:grid-cols-3">
        <AdminStatCard
          title="Produtos ativos"
          value={String(activeProducts)}
          description="Produtos visíveis na loja pública ou LGZNetwork."
          icon={FaBoxOpen}
        />

        <AdminStatCard
          title="Inativos"
          value={String(inactiveProducts)}
          description="Produtos ocultos do site público."
          icon={FaBoxOpen}
        />

        <AdminStatCard
          title="Estoque total"
          value={String(totalStock)}
          description="Soma das quantidades cadastradas."
          icon={FaLayerGroup}
        />
      </section>

      <section className="mb-6 grid gap-5 xl:grid-cols-[420px_1fr]">
        <form action={createProductCategoryAction} className="rounded-3xl border border-purple-500/25 bg-black/35 p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl border border-purple-500/40 bg-purple-950/40 text-purple-200">
              <FaFolderPlus />
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-purple-400">
                Nova categoria
              </p>
              <h2 className="text-2xl font-black uppercase">
                Categoria
              </h2>
            </div>
          </div>

          <div className="grid gap-4">
            <label className="grid gap-2">
              <span className="text-xs font-black uppercase text-zinc-400">Nome</span>
              <input
                name="name"
                required
                placeholder="Ex: Camisetas LGZ"
                className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-xs font-black uppercase text-zinc-400">Tipo</span>
              <select
                name="type"
                className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300"
              >
                <option value="ESPORTS_STORE">Loja E-sports</option>
                <option value="LGZNETWORK">LGZNetwork</option>
              </select>
            </label>

            <label className="grid gap-2">
              <span className="text-xs font-black uppercase text-zinc-400">Descrição</span>
              <textarea
                name="description"
                placeholder="Descrição da categoria"
                className="min-h-28 rounded-xl border border-purple-500/25 bg-black/40 p-4 text-white outline-none focus:border-purple-300"
              />
            </label>
          </div>

          <button type="submit" className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl border border-purple-400/50 bg-purple-700/30 px-5 py-3 text-sm font-black uppercase text-purple-100 transition hover:bg-purple-600/50">
            <FaPlus />
            Criar categoria
          </button>
        </form>

        <form action={createProductAction} className="rounded-3xl border border-purple-500/25 bg-black/35 p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl border border-purple-500/40 bg-purple-950/40 text-purple-200">
              <FaPlus />
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-purple-400">
                Novo produto
              </p>
              <h2 className="text-2xl font-black uppercase">
                Produto da loja
              </h2>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-xs font-black uppercase text-zinc-400">Nome</span>
              <input
                name="name"
                required
                placeholder="Ex: Camiseta Legendaryz"
                className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-xs font-black uppercase text-zinc-400">Categoria</span>
              <select
                name="categoryId"
                className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300"
              >
                <option value="">Sem categoria</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name} — {category.type === "LGZNETWORK" ? "LGZNetwork" : "Loja"}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2">
              <span className="text-xs font-black uppercase text-zinc-400">Preço</span>
              <input
                name="price"
                placeholder="Ex: 59,90"
                className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-xs font-black uppercase text-zinc-400">Estoque</span>
              <input
                name="stockQuantity"
                type="number"
                min="0"
                defaultValue="0"
                className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300"
              />
            </label>

            <label className="grid gap-2 md:col-span-2">
              <span className="text-xs font-black uppercase text-zinc-400">Imagem URL</span>
              <input
                name="imageUrl"
                placeholder="Opcional: https://..."
                className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300"
              />
            </label>

            <label className="grid gap-2 md:col-span-2">
              <span className="text-xs font-black uppercase text-zinc-400">Descrição</span>
              <textarea
                name="description"
                placeholder="Descrição do produto"
                className="min-h-28 rounded-xl border border-purple-500/25 bg-black/40 p-4 text-white outline-none focus:border-purple-300"
              />
            </label>

            <label className="flex items-center gap-3 rounded-xl border border-purple-500/25 bg-black/30 p-4 md:col-span-2">
              <input name="featured" type="checkbox" className="h-5 w-5" />
              <span className="text-sm font-black uppercase text-purple-200">
                Marcar como produto em destaque
              </span>
            </label>
          </div>

          <button type="submit" className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl border border-purple-400/50 bg-purple-700/30 px-5 py-3 text-sm font-black uppercase text-purple-100 transition hover:bg-purple-600/50">
            <FaPlus />
            Criar produto
          </button>
        </form>
      </section>

      <section className="mb-6 overflow-hidden rounded-3xl border border-purple-500/25 bg-black/35">
        <div className="border-b border-purple-500/20 p-6">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">
            Categorias
          </p>

          <h2 className="mt-2 text-2xl font-black uppercase">
            Categorias cadastradas
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse">
            <thead>
              <tr className="border-b border-purple-500/20 bg-purple-950/20 text-left text-xs uppercase tracking-[0.22em] text-zinc-500">
                <th className="px-6 py-4">Nome</th>
                <th className="px-6 py-4">Tipo</th>
                <th className="px-6 py-4">Slug</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Ação</th>
              </tr>
            </thead>

            <tbody>
              {categories.map((category) => (
                <tr key={category.id} className="border-b border-purple-500/10 text-sm">
                  <td className="px-6 py-5 font-bold text-white">{category.name}</td>
                  <td className="px-6 py-5 text-zinc-400">
                    {category.type === "LGZNETWORK" ? "LGZNetwork" : "Loja E-sports"}
                  </td>
                  <td className="px-6 py-5 text-zinc-400">{category.slug}</td>
                  <td className="px-6 py-5">
                    <span className={`rounded-full border px-3 py-1 text-xs font-black uppercase ${
                      category.active
                        ? "border-emerald-500/30 bg-emerald-950/20 text-emerald-300"
                        : "border-red-500/30 bg-red-950/20 text-red-300"
                    }`}>
                      {category.active ? "Ativa" : "Inativa"}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <form action={toggleProductCategoryStatusAction}>
                      <input type="hidden" name="id" value={category.id} />
                      <input type="hidden" name="active" value={String(category.active)} />
                      <button className="rounded-xl border border-purple-500/30 px-4 py-2 text-xs font-black uppercase text-purple-200 transition hover:bg-purple-700/30">
                        {category.active ? "Desativar" : "Ativar"}
                      </button>
                    </form>
                  </td>
                </tr>
              ))}

              {categories.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-zinc-400">
                    Nenhuma categoria cadastrada ainda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="overflow-hidden rounded-3xl border border-purple-500/25 bg-black/35">
        <div className="border-b border-purple-500/20 p-6">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">
            Produtos
          </p>

          <h2 className="mt-2 text-2xl font-black uppercase">
            Produtos cadastrados
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[920px] border-collapse">
            <thead>
              <tr className="border-b border-purple-500/20 bg-purple-950/20 text-left text-xs uppercase tracking-[0.22em] text-zinc-500">
                <th className="px-6 py-4">Produto</th>
                <th className="px-6 py-4">Categoria</th>
                <th className="px-6 py-4">Preço</th>
                <th className="px-6 py-4">Estoque</th>
                <th className="px-6 py-4">Destaque</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Ação</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-purple-500/10 text-sm">
                  <td className="px-6 py-5">
                    <p className="font-bold text-white">{product.name}</p>
                    <p className="mt-1 text-xs text-zinc-500">{product.slug}</p>
                  </td>
                  <td className="px-6 py-5 text-zinc-400">
                    {product.category?.name || "Sem categoria"}
                  </td>
                  <td className="px-6 py-5 font-black text-purple-300">
                    {formatCurrencyBRL(product.price)}
                  </td>
                  <td className="px-6 py-5 text-zinc-400">{product.stockQuantity}</td>
                  <td className="px-6 py-5 text-zinc-400">
                    {product.featured ? "Sim" : "Não"}
                  </td>
                  <td className="px-6 py-5">
                    <span className={`rounded-full border px-3 py-1 text-xs font-black uppercase ${
                      product.active
                        ? "border-emerald-500/30 bg-emerald-950/20 text-emerald-300"
                        : "border-red-500/30 bg-red-950/20 text-red-300"
                    }`}>
                      {product.active ? "Ativo" : "Inativo"}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <form action={toggleProductStatusAction}>
                      <input type="hidden" name="id" value={product.id} />
                      <input type="hidden" name="active" value={String(product.active)} />
                      <button className="rounded-xl border border-purple-500/30 px-4 py-2 text-xs font-black uppercase text-purple-200 transition hover:bg-purple-700/30">
                        {product.active ? "Desativar" : "Ativar"}
                      </button>
                    </form>
                  </td>
                </tr>
              ))}

              {products.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-zinc-400">
                    Nenhum produto cadastrado ainda.
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