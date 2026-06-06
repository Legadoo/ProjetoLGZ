"use client";

import Link from "next/link";
import { useState } from "react";
import {
  FaBars,
  FaCalendarAlt,
  FaGamepad,
  FaHome,
  FaInfoCircle,
  FaMicrophoneAlt,
  FaShoppingBasket,
  FaShoppingCart,
  FaSignOutAlt,
  FaTimes,
  FaUser,
  FaUserPlus,
  FaUsers,
  FaUserShield,
} from "react-icons/fa";
import { logoutAdminAction, logoutCustomerAction } from "@/actions/auth.actions";

type PublicHeaderClientProps = {
  customerName: string | null;
  adminName: string | null;
  brandName: string;
  logoUrl: string | null;
};

const navItems = [
  { href: "/", label: "Home", description: "Principal", icon: FaHome },
  { href: "/loja", label: "Loja", description: "E-sports", icon: FaShoppingCart },
  { href: "/carrinho", label: "Carrinho", description: "Compras", icon: FaShoppingBasket },
  { href: "/lgznetwork", label: "LGZNetwork", description: "Minecraft", icon: FaGamepad },
  { href: "/calendario", label: "Calendário", description: "Jogos", icon: FaCalendarAlt },
  { href: "/times", label: "Times", description: "Jogadores", icon: FaUsers },
  { href: "/influenciadores", label: "Influenciadores", description: "Criadores", icon: FaMicrophoneAlt },
  { href: "/staff", label: "Staff", description: "Equipe", icon: FaUserShield },
  { href: "/sobre", label: "Sobre", description: "História", icon: FaInfoCircle },
];

