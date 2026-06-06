"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  FaBoxOpen,
  FaCalendarAlt,
  FaEdit,
  FaImage,
  FaPercent,
  FaSearch,
  FaShoppingBag,
  FaStar,
  FaTags,
  FaTimesCircle,
  FaTrash,
  FaTrophy,
  FaUserShield,
  FaUsersCog,
} from "react-icons/fa";
import {
  cancelOrderAdminAction,
  deleteAdminRecordAction,
} from "@/actions/crud.actions";

type CrudItem = {
  id: string;
  title: string;
  subtitle: string;
  status?: string;
};

type OrderItem = {
  id: string;
  title: string;
  subtitle: string;
  status: string;
  total: string;
  customer: string;
};

type CrudSection = {
  key: string;
  label: string;
  model: string;
  iconName: string;
  items: CrudItem[];
};

type AdminCrudManagerProps = {
  sections: CrudSection[];
  orders: OrderItem[];
};

const iconMap = {
  products: FaBoxOpen,
  categories: FaTags,
  coupons: FaPercent,
  teams: FaTrophy,
  players: FaUsersCog,
  influencers: FaStar,
  staff: FaUserShield,
  events: FaCalendarAlt,
  banners: FaImage,
  orders: FaShoppingBag,
};

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function AdminCrudManager({ sections, orders }: AdminCrudManagerProps) {
  const [selectedCrud, setSelectedCrud] = useState("all");
  const [search, setSearch] = useState("");

  const searchTerm = normalize(search.trim());

  const filteredSections = useMemo(() => {
    return sections
      .filter((section) => selectedCrud === "all" || section.key === selectedCrud)
      .map((section) => {
        const filteredItems = section.items.filter((item) => {
          if (!searchTerm) {
            return true;
          }

          const searchable = normalize(
            `${item.title} ${item.subtitle} ${item.status || ""}`
          );

          return searchable.includes(searchTerm);
        });

        return {
          ...section,
          items: filteredItems,
        };
      });
  }, [sections, selectedCrud, searchTerm]);

  const filteredOrders = useMemo(() => {
    if (selectedCrud !== "all" && selectedCrud !== "orders") {
      return [];
    }

    return orders.filter((order) => {
      if (!searchTerm) {
        return true;
      }

      const searchable = normalize(
        `${order.title} ${order.subtitle} ${order.status} ${order.customer} ${order.total}`
      );

      return searchable.includes(searchTerm);
    });
  }, [orders, selectedCrud, searchTerm]);

  const totalFound =
    filteredSections.reduce((total, section) => total + section.items.length, 0) +
    filteredOrders.length;

  const filterButtons = [
    {
      key: "all",
      label: "Todos",
      count:
        sections.reduce((total, section) => total + section.items.length, 0) +
        orders.length,
      icon: FaSearch,
    },
    ...sections.map((section) => ({
      key: section.key,
      label: section.label,
      count: section.items.length,
      icon: iconMap[section.key as keyof typeof iconMap] || FaSearch,
    })),
    {
      key: "orders",
      label: "Pedidos",
      count: orders.length,
      icon: FaShoppingBag,
    },
  ];

  return (
    <div className="grid gap-6">
      <section className="rounded-3xl border border-purple-500/25 bg-black/35 p-5">
        <div className="grid gap-5 xl:grid-cols-[1fr_360px] xl:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">
              Filtro por CRUD
            </p>

            <h2 className="mt-2 text-2xl font-black uppercase">
              Escolha o módulo para gerenciar
            </h2>

            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Use os botões para mostrar apenas um tipo de registro e a busca para encontrar rapidamente o item desejado.
            </p>
          </div>

          <label className="relative block">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300" />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar por nome, slug, status..."
              className="h-14 w-full rounded-2xl border border-purple-500/30 bg-black/50 pl-12 pr-4 text-white outline-none transition focus:border-purple-300"
            />
          </label>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {filterButtons.map((button) => {
            const Icon = button.icon;
            const active = selectedCrud === button.key;

            return (
              <button
                key={button.key}
                type="button"
                onClick={() => setSelectedCrud(button.key)}
                className={`inline-flex items-center gap-2 rounded-2xl border px-4 py-3 text-xs font-black uppercase transition ${
                  active
                    ? "border-purple-300/70 bg-purple-700/35 text-white shadow-[0_0_24px_rgba(176,38,255,0.20)]"
                    : "border-purple-500/25 bg-black/30 text-zinc-400 hover:border-purple-400/50 hover:text-purple-100"
                }`}
              >
                <Icon />
                {button.label}
                <span className="rounded-full border border-purple-500/30 bg-black/30 px-2 py-1 text-[10px] text-purple-200">
                  {button.count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-5 rounded-2xl border border-purple-500/20 bg-purple-950/15 p-4 text-sm text-zinc-300">
          Resultado atual:{" "}
          <strong className="text-purple-200">{totalFound}</strong>{" "}
          registro(s) encontrado(s).
        </div>
      </section>

      {filteredSections.map((section) => {
        const Icon = iconMap[section.key as keyof typeof iconMap] || FaSearch;

        return (
          <section
            key={section.key}
            className="overflow-hidden rounded-3xl border border-purple-500/25 bg-black/35"
          >
            <div className="flex flex-col gap-3 border-b border-purple-500/20 p-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">
                  CRUD
                </p>

                <h2 className="mt-2 flex items-center gap-3 text-2xl font-black uppercase">
                  <Icon className="text-purple-300" />
                  {section.label}
                </h2>
              </div>

              <span className="w-fit rounded-full border border-purple-500/30 bg-purple-950/20 px-4 py-2 text-xs font-black uppercase text-purple-200">
                {section.items.length} item(ns)
              </span>
            </div>

            <div className="grid gap-3 p-4">
              {section.items.map((item) => (
                <article
                  key={item.id}
                  className="flex flex-col gap-4 rounded-2xl border border-purple-500/15 bg-black/30 p-4 md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <h3 className="font-black uppercase text-white">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-sm text-zinc-500">
                      {item.subtitle}
                    </p>

                    {item.status && (
                      <p className="mt-2 text-xs font-black uppercase text-purple-300">
                        {item.status}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Link
                      href={`/admin/editar/${section.model}/${item.id}`}
                      className="inline-flex items-center gap-2 rounded-xl border border-purple-500/40 px-4 py-2 text-xs font-black uppercase text-purple-200 transition hover:bg-purple-700/30"
                    >
                      <FaEdit />
                      Editar
                    </Link>

                    <form action={deleteAdminRecordAction}>
                      <input type="hidden" name="model" value={section.model} />
                      <input type="hidden" name="id" value={item.id} />

                      <button className="inline-flex items-center gap-2 rounded-xl border border-red-500/40 px-4 py-2 text-xs font-black uppercase text-red-200 transition hover:bg-red-950/30">
                        <FaTrash />
                        Excluir
                      </button>
                    </form>
                  </div>
                </article>
              ))}

              {section.items.length === 0 && (
                <div className="rounded-2xl border border-purple-500/15 bg-black/30 p-6 text-center text-zinc-500">
                  Nenhum registro encontrado neste filtro.
                </div>
              )}
            </div>
          </section>
        );
      })}

      {(selectedCrud === "all" || selectedCrud === "orders") && (
        <section className="overflow-hidden rounded-3xl border border-purple-500/25 bg-black/35">
          <div className="flex flex-col gap-3 border-b border-purple-500/20 p-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">
                Pedidos
              </p>

              <h2 className="mt-2 flex items-center gap-3 text-2xl font-black uppercase">
                <FaShoppingBag className="text-purple-300" />
                Cancelar pedidos
              </h2>
            </div>

            <span className="w-fit rounded-full border border-purple-500/30 bg-purple-950/20 px-4 py-2 text-xs font-black uppercase text-purple-200">
              {filteredOrders.length} pedido(s)
            </span>
          </div>

          <div className="grid gap-3 p-4">
            {filteredOrders.map((order) => (
              <article
                key={order.id}
                className="flex flex-col gap-4 rounded-2xl border border-purple-500/15 bg-black/30 p-4 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <h3 className="font-black uppercase text-white">
                    {order.title}
                  </h3>

                  <p className="mt-1 text-sm text-zinc-500">
                    {order.subtitle}
                  </p>

                  <p className="mt-2 text-xs font-black uppercase text-purple-300">
                    {order.status}
                  </p>
                </div>

                {order.status !== "CANCELED" ? (
                  <form action={cancelOrderAdminAction}>
                    <input type="hidden" name="id" value={order.id} />

                    <button className="inline-flex items-center gap-2 rounded-xl border border-red-500/40 px-4 py-2 text-xs font-black uppercase text-red-200 transition hover:bg-red-950/30">
                      <FaTimesCircle />
                      Cancelar
                    </button>
                  </form>
                ) : (
                  <span className="rounded-xl border border-zinc-500/30 px-4 py-2 text-xs font-black uppercase text-zinc-500">
                    Já cancelado
                  </span>
                )}
              </article>
            ))}

            {filteredOrders.length === 0 && (
              <div className="rounded-2xl border border-purple-500/15 bg-black/30 p-6 text-center text-zinc-500">
                Nenhum pedido encontrado neste filtro.
              </div>
            )}
          </div>
        </section>
      )}

      {totalFound === 0 && (
        <section className="rounded-3xl border border-purple-500/25 bg-black/35 p-10 text-center">
          <FaSearch className="mx-auto mb-5 text-5xl text-purple-300" />

          <h2 className="text-3xl font-black uppercase">
            Nada encontrado
          </h2>

          <p className="mt-3 text-zinc-400">
            Tente mudar o filtro ou limpar a busca.
          </p>
        </section>
      )}
    </div>
  );
}