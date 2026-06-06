import type { IconType } from "react-icons";

type PublicPageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  icon: IconType;
};

export function PublicPageHero({
  eyebrow,
  title,
  description,
  icon: Icon,
}: PublicPageHeroProps) {
  return (
    <section className="lgz-container mt-6 overflow-hidden rounded-[2rem] border border-purple-500/30 bg-[radial-gradient(circle_at_82%_20%,rgba(176,38,255,0.28),transparent_32%),linear-gradient(135deg,#12001f,#030006)] p-8 shadow-[0_0_50px_rgba(126,34,206,0.15)] md:p-12">
      <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-purple-500/30 bg-purple-950/30 px-5 py-3 text-xs font-black uppercase tracking-[0.25em] text-purple-200">
            <Icon />
            {eyebrow}
          </div>

          <h1 className="max-w-4xl text-5xl font-black uppercase leading-none md:text-7xl">
            {title}
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300">
            {description}
          </p>
        </div>

        <div className="grid h-32 w-32 shrink-0 place-items-center rounded-3xl border border-purple-500/40 bg-purple-950/30 text-5xl text-purple-200 shadow-[0_0_40px_rgba(176,38,255,0.25)] md:h-44 md:w-44 md:text-7xl">
          <Icon />
        </div>
      </div>
    </section>
  );
}