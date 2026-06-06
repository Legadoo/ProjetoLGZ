"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdminUser } from "@/lib/session";

function normalizeDateTime(value: FormDataEntryValue | null) {
  const rawValue = String(value || "").trim();

  if (!rawValue) {
    return null;
  }

  const date = new Date(rawValue);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}

export async function createMatchEventAction(formData: FormData) {
  await requireAdminUser();

  const title = String(formData.get("title") || "").trim();
  const game = String(formData.get("game") || "").trim();
  const opponent = String(formData.get("opponent") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const streamUrl = String(formData.get("streamUrl") || "").trim();
  const startsAt = normalizeDateTime(formData.get("startsAt"));

  if (!title || !startsAt) {
    return;
  }

  await prisma.matchEvent.create({
    data: {
      title,
      game: game || null,
      opponent: opponent || null,
      description: description || null,
      streamUrl: streamUrl || null,
      startsAt,
      active: true,
    },
  });

  revalidatePath("/admin/calendario");
  revalidatePath("/calendario");
  revalidatePath("/");
}

export async function toggleMatchEventStatusAction(formData: FormData) {
  await requireAdminUser();

  const id = String(formData.get("id") || "");
  const active = String(formData.get("active") || "") === "true";

  if (!id) {
    return;
  }

  await prisma.matchEvent.update({
    where: {
      id,
    },
    data: {
      active: !active,
    },
  });

  revalidatePath("/admin/calendario");
  revalidatePath("/calendario");
  revalidatePath("/");
}