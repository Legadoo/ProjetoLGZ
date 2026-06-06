import { FaServer } from "react-icons/fa";
import { PublicFooter } from "@/components/public/PublicFooter";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicPageHero } from "@/components/public/PublicPageHero";
import { PublicProductGrid } from "@/components/public/PublicProductGrid";
import { getActiveProductsByCategoryType } from "@/services/product.service";

export default async function LgzNetworkPage() {
  const products = await getActiveProductsByCategoryType("LGZNETWORK");

  return (
    <>
      <PublicHeader />

      <main>
        <PublicPageHero
          eyebrow="Servidor Minecraft"
          title="LGZNetwork"
          description="Loja e área do servidor Minecraft da Legendaryz. Ranks, vantagens e itens digitais cadastrados no painel aparecem aqui."
          icon={FaServer}
        />

        <PublicProductGrid
          title="Produtos LGZNetwork"
          description="Essa área exibe apenas produtos ativos vinculados a categorias do tipo LGZNetwork."
          products={products}
        />
      </main>

      <PublicFooter />
    </>
  );
}