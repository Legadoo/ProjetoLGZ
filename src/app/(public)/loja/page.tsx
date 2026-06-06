import { FaShoppingCart } from "react-icons/fa";
import { PublicFooter } from "@/components/public/PublicFooter";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicPageHero } from "@/components/public/PublicPageHero";
import { PublicProductGrid } from "@/components/public/PublicProductGrid";
import { getActiveProductsByCategoryType } from "@/services/product.service";

export default async function LojaPage() {
  const products = await getActiveProductsByCategoryType("ESPORTS_STORE");

  return (
    <>
      <PublicHeader />

      <main>
        <PublicPageHero
          eyebrow="Loja da E-sports"
          title="Loja Legendaryz"
          description="Produtos oficiais, drops e itens da organização Legendaryz. Os produtos cadastrados no painel administrativo aparecem aqui automaticamente."
          icon={FaShoppingCart}
        />

        <PublicProductGrid
          title="Produtos da Loja"
          description="Essa área exibe apenas produtos ativos vinculados a categorias do tipo Loja E-sports."
          products={products}
        />
      </main>

      <PublicFooter />
    </>
  );
}