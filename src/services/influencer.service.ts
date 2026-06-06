import {
  getPublicInfluencerBySlug,
  getPublicInfluencerSlugs,
  getPublicInfluencers,
} from "@/services/content.service";

export type InfluencerPreview = Awaited<ReturnType<typeof getPublicInfluencers>>[number];

export async function getInfluencers() {
  return getPublicInfluencers();
}

export async function getInfluencerBySlug(slug: string) {
  return getPublicInfluencerBySlug(slug);
}

export async function getInfluencerSlugs() {
  return getPublicInfluencerSlugs();
}