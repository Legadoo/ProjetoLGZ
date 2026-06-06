"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdminUser } from "@/lib/session";
import { slugify } from "@/lib/utils";

function normalizePrice(value: FormDataEntryValue | null) {
  const rawValue = String(value || "0")
    .replace("R$", "")
    .replace(/\./g, "")
    .replace(",", ".")
    .trim();

  const numberValue = Number(rawValue);

  if (Number.isNaN(numberValue) || numberValue < 0) {
    return 0;
  }

  return numberValue;
}

function normalizeInt(value: FormDataEntryValue | null) {
  const numberValue = Number(String(value || "0"));

  if (Number.isNaN(numberValue) || numberValue < 0) {
    return 0;
  }

  return Math.floor(numberValue);
}

function normalizeBoolean(value: FormDataEntryValue | null) {
  return String(value || "") === "on";
}

async function createUniqueSlug(baseSlug: string, model: "product" | "productCategory") {
  let slug = baseSlug || "item";
  let count = 1;

  while (true) {
    const exists =
      model === "product"
        ? await prisma.product.findUnique({ where: { slug } })
        : await prisma.productCategory.findUnique({ where: { slug } });

    if (!exists) {
      return slug;
    }

    count++;
    slug = `${baseSlug}-${count}`;
  }
}

export async function createProductCategoryAction(formData: FormData) {
  await requireAdminUser();

  const name = String(formData.get("name") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const type = String(formData.get("type") || "ESPORTS_STORE");

  if (!name) {
    return;
  }

  const cleanType = type === "LGZNETWORK" ? "LGZNETWORK" : "ESPORTS_STORE";
  const slug = await createUniqueSlug(slugify(name), "productCategory");

  await prisma.productCategory.create({
    data: {
      name,
      slug,
      description: description || null,
      type: cleanType,
      active: true,
    },
  });

  revalidatePath("/admin/produtos");
  revalidatePath("/loja");
  revalidatePath("/lgznetwork");
}

export async function createProductAction(formData: FormData) {
  await requireAdminUser();

  const name = String(formData.get("name") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const imageUrl = String(formData.get("imageUrl") || "").trim();
  const categoryId = String(formData.get("categoryId") || "").trim();

  const price = normalizePrice(formData.get("price"));
  const stockQuantity = normalizeInt(formData.get("stockQuantity"));
  const featured = normalizeBoolean(formData.get("featured"));

  if (!name) {
    return;
  }

  const slug = await createUniqueSlug(slugify(name), "product");

  await prisma.product.create({
    data: {
      name,
      slug,
      description: description || null,
      price,
      imageUrl: imageUrl || null,
      stockQuantity,
      featured,
      active: true,
      categoryId: categoryId || null,
    },
  });

  revalidatePath("/admin/produtos");
  revalidatePath("/loja");
  revalidatePath("/lgznetwork");
}

export async function toggleProductStatusAction(formData: FormData) {
  await requireAdminUser();

  const id = String(formData.get("id") || "");
  const currentActive = String(formData.get("active") || "") === "true";

  if (!id) {
    return;
  }

  await prisma.product.update({
    where: {
      id,
    },
    data: {
      active: !currentActive,
    },
  });

  revalidatePath("/admin/produtos");
  revalidatePath("/loja");
  revalidatePath("/lgznetwork");
}

export async function toggleProductCategoryStatusAction(formData: FormData) {
  await requireAdminUser();

  const id = String(formData.get("id") || "");
  const currentActive = String(formData.get("active") || "") === "true";

  if (!id) {
    return;
  }

  await prisma.productCategory.update({
    where: {
      id,
    },
    data: {
      active: !currentActive,
    },
  });

  revalidatePath("/admin/produtos");
  revalidatePath("/loja");
  revalidatePath("/lgznetwork");
}