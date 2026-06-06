"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaBoxOpen,
  FaCalendarAlt,
  FaCog,
  FaHome,
  FaImage,
  FaPercent,
  FaShoppingBag,
  FaSignOutAlt,
  FaStar,
  FaStore,
  FaTrophy,
  FaUserShield,
  FaUsers,
  FaUsersCog,
} from "react-icons/fa";
import { logoutAdminAction } from "@/actions/auth.actions";

type AdminSidebarProps = {
  adminName: string;
  adminRole: string;
};

const adminItems = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: FaHome,
  },
  {
    label: "Produtos",
    href: "/admin/produtos",
    icon: FaBoxOpen,
  },
  {
    label: "Pedidos",
    href: "/admin/pedidos",
    icon: FaShoppingBag,
  },
  {
    label: "Clientes",
    href: "/admin/clientes",
    icon: FaUsers,
  },
  {
    label: "Cupons",
    href: "/admin/cupons",
    icon: FaPercent,
  },
  {
    label: "Times",
    href: "/admin/times",
    icon: FaTrophy,
  },
  {
    label: "Jogadores",
    href: "/admin/jogadores",
    icon: FaUsersCog,
  },
  {
    label: "Influenciadores",
    href: "/admin/influenciadores",
    icon: FaStar,
  },
  {
    label: "Staff",
    href: "/admin/staff",
    icon: FaUserShield,
  },
  {
    label: "Calendário",
    href: "/admin/calendario",
    icon: FaCalendarAlt,
  },
  {
    label: "Banners",
    href: "/admin/banners",
    icon: FaImage,
  },
  {
    label: "Configurações",
    href: "/admin/configuracoes",
    icon: FaCog,
  },
  {
    label: "Usuários",
    href: "/admin/usuarios",
    icon: FaUsersCog,
  },
];

export function AdminSidebar({ adminName, adminRole }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="z-40 border-purple-500/30 bg-[#07000d]/95 text-white shadow-[0_0_45px_rgba(126,34,206,0.16)] backdrop-blur-xl lg:fixed lg:inset-y-0 lg:left-0 lg:w-[304px] lg:border-r">
      <div className="flex h-full flex-col">
        <div className="border-b border-purple-500/20 p-5">
          <Link href="/admin/dashboard" className="group flex items-center gap-4">
            <div className="relative grid h-16 w-16 place-items-center rounded-2xl border border-purple-500/50 bg-[radial-gradient(circle,rgba(176,38,255,0.35),rgba(30,0,50,0.8))] text-2xl font-black text-purple-100 shadow-[0_0_28px_rgba(176,38,255,0.32)] transition group-hover:scale-105">
              LGZ
              <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full border border-black bg-purple-400 shadow-[0_0_12px_rgba(192,132,252,1)]" />
            </div>

            <div>
              <strong className="block text-xl font-black uppercase tracking-wider">
                LGZ Admin
              </strong>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-purple-300">
                Painel interno
              </span>
            </div>
          </Link>

          <div className="mt-5 rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-950/35 to-black/45 p-4">
            <p className="text-xs font-black uppercase tracking-widest text-zinc-500">
              Administrador logado
            </p>

            <div className="mt-3 flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl border border-purple-500/40 bg-purple-950/50 text-purple-200">
                <FaUserShield />
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-black uppercase text-white">
                  {adminName}
                </p>
                <p className="truncate text-xs font-bold uppercase text-purple-300">
                  {adminRole}
                </p>
              </div>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-5">
          <div className="grid gap-2">
            {adminItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href !== "/admin/dashboard" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-black uppercase transition ${
                    isActive
                      ? "border-purple-400/70 bg-purple-700/25 text-white shadow-[0_0_24px_rgba(176,38,255,0.20)]"
                      : "border-transparent text-zinc-400 hover:border-purple-500/30 hover:bg-purple-950/25 hover:text-white"
                  }`}
                >
                  <span
                    className={`grid h-10 w-10 place-items-center rounded-xl border transition ${
                      isActive
                        ? "border-purple-300/60 bg-purple-600/40 text-purple-100"
                        : "border-purple-500/20 bg-black/30 text-purple-300 group-hover:bg-purple-900/40"
                    }`}
                  >
                    <Icon />
                  </span>

                  <span className="truncate">{item.label}</span>

                  {isActive && (
                    <span className="ml-auto h-2 w-2 rounded-full bg-purple-300 shadow-[0_0_12px_rgba(216,180,254,1)]" />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="border-t border-purple-500/20 p-4">
          <Link
            href="/"
            className="mb-3 flex items-center justify-center gap-2 rounded-2xl border border-purple-500/30 bg-black/30 px-4 py-3 text-xs font-black uppercase text-purple-200 transition hover:bg-purple-950/40"
          >
            <FaStore />
            Ver site público
          </Link>

          <form action={logoutAdminAction}>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-red-500/40 bg-red-950/20 px-4 py-3 text-xs font-black uppercase text-red-200 transition hover:bg-red-900/40"
            >
              <FaSignOutAlt />
              Sair do admin
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
}