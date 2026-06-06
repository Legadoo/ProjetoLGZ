import type { IconType } from "react-icons";

type CustomerStatCardProps = {
  title: string;
  value: string;
  description: string;
  icon: IconType;
};

export function CustomerStatCard({
  title,
  value,
  description,
  icon: Icon,
}: CustomerStatCardProps) {
  return (
    <article className="group rounded-3xl border border-purple-500/25 bg-[linear-gradient(145deg,rgba(16,4,27,0.96),rgba(4,0,8,0.96))] p-6 shadow-[0_0_35px_rgba(176,38,255,0.10)] transition hover:-translate-y-1 hover:border-purple-400/60">
      <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl border border-purple-500/40 bg-purple-950/40 text-xl text-purple-200 transition group-hover:bg-purple-700/35">
        <Icon />
      </div>

      <p className="text-sm font-black uppercase tracking-[0.22em] text-zinc-500">
        {title}
      </p>

      <strong className="mt-2 block text-4xl font-black uppercase text-white">
        {value}
      </strong>

      <p className="mt-3 text-sm leading-6 text-zinc-400">
        {description}
      </p>
    </article>
  );
}