import { FaPlus, FaUserShield } from "react-icons/fa";
import { createStaffMemberAction, toggleStaffMemberStatusAction } from "@/actions/content.actions";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminStatCard } from "@/components/admin/AdminStatCard";
import { requireAdminUser } from "@/lib/session";
import { getAdminStaffData } from "@/services/content.service";

export default async function AdminStaffPage() {
  await requireAdminUser();

  const staff = await getAdminStaffData();
  const activeStaff = staff.filter((member) => member.active).length;

  return (
    <>
      <AdminPageHeader
        eyebrow="Equipe interna"
        title="Staff"
        description="Gerencie os membros da staff, cargos, biografias, imagens e status público."
        icon={FaUserShield}
        actionLabel="Staff LGZ"
      />

      <section className="mb-6 grid gap-4 md:grid-cols-3">
        <AdminStatCard title="Staff" value={String(staff.length)} description="Total de membros cadastrados." icon={FaUserShield} />
        <AdminStatCard title="Ativos" value={String(activeStaff)} description="Membros visíveis no site." icon={FaUserShield} />
        <AdminStatCard title="Inativos" value={String(staff.length - activeStaff)} description="Membros ocultos do público." icon={FaUserShield} />
      </section>

      <section className="mb-6 rounded-3xl border border-purple-500/25 bg-black/35 p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl border border-purple-500/40 bg-purple-950/40 text-purple-200">
            <FaPlus />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-purple-400">Novo staff</p>
            <h2 className="text-2xl font-black uppercase">Cadastrar membro</h2>
          </div>
        </div>

        <form action={createStaffMemberAction} className="grid gap-4 md:grid-cols-2">
          <input name="name" required placeholder="Nome" className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300" />
          <input name="nickname" placeholder="Nickname" className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300" />
          <input name="role" required placeholder="Cargo/função" className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300" />
          <input name="imageUrl" placeholder="URL da imagem" className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300" />
          <textarea name="bio" placeholder="Biografia do membro da staff" className="min-h-28 rounded-xl border border-purple-500/25 bg-black/40 p-4 text-white outline-none focus:border-purple-300 md:col-span-2" />
          <button className="flex items-center justify-center gap-2 rounded-2xl border border-purple-400/50 bg-purple-700/30 px-5 py-3 text-sm font-black uppercase text-purple-100 transition hover:bg-purple-600/50 md:col-span-2">
            <FaPlus />
            Criar staff
          </button>
        </form>
      </section>

      <section className="overflow-hidden rounded-3xl border border-purple-500/25 bg-black/35">
        <div className="border-b border-purple-500/20 p-6">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">Staff cadastrado</p>
          <h2 className="mt-2 text-2xl font-black uppercase">Lista de staff</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] border-collapse">
            <thead>
              <tr className="border-b border-purple-500/20 bg-purple-950/20 text-left text-xs uppercase tracking-[0.22em] text-zinc-500">
                <th className="px-6 py-4">Nome</th>
                <th className="px-6 py-4">Nickname</th>
                <th className="px-6 py-4">Cargo</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Ação</th>
              </tr>
            </thead>
            <tbody>
              {staff.map((member) => (
                <tr key={member.id} className="border-b border-purple-500/10 text-sm">
                  <td className="px-6 py-5 font-bold text-white">{member.name}</td>
                  <td className="px-6 py-5 text-zinc-400">{member.nickname || "-"}</td>
                  <td className="px-6 py-5 text-zinc-400">{member.role}</td>
                  <td className="px-6 py-5">
                    <span className={`rounded-full border px-3 py-1 text-xs font-black uppercase ${member.active ? "border-emerald-500/30 bg-emerald-950/20 text-emerald-300" : "border-red-500/30 bg-red-950/20 text-red-300"}`}>
                      {member.active ? "Ativo" : "Inativo"}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <form action={toggleStaffMemberStatusAction}>
                      <input type="hidden" name="id" value={member.id} />
                      <input type="hidden" name="active" value={String(member.active)} />
                      <button className="rounded-xl border border-purple-500/30 px-4 py-2 text-xs font-black uppercase text-purple-200 transition hover:bg-purple-700/30">
                        {member.active ? "Desativar" : "Ativar"}
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
              {staff.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-zinc-400">Nenhum staff cadastrado.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}