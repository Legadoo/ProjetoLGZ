import Link from "next/link";
import type { IconType } from "react-icons";
import { FaChevronRight } from "react-icons/fa";

type AdminModuleCardProps = {
  title: string;
  description: string;
  href: string;
  icon: IconType;
};

export function AdminModuleCard({
  title,
  description,
  href,
  icon: Icon,
}: AdminModuleCardProps) {
  return (
    <Link
      href={href}
      className="group rounded-3xl border border-purple-500/25 bg-black/35 p-6 transition hover:-translate-y-1 hover:border-purple-400/60 hover:bg-purple-950/20"
    >
      <div className="mb-5 flex items-center justify-between">
        <div className="grid h-14 w-14 place-items-center rounded-2xl border border-purple-500/35 bg-purple-950/35 text-xl text-purple-200">
          <Icon />
        </div>

        <span className="grid h-10 w-10 place-items-center rounded-xl border border-purple-500/25 text-purple-300 transition group-hover:bg-purple-700/40 group-hover:text-white">
          <FaChevronRight />
        </span>
      </div>

      <h3 className="text-2xl font-black uppercase text-white">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-zinc-400">
        {description}
      </p>
    </Link>
  );
}