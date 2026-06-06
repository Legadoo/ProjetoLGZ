"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaBoxOpen,
  FaCalendarAlt,
  FaChartBar,
  FaChartLine,
  FaCog,
  FaGift,
  FaHome,
  FaImage,
  FaPercent,
  FaShoppingBag,
  FaStar,
  FaTools,
  FaTrophy,
  FaUserShield,
  FaUsers,
  FaUsersCog,
} from "react-icons/fa";

const adminNavItems = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: FaHome,
  },
  {
    label: "Gerenciar",
    href: "/admin/gerenciar",
    icon: FaTools,
  },
  {
    label: "Relatórios",
    href: "/admin/relatorios",
    icon: FaChartBar,
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
    icon: FaGift,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-screen w-80 shrink-0 overflow-y-auto border-r border-purple-500/25 bg-[#050008] p-5 lg:block">
      <Link href="/admin/dashboard" className="mb-7 flex items-center gap-3">
        <div className="grid h-14 w-14 place-items-center rounded-2xl border border-purple-500/50 bg-purple-950/40 text-xl font-black text-purple-100 shadow-[0_0_28px_rgba(176,38,255,0.22)]">
          LGZ
        </div>

        <div>
          <strong className="block text-xl font-black uppercase text-white">
            Admin LGZ
          </strong>
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-purple-300">
            Gestão interna
          </span>
        </div>
      </Link>

      <nav className="grid gap-2">
        {adminNavItems.map((item) => {
          const Icon = item.icon;
          const active =
            pathname === item.href ||
            (item.href !== "/admin/dashboard" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-black uppercase transition ${
                active
                  ? "border-purple-300/60 bg-purple-700/35 text-white shadow-[0_0_22px_rgba(176,38,255,0.18)]"
                  : "border-transparent text-zinc-400 hover:border-purple-500/30 hover:bg-purple-950/25 hover:text-purple-100"
              }`}
            >
              <span
                className={`grid h-10 w-10 place-items-center rounded-xl border transition ${
                  active
                    ? "border-purple-300/50 bg-purple-500/25 text-purple-100"
                    : "border-purple-500/20 bg-black/30 text-purple-300 group-hover:border-purple-400/40"
                }`}
              >
                <Icon />
              </span>

              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-7 rounded-3xl border border-purple-500/25 bg-purple-950/15 p-5">
        <FaChartLine className="mb-4 text-3xl text-purple-300" />

        <h3 className="text-lg font-black uppercase text-white">
          Legendaryz
        </h3>

        <p className="mt-2 text-sm leading-6 text-zinc-400">
          Painel interno para gestão do site, loja, comunidade, calendário,
          conteúdo e operação da organização.
        </p>
      </div>
    </aside>
  );
}