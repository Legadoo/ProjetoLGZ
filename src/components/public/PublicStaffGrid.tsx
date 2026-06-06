import { FaShieldAlt, FaUserShield } from "react-icons/fa";

type PublicStaffGridProps = {
  staff: Array<{
    id: string;
    name: string;
    nickname: string | null;
    role: string;
    imageUrl: string | null;
    bio: string | null;
  }>;
};

export function PublicStaffGrid({ staff }: PublicStaffGridProps) {
  return (
    <section className="lgz-container py-10">
      {staff.length === 0 ? (
        <div className="lgz-panel rounded-3xl p-8 text-center">
          <FaShieldAlt className="mx-auto mb-5 text-5xl text-purple-300" />
          <h2 className="text-3xl font-black uppercase">Nenhum staff ativo</h2>
          <p className="mt-3 text-zinc-400">Cadastre membros da staff no painel administrativo.</p>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {staff.map((member) => (
            <article key={member.id} className="lgz-panel overflow-hidden rounded-3xl transition hover:-translate-y-1 hover:border-purple-400">
              <div className="grid h-72 place-items-center bg-[radial-gradient(circle,rgba(176,38,255,0.30),transparent_60%),linear-gradient(135deg,#150024,#050008)]">
                {member.imageUrl ? (
                  <img src={member.imageUrl} alt={member.name} className="h-full w-full object-cover opacity-85" />
                ) : (
                  <div className="grid h-36 w-36 place-items-center rounded-full border border-purple-500/40 bg-black/40 text-5xl text-purple-200">
                    <FaUserShield />
                  </div>
                )}
              </div>

              <div className="p-6">
                <p className="text-xs font-black uppercase tracking-[0.25em] text-purple-400">
                  {member.role}
                </p>

                <h2 className="mt-3 text-3xl font-black uppercase">
                  {member.nickname || member.name}
                </h2>

                {member.nickname && (
                  <p className="mt-1 text-sm font-bold uppercase text-zinc-500">
                    {member.name}
                  </p>
                )}

                <p className="mt-4 min-h-20 text-sm leading-7 text-zinc-400">
                  {member.bio || "Membro da staff Legendaryz."}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}