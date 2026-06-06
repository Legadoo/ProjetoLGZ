import Link from "next/link";
import { FaChevronRight, FaGem, FaShoppingCart, FaTshirt } from "react-icons/fa";

const products = [
  {
    title: "Drop LGZ Oficial",
    description: "Produtos oficiais da organização Legendaryz.",
    price: "Em breve",
    icon: FaTshirt,
  },
  {
    title: "Vantagens LGZNetwork",
    description: "Ranks e benefícios para o servidor Minecraft.",
    price: "Em breve",
    icon: FaGem,
  },
  {
    title: "Itens da comunidade",
    description: "Produtos e recompensas para membros cadastrados.",
    price: "Em breve",
    icon: FaShoppingCart,
  },
];

export function HomeStorePreview() {
  return (
    <section className="lgz-container py-10">
      <div className="rounded-[2rem] border border-purple-500/30 bg-[radial-gradient(circle_at_80%_20%,rgba(176,38,255,0.22),transparent_30%),linear-gradient(135deg,rgba(10,0,18,0.96),rgba(3,0,8,0.98))] p-6 md:p-10">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">
              Loja integrada
            </p>
            <h2 className="mt-3 text-4xl font-black uppercase md:text-5xl">
              Loja & LGZNetwork
            </h2>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/loja" className="lgz-button">
              Loja <FaChevronRight />
            </Link>
            <Link href="/lgznetwork" className="lgz-button lgz-button-outline">
              LGZNetwork <FaChevronRight />
            </Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {products.map((product) => {
            const Icon = product.icon;

            return (
              <article key={product.title} className="lgz-panel rounded-3xl p-6">
                <div className="mb-6 grid h-16 w-16 place-items-center rounded-2xl border border-purple-500/40 bg-purple-950/40 text-3xl text-purple-200">
                  <Icon />
                </div>

                <h3 className="text-2xl font-black uppercase text-white">
                  {product.title}
                </h3>

                <p className="mt-3 min-h-14 text-sm leading-6 text-zinc-400">
                  {product.description}
                </p>

                <p className="mt-6 text-xl font-black uppercase text-purple-300">
                  {product.price}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}