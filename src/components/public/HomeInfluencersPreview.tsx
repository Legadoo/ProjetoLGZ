import Link from "next/link";
import { FaChevronRight, FaMicrophoneAlt } from "react-icons/fa";
import { getPublicInfluencers } from "@/services/content.service";
import { InfluencerCard } from "./InfluencerCard";

export async function HomeInfluencersPreview() {
  const influencers = (await getPublicInfluencers()).slice(0, 2);

  return (
    <section className="lgz-container py-10">
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">
            Criadores oficiais
          </p>
          <h2 className="mt-3 text-4xl font-black uppercase md:text-5xl">
            Influenciadores LGZ
          </h2>
        </div>

        <Link href="/influenciadores" className="lgz-button">
          Ver todos <FaChevronRight />
        </Link>
      </div>

      <div className="grid gap-5 lg:grid-cols-[0.8fr_1fr_1fr]">
        <div className="lgz-panel rounded-3xl p-6">
          <div className="mb-6 grid h-16 w-16 place-items-center rounded-2xl border border-purple-500/40 bg-purple-950/40 text-3xl text-purple-200">
            <FaMicrophoneAlt />
          </div>

          <h3 className="text-3xl font-black uppercase">
            Perfis oficiais
          </h3>

          <p className="mt-4 text-sm leading-7 text-zinc-300">
            Cada influenciador possui uma página individual com biografia,
            história na Legendaryz, redes sociais, galeria e destaques.
          </p>
        </div>

        {influencers.map((influencer) => (
          <InfluencerCard key={influencer.id} influencer={influencer} />
        ))}
      </div>
    </section>
  );
}