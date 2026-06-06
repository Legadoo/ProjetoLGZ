import type { IconType } from "react-icons";

type AdminPageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  icon: IconType;
  actionLabel?: string;
};

export function AdminPageHeader({
  eyebrow,
  title,
  description,
  icon: Icon,
  actionLabel,
}: AdminPageHeaderProps) {
  return (
    <section className="mb-6 overflow-hidden rounded-[1.7rem] border border-purple-500/30 bg-[radial-gradient(circle_at_85%_20%,rgba(176,38,255,0.22),transparent_30%),linear-gradient(135deg,rgba(14,0,26,0.98),rgba(3,0,8,0.98))] p-6 shadow-[0_0_45px_rgba(126,34,206,0.14)] md:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex gap-5">
          <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl border border-purple-500/40 bg-purple-950/40 text-2xl text-purple-200 shadow-[0_0_25px_rgba(176,38,255,0.22)]">
            <Icon />
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">
              {eyebrow}
            </p>

            <h1 className="mt-2 text-3xl font-black uppercase md:text-4xl">
              {title}
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-400 md:text-base">
              {description}
            </p>
          </div>
        </div>

        {actionLabel && (
          <button className="rounded-2xl border border-purple-400/50 bg-purple-700/30 px-5 py-3 text-sm font-black uppercase text-purple-100 shadow-[0_0_22px_rgba(176,38,255,0.18)] transition hover:bg-purple-600/50">
            {actionLabel}
          </button>
        )}
      </div>
    </section>
  );
}