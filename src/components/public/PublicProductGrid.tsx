import { FaBoxOpen, FaShoppingCart, FaStar } from "react-icons/fa";
import { addToCartAction } from "@/actions/cart.actions";
import { formatCurrencyBRL } from "@/services/product.service";

type PublicProductGridProps = {
  title: string;
  description: string;
  products: Array<{
    id: string;
    name: string;
    slug: string;
    description: string | null;
    price: number;
    imageUrl: string | null;
    featured: boolean;
    stockQuantity: number;
    category: {
      name: string;
      type: string;
    } | null;
  }>;
};

export function PublicProductGrid({
  title,
  description,
  products,
}: PublicProductGridProps) {
  return (
    <section className="lgz-container py-10">
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">
            Produtos oficiais
          </p>

          <h2 className="mt-3 text-4xl font-black uppercase md:text-5xl">
            {title}
          </h2>
        </div>

        <p className="max-w-xl text-sm leading-6 text-zinc-400">
          {description}
        </p>
      </div>

      {products.length === 0 ? (
        <div className="lgz-panel rounded-3xl p-8 text-center">
          <FaBoxOpen className="mx-auto mb-5 text-5xl text-purple-300" />

          <h3 className="text-3xl font-black uppercase">
            Nenhum produto ativo ainda
          </h3>

          <p className="mt-3 text-zinc-400">
            Cadastre produtos no painel administrativo para eles aparecerem aqui.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.id}
              className="lgz-panel group overflow-hidden rounded-3xl transition hover:-translate-y-1 hover:border-purple-400"
            >
              <div className="relative grid h-72 place-items-center overflow-hidden bg-[radial-gradient(circle,rgba(176,38,255,0.30),transparent_60%),linear-gradient(135deg,#150024,#050008)]">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-full w-full object-cover opacity-80 transition group-hover:scale-105"
                  />
                ) : (
                  <div className="grid h-32 w-32 place-items-center rounded-full border border-purple-500/40 bg-black/40 text-5xl text-purple-200 shadow-[0_0_40px_rgba(176,38,255,0.32)]">
                    <FaShoppingCart />
                  </div>
                )}

                {product.featured && (
                  <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-purple-400/50 bg-purple-950/60 px-4 py-2 text-xs font-black uppercase text-purple-100">
                    <FaStar />
                    Destaque
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="rounded-full border border-purple-500/30 bg-purple-950/30 px-4 py-2 text-xs font-black uppercase text-purple-200">
                    {product.category?.name || "Sem categoria"}
                  </span>

                  <span className="text-xs font-bold uppercase text-zinc-500">
                    Estoque: {product.stockQuantity}
                  </span>
                </div>

                <h3 className="text-2xl font-black uppercase text-white">
                  {product.name}
                </h3>

                <p className="mt-3 min-h-16 text-sm leading-6 text-zinc-400">
                  {product.description || "Produto oficial da Legendaryz."}
                </p>

                <div className="mt-6 flex flex-col gap-4">
                  <strong className="text-2xl font-black uppercase text-purple-300">
                    {formatCurrencyBRL(product.price)}
                  </strong>

                  <form action={addToCartAction} className="flex gap-3">
                    <input type="hidden" name="productId" value={product.id} />

                    <input
                      type="number"
                      name="quantity"
                      min="1"
                      defaultValue="1"
                      className="h-12 w-20 rounded-xl border border-purple-500/30 bg-black/40 px-3 text-center text-white outline-none focus:border-purple-300"
                    />

                    <button
                      type="submit"
                      disabled={product.stockQuantity <= 0}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-purple-500/40 px-4 py-3 text-xs font-black uppercase text-purple-100 transition hover:bg-purple-700/40 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <FaShoppingCart />
                      {product.stockQuantity > 0 ? "Adicionar" : "Esgotado"}
                    </button>
                  </form>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}