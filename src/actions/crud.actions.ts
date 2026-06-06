"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdminUser, requireCustomer } from "@/lib/session";
import { slugify } from "@/lib/utils";

function getString(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

function getNullableString(formData: FormData, key: string) {
  const value = getString(formData, key);
  return value || null;
}

function getBoolean(formData: FormData, key: string) {
  return String(formData.get(key) || "") === "on";
}

function getNumber(formData: FormData, key: string, fallback = 0) {
  const raw = String(formData.get(key) || String(fallback))
    .replace("R$", "")
    .replace(/\./g, "")
    .replace(",", ".")
    .trim();

  const number = Number(raw);

  if (Number.isNaN(number)) {
    return fallback;
  }

  return number;
}

function getInt(formData: FormData, key: string, fallback = 0) {
  const number = getNumber(formData, key, fallback);
  return Math.floor(number);
}

function getDateOrNull(formData: FormData, key: string) {
  const value = getString(formData, key);

  if (!value) {
    return null;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}

function revalidateAllAdminAndPublic() {
  revalidatePath("/");
  revalidatePath("/loja");
  revalidatePath("/lgznetwork");
  revalidatePath("/calendario");
  revalidatePath("/times");
  revalidatePath("/influenciadores");
  revalidatePath("/staff");
  revalidatePath("/sobre");
  revalidatePath("/admin/gerenciar");
  revalidatePath("/admin/produtos");
  revalidatePath("/admin/cupons");
  revalidatePath("/admin/pedidos");
  revalidatePath("/admin/times");
  revalidatePath("/admin/jogadores");
  revalidatePath("/admin/influenciadores");
  revalidatePath("/admin/staff");
  revalidatePath("/admin/calendario");
  revalidatePath("/admin/banners");
  revalidatePath("/admin/configuracoes");
  revalidatePath("/minha-conta/pedidos");
}

export async function updateAdminRecordAction(formData: FormData) {
  await requireAdminUser();

  const model = getString(formData, "model");
  const id = getString(formData, "id");

  if (!model || !id) {
    return;
  }

  if (model === "product") {
    const name = getString(formData, "name");
    const rawSlug = getString(formData, "slug");

    await prisma.product.update({
      where: { id },
      data: {
        name,
        slug: slugify(rawSlug || name),
        description: getNullableString(formData, "description"),
        price: getNumber(formData, "price"),
        imageUrl: getNullableString(formData, "imageUrl"),
        stockQuantity: getInt(formData, "stockQuantity"),
        featured: getBoolean(formData, "featured"),
        active: getBoolean(formData, "active"),
        categoryId: getNullableString(formData, "categoryId"),
      },
    });
  }

  if (model === "category") {
    const name = getString(formData, "name");
    const rawSlug = getString(formData, "slug");

    await prisma.productCategory.update({
      where: { id },
      data: {
        name,
        slug: slugify(rawSlug || name),
        description: getNullableString(formData, "description"),
        type: getString(formData, "type") === "LGZNETWORK" ? "LGZNETWORK" : "ESPORTS_STORE",
        active: getBoolean(formData, "active"),
      },
    });
  }

  if (model === "coupon") {
    await prisma.coupon.update({
      where: { id },
      data: {
        code: getString(formData, "code").toUpperCase(),
        description: getNullableString(formData, "description"),
        discountType: getString(formData, "discountType") === "FIXED" ? "FIXED" : "PERCENTAGE",
        discountValue: getNumber(formData, "discountValue"),
        startsAt: getDateOrNull(formData, "startsAt"),
        expiresAt: getDateOrNull(formData, "expiresAt"),
        maxUses: getString(formData, "maxUses") ? getInt(formData, "maxUses") : null,
        active: getBoolean(formData, "active"),
      },
    });
  }

  if (model === "team") {
    await prisma.team.update({
      where: { id },
      data: {
        name: getString(formData, "name"),
        game: getString(formData, "game"),
        description: getNullableString(formData, "description"),
        logoUrl: getNullableString(formData, "logoUrl"),
        active: getBoolean(formData, "active"),
      },
    });
  }

  if (model === "player") {
    await prisma.player.update({
      where: { id },
      data: {
        nickname: getString(formData, "nickname"),
        realName: getNullableString(formData, "realName"),
        role: getNullableString(formData, "role"),
        imageUrl: getNullableString(formData, "imageUrl"),
        bio: getNullableString(formData, "bio"),
        teamId: getNullableString(formData, "teamId"),
        active: getBoolean(formData, "active"),
      },
    });
  }

  if (model === "influencer") {
    const name = getString(formData, "name");
    const nickname = getString(formData, "nickname");
    const rawSlug = getString(formData, "slug");

    await prisma.influencer.update({
      where: { id },
      data: {
        name,
        nickname: nickname || null,
        slug: slugify(rawSlug || nickname || name),
        shortBio: getNullableString(formData, "shortBio"),
        fullBio: getNullableString(formData, "fullBio"),
        legendaryzStory: getNullableString(formData, "legendaryzStory"),
        contentCategory: getNullableString(formData, "contentCategory"),
        profileImageUrl: getNullableString(formData, "profileImageUrl"),
        bannerImageUrl: getNullableString(formData, "bannerImageUrl"),
        highlightPhrase: getNullableString(formData, "highlightPhrase"),
        instagramUrl: getNullableString(formData, "instagramUrl"),
        tiktokUrl: getNullableString(formData, "tiktokUrl"),
        youtubeUrl: getNullableString(formData, "youtubeUrl"),
        twitchUrl: getNullableString(formData, "twitchUrl"),
        twitterUrl: getNullableString(formData, "twitterUrl"),
        kickUrl: getNullableString(formData, "kickUrl"),
        featured: getBoolean(formData, "featured"),
        showOnHome: getBoolean(formData, "showOnHome"),
        showOnInfluencersPage: getBoolean(formData, "showOnInfluencersPage"),
        sortOrder: getInt(formData, "sortOrder"),
        active: getBoolean(formData, "active"),
      },
    });
  }

  if (model === "staff") {
    await prisma.staffMember.update({
      where: { id },
      data: {
        name: getString(formData, "name"),
        nickname: getNullableString(formData, "nickname"),
        role: getString(formData, "role"),
        imageUrl: getNullableString(formData, "imageUrl"),
        bio: getNullableString(formData, "bio"),
        active: getBoolean(formData, "active"),
      },
    });
  }

  if (model === "event") {
    const startsAt = getDateOrNull(formData, "startsAt");

    if (!startsAt) {
      return;
    }

    await prisma.matchEvent.update({
      where: { id },
      data: {
        title: getString(formData, "title"),
        game: getNullableString(formData, "game"),
        opponent: getNullableString(formData, "opponent"),
        startsAt,
        description: getNullableString(formData, "description"),
        streamUrl: getNullableString(formData, "streamUrl"),
        active: getBoolean(formData, "active"),
      },
    });
  }

  if (model === "banner") {
    await prisma.banner.update({
      where: { id },
      data: {
        title: getString(formData, "title"),
        subtitle: getNullableString(formData, "subtitle"),
        imageUrl: getNullableString(formData, "imageUrl"),
        buttonText: getNullableString(formData, "buttonText"),
        buttonUrl: getNullableString(formData, "buttonUrl"),
        section: getString(formData, "section").toUpperCase() || "HOME_HERO",
        sortOrder: getInt(formData, "sortOrder"),
        active: getBoolean(formData, "active"),
      },
    });
  }

  revalidateAllAdminAndPublic();
  redirect("/admin/gerenciar?updated=1");
}

async function safeDeleteOrDeactivate(model: string, id: string) {
  try {
    if (model === "product") {
      await prisma.product.delete({ where: { id } });
      return;
    }

    if (model === "category") {
      await prisma.productCategory.delete({ where: { id } });
      return;
    }

    if (model === "coupon") {
      await prisma.coupon.delete({ where: { id } });
      return;
    }

    if (model === "team") {
      await prisma.team.delete({ where: { id } });
      return;
    }

    if (model === "player") {
      await prisma.player.delete({ where: { id } });
      return;
    }

    if (model === "influencer") {
      await prisma.influencerGalleryImage.deleteMany({
        where: {
          influencerId: id,
        },
      });

      await prisma.influencer.delete({ where: { id } });
      return;
    }

    if (model === "staff") {
      await prisma.staffMember.delete({ where: { id } });
      return;
    }

    if (model === "event") {
      await prisma.matchEvent.delete({ where: { id } });
      return;
    }

    if (model === "banner") {
      await prisma.banner.delete({ where: { id } });
      return;
    }
  } catch {
    if (model === "product") {
      await prisma.product.update({ where: { id }, data: { active: false } });
      return;
    }

    if (model === "category") {
      await prisma.productCategory.update({ where: { id }, data: { active: false } });
      return;
    }

    if (model === "coupon") {
      await prisma.coupon.update({ where: { id }, data: { active: false } });
      return;
    }

    if (model === "team") {
      await prisma.team.update({ where: { id }, data: { active: false } });
      return;
    }

    if (model === "player") {
      await prisma.player.update({ where: { id }, data: { active: false } });
      return;
    }

    if (model === "influencer") {
      await prisma.influencer.update({ where: { id }, data: { active: false } });
      return;
    }

    if (model === "staff") {
      await prisma.staffMember.update({ where: { id }, data: { active: false } });
      return;
    }

    if (model === "event") {
      await prisma.matchEvent.update({ where: { id }, data: { active: false } });
      return;
    }

    if (model === "banner") {
      await prisma.banner.update({ where: { id }, data: { active: false } });
      return;
    }
  }
}

export async function deleteAdminRecordAction(formData: FormData) {
  await requireAdminUser();

  const model = getString(formData, "model");
  const id = getString(formData, "id");

  if (!model || !id) {
    return;
  }

  await safeDeleteOrDeactivate(model, id);

  revalidateAllAdminAndPublic();
  redirect("/admin/gerenciar?deleted=1");
}

export async function cancelOrderAdminAction(formData: FormData) {
  await requireAdminUser();

  const id = getString(formData, "id");

  if (!id) {
    return;
  }

  await prisma.order.update({
    where: {
      id,
    },
    data: {
      status: "CANCELED",
    },
  });

  revalidateAllAdminAndPublic();
  redirect("/admin/gerenciar?orderCanceled=1");
}

export async function cancelCustomerOrderAction(formData: FormData) {
  const customer = await requireCustomer();

  const id = getString(formData, "id");

  if (!id) {
    return;
  }

  const order = await prisma.order.findFirst({
    where: {
      id,
      customerId: customer.id,
    },
  });

  if (!order) {
    return;
  }

  if (order.status !== "PENDING") {
    return;
  }

  await prisma.order.update({
    where: {
      id,
    },
    data: {
      status: "CANCELED",
    },
  });

  revalidatePath("/minha-conta/pedidos");
  revalidatePath("/admin/pedidos");
  revalidatePath("/admin/gerenciar");
  redirect("/minha-conta/pedidos?canceled=1");
}