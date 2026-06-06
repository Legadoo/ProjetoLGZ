import { FaShieldAlt, FaUserShield, FaUsersCog } from "react-icons/fa";
import { PublicFooter } from "@/components/public/PublicFooter";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicPageHero } from "@/components/public/PublicPageHero";

const staff = [
  ["Direção", "Gestão estratégica da organização.", FaUserShield],
  ["Operação", "Organização de eventos, times e comunidade.", FaUsersCog],
  ["Moderação", "Suporte e cuidado com a comunidade.", FaShieldAlt],
];

export default function StaffPage() {
  return (
    <>
      <PublicHeader />
      <main>
        <PublicPageHero
          eyebrow="Equipe interna"
          title="Staff"
          description="Conheça a equipe que organiza, protege, movimenta e faz a Legendaryz acontecer."
          icon={FaShieldAlt}
        />

        <section className="lgz-container grid gap-4 py-10 md:grid-cols-3">
          {staff.map(([title, description, Icon]) => (
            <article key={String(title)} className="lgz-panel rounded-3xl p-6">
              <div className="mb-5 grid h-16 w-16 place-items-center rounded-2xl border border-purple-500/40 bg-purple-950/40 text-3xl text-purple-200">
                <Icon />
              </div>
              <h2 className="text-2xl font-black uppercase">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-zinc-400">{description}</p>
            </article>
          ))}
        </section>
      </main>
      <PublicFooter />
    </>
  );
}