export function PublicHeaderClient({
  customerName,
  adminName,
  brandName,
  logoUrl,
}: PublicHeaderClientProps) {
  const [open, setOpen] = useState(false);

  const isLoggedAsCustomer = Boolean(customerName);
  const isLoggedAsAdmin = Boolean(adminName);

  return (
    <header className="sticky top-0 z-50 border-b border-purple-500/30 bg-[#050008]/85 backdrop-blur-2xl">
      <div className="lgz-container flex min-h-24 items-center gap-5">
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative grid h-14 w-14 place-items-center overflow-hidden rounded-2xl border border-purple-500/50 bg-[radial-gradient(circle,rgba(176,38,255,0.35),rgba(15,0,30,0.9))] text-2xl font-black text-purple-100 shadow-[0_0_28px_rgba(176,38,255,0.28)] transition group-hover:scale-105">
            {logoUrl ? (
              <img src={logoUrl} alt={brandName} className="h-full w-full object-cover" />
            ) : (
              "LGZ"
            )}
            <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full border border-black bg-purple-300 shadow-[0_0_12px_rgba(216,180,254,1)]" />
          </div>

          <div>
            <strong className="block text-xl font-black uppercase tracking-wider">
              {brandName}
            </strong>
            <span className="text-xs font-bold uppercase tracking-[0.28em] text-purple-300">
              Seja lendário
            </span>
          </div>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-2 xl:flex">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-2xl border border-transparent px-4 py-3 text-sm transition hover:border-purple-500/40 hover:bg-purple-950/30"
              >
                <span className="flex items-center gap-2">
                  <Icon className="text-purple-300 transition group-hover:text-white" />
                  <strong className="uppercase">{item.label}</strong>
                </span>
                <span className="mt-1 block text-xs text-zinc-500 group-hover:text-zinc-300">
                  {item.description}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto hidden items-center gap-3 md:flex">
          {isLoggedAsAdmin && (
            <>
              <Link
                href="/admin/dashboard"
                className="rounded-2xl border border-purple-500/40 bg-purple-950/20 px-5 py-3 text-sm font-black uppercase text-purple-200 transition hover:bg-purple-800/30"
              >
                Admin: {adminName}
              </Link>

              <form action={logoutAdminAction}>
                <button
                  type="submit"
                  className="grid h-12 w-12 place-items-center rounded-2xl border border-red-500/40 bg-red-950/20 text-red-200 transition hover:bg-red-900/40"
                  aria-label="Sair do admin"
                >
                  <FaSignOutAlt />
                </button>
              </form>
            </>
          )}

          {!isLoggedAsAdmin && isLoggedAsCustomer && (
            <>
              <Link
                href="/minha-conta"
                className="inline-flex items-center gap-2 rounded-2xl border border-purple-500/40 bg-purple-950/20 px-5 py-3 text-sm font-black uppercase text-purple-200 transition hover:bg-purple-800/30"
              >
                <FaUser />
                {customerName}
              </Link>

              <Link
                href="/carrinho"
                className="grid h-12 w-12 place-items-center rounded-2xl border border-purple-500/40 bg-purple-950/20 text-purple-200 transition hover:bg-purple-800/30"
                aria-label="Carrinho"
              >
                <FaShoppingBasket />
              </Link>

              <form action={logoutCustomerAction}>
                <button
                  type="submit"
                  className="grid h-12 w-12 place-items-center rounded-2xl border border-red-500/40 bg-red-950/20 text-red-200 transition hover:bg-red-900/40"
                  aria-label="Sair"
                >
                  <FaSignOutAlt />
                </button>
              </form>
            </>
          )}

          {!isLoggedAsAdmin && !isLoggedAsCustomer && (
            <>
              <Link
                href="/login"
                className="rounded-2xl border border-purple-500/40 bg-purple-950/20 px-5 py-3 text-sm font-black uppercase text-purple-200 transition hover:bg-purple-800/30"
              >
                Login
              </Link>

              <Link href="/cadastro" className="lgz-button min-h-12 px-5 text-sm">
                Cadastro
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="ml-auto grid h-12 w-12 place-items-center rounded-2xl border border-purple-500/40 bg-purple-950/30 text-xl text-purple-100 xl:hidden"
          aria-label="Abrir menu"
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {open && (
        <div className="border-t border-purple-500/20 bg-black/90 xl:hidden">
          <nav className="lgz-container grid gap-3 py-5 sm:grid-cols-2">
            {(isLoggedAsAdmin || isLoggedAsCustomer) && (
              <div className="rounded-2xl border border-purple-500/30 bg-purple-950/20 p-4 sm:col-span-2">
                <p className="text-xs font-black uppercase tracking-[0.25em] text-purple-400">
                  Logado como
                </p>
                <strong className="mt-2 block text-xl uppercase text-white">
                  {isLoggedAsAdmin ? `Admin: ${adminName}` : customerName}
                </strong>
              </div>
            )}

            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-2xl border border-purple-500/25 bg-purple-950/20 p-4"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-purple-500/30 bg-black/40 text-purple-200">
                    <Icon />
                  </span>

                  <span>
                    <strong className="block uppercase">{item.label}</strong>
                    <span className="text-xs text-zinc-400">{item.description}</span>
                  </span>
                </Link>
              );
            })}

            {isLoggedAsAdmin && (
              <Link
                href="/admin/dashboard"
                onClick={() => setOpen(false)}
                className="rounded-2xl border border-purple-400/50 bg-purple-700/40 p-4 text-center font-black uppercase text-white"
              >
                Painel admin
              </Link>
            )}

            {isLoggedAsCustomer && !isLoggedAsAdmin && (
              <Link
                href="/minha-conta"
                onClick={() => setOpen(false)}
                className="rounded-2xl border border-purple-400/50 bg-purple-700/40 p-4 text-center font-black uppercase text-white"
              >
                Minha conta
              </Link>
            )}

            {!isLoggedAsAdmin && !isLoggedAsCustomer && (
              <>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="rounded-2xl border border-purple-500/30 bg-black/40 p-4 text-center font-black uppercase text-purple-200"
                >
                  Login
                </Link>

                <Link
                  href="/cadastro"
                  onClick={() => setOpen(false)}
                  className="rounded-2xl border border-purple-400/50 bg-purple-700/40 p-4 text-center font-black uppercase text-white"
                >
                  Cadastro
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}