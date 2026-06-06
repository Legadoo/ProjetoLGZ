import type { IconType } from "react-icons";

type EmptyStateProps = {
  icon: IconType;
  title: string;
  description: string;
};

export function EmptyState({ icon: Icon, title, description }: EmptyStateProps) {
  return (
    <div className="rounded-3xl border border-purple-500/25 bg-black/35 p-8 text-center shadow-[0_0_35px_rgba(126,34,206,0.08)]">
      <div className="mx-auto mb-5 grid h-20 w-20 place-items-center rounded-3xl border border-purple-500/40 bg-purple-950/30 text-4xl text-purple-200">
        <Icon />
      </div>

      <h2 className="text-3xl font-black uppercase text-white">
        {title}
      </h2>

      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-zinc-400">
        {description}
      </p>
    </div>
  );
}