import Link from "next/link";
import { notFound } from "next/navigation";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { updateAdminRecordAction } from "@/actions/crud.actions";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { requireAdminUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { FaEdit } from "react-icons/fa";

type PageProps = {
  params: Promise<{
    model: string;
    id: string;
  }>;
};

function dateTimeInputValue(date: Date | null | undefined) {
  if (!date) {
    return "";
  }

  return new Date(date).toISOString().slice(0, 16);
}

function dateInputValue(date: Date | null | undefined) {
  if (!date) {
    return "";
  }

  return new Date(date).toISOString().slice(0, 10);
}

function TextInput({
  name,
  label,
  defaultValue,
  required,
  type = "text",
}: {
  name: string;
  label: string;
  defaultValue?: string | number | null;
  required?: boolean;
  type?: string;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-black uppercase text-zinc-400">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue ?? ""}
        className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300"
      />
    </label>
  );
}

function TextArea({
  name,
  label,
  defaultValue,
}: {
  name: string;
  label: string;
  defaultValue?: string | null;
}) {
  return (
    <label className="grid gap-2 md:col-span-2">
      <span className="text-xs font-black uppercase text-zinc-400">{label}</span>
      <textarea
        name={name}
        defaultValue={defaultValue ?? ""}
        className="min-h-28 rounded-xl border border-purple-500/25 bg-black/40 p-4 text-white outline-none focus:border-purple-300"
      />
    </label>
  );
}

function Checkbox({
  name,
  label,
  defaultChecked,
}: {
  name: string;
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-center gap-3 rounded-xl border border-purple-500/20 bg-black/30 p-4 text-sm font-black uppercase text-purple-200">
      <input name={name} type="checkbox" defaultChecked={defaultChecked} />
      {label}
    </label>
  );
}

export default async function AdminEditPage({ params }: PageProps) {
  await requireAdminUser();

  const { model, id } = await params;

  const [categories, teams] = await Promise.all([
    prisma.productCategory.findMany({
      orderBy: {
        name: "asc",
      },
    }),
    prisma.team.findMany({
      orderBy: {
        name: "asc",
      },
    }),
  ]);

  let record: any = null;

  if (model === "product") {
    record = await prisma.product.findUnique({ where: { id } });
  }

  if (model === "category") {
    record = await prisma.productCategory.findUnique({ where: { id } });
  }

  if (model === "coupon") {
    record = await prisma.coupon.findUnique({ where: { id } });
  }

  if (model === "team") {
    record = await prisma.team.findUnique({ where: { id } });
  }

  if (model === "player") {
    record = await prisma.player.findUnique({ where: { id } });
  }

  if (model === "influencer") {
    record = await prisma.influencer.findUnique({ where: { id } });
  }

  if (model === "staff") {
    record = await prisma.staffMember.findUnique({ where: { id } });
  }

  if (model === "event") {
    record = await prisma.matchEvent.findUnique({ where: { id } });
  }

  if (model === "banner") {
    record = await prisma.banner.findUnique({ where: { id } });
  }

  if (!record) {
    notFound();
  }

  return (
    <>
      <AdminPageHeader
        eyebrow="Editar registro"
        title={`Editar ${model}`}
        description="Altere os campos necessários e salve. As páginas públicas e administrativas serão atualizadas após salvar."
        icon={FaEdit}
        actionLabel="Modo edição"
      />

      <div className="mb-6">
        <Link
          href="/admin/gerenciar"
          className="inline-flex items-center gap-2 rounded-2xl border border-purple-500/40 px-5 py-3 text-xs font-black uppercase text-purple-200 transition hover:bg-purple-950/40"
        >
          <FaArrowLeft />
          Voltar para gerenciar
        </Link>
      </div>

      <form action={updateAdminRecordAction} className="rounded-3xl border border-purple-500/25 bg-black/35 p-6">
        <input type="hidden" name="model" value={model} />
        <input type="hidden" name="id" value={id} />

        <div className="grid gap-4 md:grid-cols-2">
          {model === "product" && (
            <>
              <TextInput name="name" label="Nome" defaultValue={record.name} required />
              <TextInput name="slug" label="Slug" defaultValue={record.slug} required />
              <TextInput name="price" label="Preço" defaultValue={record.price} />
              <TextInput name="stockQuantity" label="Estoque" type="number" defaultValue={record.stockQuantity} />

              <label className="grid gap-2">
                <span className="text-xs font-black uppercase text-zinc-400">Categoria</span>
                <select
                  name="categoryId"
                  defaultValue={record.categoryId || ""}
                  className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300"
                >
                  <option value="">Sem categoria</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name} — {category.type}
                    </option>
                  ))}
                </select>
              </label>

              <TextInput name="imageUrl" label="Imagem URL" defaultValue={record.imageUrl} />
              <TextArea name="description" label="Descrição" defaultValue={record.description} />
              <Checkbox name="featured" label="Produto em destaque" defaultChecked={record.featured} />
              <Checkbox name="active" label="Ativo" defaultChecked={record.active} />
            </>
          )}

          {model === "category" && (
            <>
              <TextInput name="name" label="Nome" defaultValue={record.name} required />
              <TextInput name="slug" label="Slug" defaultValue={record.slug} required />

              <label className="grid gap-2">
                <span className="text-xs font-black uppercase text-zinc-400">Tipo</span>
                <select
                  name="type"
                  defaultValue={record.type}
                  className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300"
                >
                  <option value="ESPORTS_STORE">Loja E-sports</option>
                  <option value="LGZNETWORK">LGZNetwork</option>
                </select>
              </label>

              <TextArea name="description" label="Descrição" defaultValue={record.description} />
              <Checkbox name="active" label="Ativa" defaultChecked={record.active} />
            </>
          )}

          {model === "coupon" && (
            <>
              <TextInput name="code" label="Código" defaultValue={record.code} required />

              <label className="grid gap-2">
                <span className="text-xs font-black uppercase text-zinc-400">Tipo</span>
                <select
                  name="discountType"
                  defaultValue={record.discountType}
                  className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300"
                >
                  <option value="PERCENTAGE">Porcentagem</option>
                  <option value="FIXED">Valor fixo</option>
                </select>
              </label>

              <TextInput name="discountValue" label="Valor do desconto" defaultValue={record.discountValue} />
              <TextInput name="maxUses" label="Máximo de usos" type="number" defaultValue={record.maxUses} />
              <TextInput name="startsAt" label="Início" type="date" defaultValue={dateInputValue(record.startsAt)} />
              <TextInput name="expiresAt" label="Expiração" type="date" defaultValue={dateInputValue(record.expiresAt)} />
              <TextArea name="description" label="Descrição" defaultValue={record.description} />
              <Checkbox name="active" label="Ativo" defaultChecked={record.active} />
            </>
          )}

          {model === "team" && (
            <>
              <TextInput name="name" label="Nome" defaultValue={record.name} required />
              <TextInput name="game" label="Jogo/modalidade" defaultValue={record.game} required />
              <TextInput name="logoUrl" label="Logo URL" defaultValue={record.logoUrl} />
              <TextArea name="description" label="Descrição" defaultValue={record.description} />
              <Checkbox name="active" label="Ativo" defaultChecked={record.active} />
            </>
          )}

          {model === "player" && (
            <>
              <TextInput name="nickname" label="Nickname" defaultValue={record.nickname} required />
              <TextInput name="realName" label="Nome real" defaultValue={record.realName} />
              <TextInput name="role" label="Função" defaultValue={record.role} />
              <TextInput name="imageUrl" label="Imagem URL" defaultValue={record.imageUrl} />

              <label className="grid gap-2">
                <span className="text-xs font-black uppercase text-zinc-400">Time</span>
                <select
                  name="teamId"
                  defaultValue={record.teamId || ""}
                  className="h-12 rounded-xl border border-purple-500/25 bg-black/40 px-4 text-white outline-none focus:border-purple-300"
                >
                  <option value="">Sem time</option>
                  {teams.map((team) => (
                    <option key={team.id} value={team.id}>
                      {team.name} — {team.game}
                    </option>
                  ))}
                </select>
              </label>

              <TextArea name="bio" label="Bio" defaultValue={record.bio} />
              <Checkbox name="active" label="Ativo" defaultChecked={record.active} />
            </>
          )}

          {model === "influencer" && (
            <>
              <TextInput name="name" label="Nome" defaultValue={record.name} required />
              <TextInput name="nickname" label="Nickname" defaultValue={record.nickname} />
              <TextInput name="slug" label="Slug" defaultValue={record.slug} required />
              <TextInput name="contentCategory" label="Categoria de conteúdo" defaultValue={record.contentCategory} />
              <TextInput name="profileImageUrl" label="Foto URL" defaultValue={record.profileImageUrl} />
              <TextInput name="bannerImageUrl" label="Banner URL" defaultValue={record.bannerImageUrl} />
              <TextInput name="highlightPhrase" label="Frase destaque" defaultValue={record.highlightPhrase} />
              <TextInput name="instagramUrl" label="Instagram" defaultValue={record.instagramUrl} />
              <TextInput name="tiktokUrl" label="TikTok" defaultValue={record.tiktokUrl} />
              <TextInput name="youtubeUrl" label="YouTube" defaultValue={record.youtubeUrl} />
              <TextInput name="twitchUrl" label="Twitch" defaultValue={record.twitchUrl} />
              <TextInput name="twitterUrl" label="Twitter/X" defaultValue={record.twitterUrl} />
              <TextInput name="kickUrl" label="Kick" defaultValue={record.kickUrl} />
              <TextInput name="sortOrder" label="Ordem" type="number" defaultValue={record.sortOrder} />
              <TextArea name="shortBio" label="Bio curta" defaultValue={record.shortBio} />
              <TextArea name="fullBio" label="Bio completa" defaultValue={record.fullBio} />
              <TextArea name="legendaryzStory" label="História na Legendaryz" defaultValue={record.legendaryzStory} />
              <Checkbox name="featured" label="Destaque" defaultChecked={record.featured} />
              <Checkbox name="showOnHome" label="Aparece na Home" defaultChecked={record.showOnHome} />
              <Checkbox name="showOnInfluencersPage" label="Aparece na página de influenciadores" defaultChecked={record.showOnInfluencersPage} />
              <Checkbox name="active" label="Ativo" defaultChecked={record.active} />
            </>
          )}

          {model === "staff" && (
            <>
              <TextInput name="name" label="Nome" defaultValue={record.name} required />
              <TextInput name="nickname" label="Nickname" defaultValue={record.nickname} />
              <TextInput name="role" label="Cargo/função" defaultValue={record.role} required />
              <TextInput name="imageUrl" label="Imagem URL" defaultValue={record.imageUrl} />
              <TextArea name="bio" label="Bio" defaultValue={record.bio} />
              <Checkbox name="active" label="Ativo" defaultChecked={record.active} />
            </>
          )}

          {model === "event" && (
            <>
              <TextInput name="title" label="Título" defaultValue={record.title} required />
              <TextInput name="game" label="Jogo/modalidade" defaultValue={record.game} />
              <TextInput name="opponent" label="Adversário/evento" defaultValue={record.opponent} />
              <TextInput name="startsAt" label="Data e hora" type="datetime-local" defaultValue={dateTimeInputValue(record.startsAt)} required />
              <TextInput name="streamUrl" label="Link de transmissão" defaultValue={record.streamUrl} />
              <TextArea name="description" label="Descrição" defaultValue={record.description} />
              <Checkbox name="active" label="Ativo" defaultChecked={record.active} />
            </>
          )}

          {model === "banner" && (
            <>
              <TextInput name="title" label="Título" defaultValue={record.title} required />
              <TextInput name="section" label="Seção" defaultValue={record.section} />
              <TextInput name="imageUrl" label="Imagem URL" defaultValue={record.imageUrl} />
              <TextInput name="buttonText" label="Texto do botão" defaultValue={record.buttonText} />
              <TextInput name="buttonUrl" label="URL do botão" defaultValue={record.buttonUrl} />
              <TextInput name="sortOrder" label="Ordem" type="number" defaultValue={record.sortOrder} />
              <TextArea name="subtitle" label="Subtítulo" defaultValue={record.subtitle} />
              <Checkbox name="active" label="Ativo" defaultChecked={record.active} />
            </>
          )}
        </div>

        <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl border border-purple-400/50 bg-purple-700/30 px-5 py-4 text-sm font-black uppercase text-purple-100 transition hover:bg-purple-600/50">
          <FaSave />
          Salvar alterações
        </button>
      </form>
    </>
  );
}