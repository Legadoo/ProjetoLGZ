import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen overflow-hidden bg-[#050008] text-white">
      <div className="flex h-full min-h-0">
        <AdminSidebar />

        <main className="h-screen min-w-0 flex-1 overflow-y-auto overflow-x-hidden bg-[radial-gradient(circle_at_80%_0%,rgba(126,34,206,0.14),transparent_32rem),linear-gradient(135deg,#050008,#090011_45%,#030006)]">
          <div className="min-h-full px-4 py-6 sm:px-6 lg:px-8 xl:px-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}