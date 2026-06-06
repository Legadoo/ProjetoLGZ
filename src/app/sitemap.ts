import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3008";

  const publicRoutes = [
    "",
    "/loja",
    "/lgznetwork",
    "/calendario",
    "/times",
    "/influenciadores",
    "/staff",
    "/sobre",
    "/login",
    "/cadastro",
  ];

  return publicRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}