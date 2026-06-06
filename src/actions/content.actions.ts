"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdminUser } from "@/lib/session";
import { slugify } from "@/lib/utils";

function normalizeBoolean(value: FormDataEntryValue | null) {
  return String(value || "") === "on";
}

function normalizeInt(value: FormDataEntryValue | null) {
  const numberValue = Number(String(value || "0"));

  if (Number.isNaN(numberValue)) {
    return 0;
  }

  return Math.floor(numberValue);
}

async function createUniqueInfluencerSlug(baseSlug: string) {
  let slug = baseSlug || "influenciador";
  let count = 1;

  while (true) {
    const exists = await prisma.influencer.findUnique({
      where: {
        slug,
      },
    });

    if (!exists) {
      return slug;
    }

    count++;
    slug = `${baseSlug}-${count}`;
  }
}

export async function createTeamAction(formData: FormData) {
  await requireAdminUser();

  const name = String(formData.get("name") || "").trim();
  const game = String(formData.get("game") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const logoUrl = String(formData.get("logoUrl") || "").trim();

  if (!name || !game) {
    return;
  }

  await prisma.team.create({
    data: {
      name,
      game,
      description: description || null,
      logoUrl: logoUrl || null,
      active: true,
    },
  });

  revalidatePath("/admin/times");
  revalidatePath("/times");
}

export async function toggleTeamStatusAction(formData: FormData) {
  await requireAdminUser();

  const id = String(formData.get("id") || "");
  const active = String(formData.get("active") || "") === "true";

  if (!id) {
    return;
  }

  await prisma.team.update({
    where: {
      id,
    },
    data: {
      active: !active,
    },
  });

  revalidatePath("/admin/times");
  revalidatePath("/times");
}

export async function createPlayerAction(formData: FormData) {
  await requireAdminUser();

  const nickname = String(formData.get("nickname") || "").trim();
  const realName = String(formData.get("realName") || "").trim();
  const role = String(formData.get("role") || "").trim();
  const imageUrl = String(formData.get("imageUrl") || "").trim();
  const bio = String(formData.get("bio") || "").trim();
  const teamId = String(formData.get("teamId") || "").trim();

  if (!nickname) {
    return;
  }

  await prisma.player.create({
    data: {
      nickname,
      realName: realName || null,
      role: role || null,
      imageUrl: imageUrl || null,
      bio: bio || null,
      teamId: teamId || null,
      active: true,
    },
  });

  revalidatePath("/admin/jogadores");
  revalidatePath("/admin/times");
  revalidatePath("/times");
}

export async function togglePlayerStatusAction(formData: FormData) {
  await requireAdminUser();

  const id = String(formData.get("id") || "");
  const active = String(formData.get("active") || "") === "true";

  if (!id) {
    return;
  }

  await prisma.player.update({
    where: {
      id,
    },
    data: {
      active: !active,
    },
  });

  revalidatePath("/admin/jogadores");
  revalidatePath("/times");
}

export async function createInfluencerAction(formData: FormData) {
  await requireAdminUser();

  const name = String(formData.get("name") || "").trim();
  const nickname = String(formData.get("nickname") || "").trim();
  const slugInput = String(formData.get("slug") || "").trim();
  const shortBio = String(formData.get("shortBio") || "").trim();
  const fullBio = String(formData.get("fullBio") || "").trim();
  const legendaryzStory = String(formData.get("legendaryzStory") || "").trim();
  const contentCategory = String(formData.get("contentCategory") || "").trim();
  const profileImageUrl = String(formData.get("profileImageUrl") || "").trim();
  const bannerImageUrl = String(formData.get("bannerImageUrl") || "").trim();
  const highlightPhrase = String(formData.get("highlightPhrase") || "").trim();
  const instagramUrl = String(formData.get("instagramUrl") || "").trim();
  const tiktokUrl = String(formData.get("tiktokUrl") || "").trim();
  const youtubeUrl = String(formData.get("youtubeUrl") || "").trim();
  const twitchUrl = String(formData.get("twitchUrl") || "").trim();
  const twitterUrl = String(formData.get("twitterUrl") || "").trim();
  const kickUrl = String(formData.get("kickUrl") || "").trim();

  const featured = normalizeBoolean(formData.get("featured"));
  const showOnHome = normalizeBoolean(formData.get("showOnHome"));
  const showOnInfluencersPage = normalizeBoolean(formData.get("showOnInfluencersPage")) || true;
  const sortOrder = normalizeInt(formData.get("sortOrder"));

  if (!name) {
    return;
  }

  const baseSlug = slugify(slugInput || nickname || name);
  const slug = await createUniqueInfluencerSlug(baseSlug);

  await prisma.influencer.create({
    data: {
      name,
      nickname: nickname || null,
      slug,
      shortBio: shortBio || null,
      fullBio: fullBio || null,
      legendaryzStory: legendaryzStory || null,
      contentCategory: contentCategory || null,
      profileImageUrl: profileImageUrl || null,
      bannerImageUrl: bannerImageUrl || null,
      highlightPhrase: highlightPhrase || null,
      instagramUrl: instagramUrl || null,
      tiktokUrl: tiktokUrl || null,
      youtubeUrl: youtubeUrl || null,
      twitchUrl: twitchUrl || null,
      twitterUrl: twitterUrl || null,
      kickUrl: kickUrl || null,
      active: true,
      featured,
      showOnHome,
      showOnInfluencersPage,
      sortOrder,
    },
  });

  revalidatePath("/admin/influenciadores");
  revalidatePath("/influenciadores");
}

export async function toggleInfluencerStatusAction(formData: FormData) {
  await requireAdminUser();

  const id = String(formData.get("id") || "");
  const active = String(formData.get("active") || "") === "true";

  if (!id) {
    return;
  }

  await prisma.influencer.update({
    where: {
      id,
    },
    data: {
      active: !active,
    },
  });

  revalidatePath("/admin/influenciadores");
  revalidatePath("/influenciadores");
}

export async function createStaffMemberAction(formData: FormData) {
  await requireAdminUser();

  const name = String(formData.get("name") || "").trim();
  const nickname = String(formData.get("nickname") || "").trim();
  const role = String(formData.get("role") || "").trim();
  const imageUrl = String(formData.get("imageUrl") || "").trim();
  const bio = String(formData.get("bio") || "").trim();

  if (!name || !role) {
    return;
  }

  await prisma.staffMember.create({
    data: {
      name,
      nickname: nickname || null,
      role,
      imageUrl: imageUrl || null,
      bio: bio || null,
      active: true,
    },
  });

  revalidatePath("/admin/staff");
  revalidatePath("/staff");
}

export async function toggleStaffMemberStatusAction(formData: FormData) {
  await requireAdminUser();

  const id = String(formData.get("id") || "");
  const active = String(formData.get("active") || "") === "true";

  if (!id) {
    return;
  }

  await prisma.staffMember.update({
    where: {
      id,
    },
    data: {
      active: !active,
    },
  });

  revalidatePath("/admin/staff");
  revalidatePath("/staff");
}