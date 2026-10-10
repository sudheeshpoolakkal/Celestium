import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FLIGHT_PAGES, findFlightPage } from "@/lib/flight-pages";
import { TopicPage } from "@/components/topic-page";

export const dynamicParams = true;
export function generateStaticParams() {
  return FLIGHT_PAGES.map((p) => ({ slug: p.path.slice(1).split("/") }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = findFlightPage(`/${slug.join("/")}`);
  return page
    ? {
        title: page.label,
        description: page.subtitle,
        alternates: { canonical: page.path },
        openGraph: { title: page.label, description: page.subtitle, images: [page.image] },
      }
    : {};
}
export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const page = findFlightPage(`/${slug.join("/")}`);
  if (!page) notFound();
  return <TopicPage page={page} />;
}
