import type { MetadataRoute } from "next";
import { ALL_ROUTES } from "@/lib/routes";
export default function sitemap(): MetadataRoute.Sitemap {
  const origin = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (!origin) return [];
  return ALL_ROUTES.map((route) => ({
    url: `${origin}${route.path}`,
    changeFrequency: "monthly" as const,
    priority: route.path === "/" ? 1 : route.path.split("/").length === 2 ? 0.8 : 0.6,
  }));
}
