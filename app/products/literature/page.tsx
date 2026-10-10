import type { Metadata } from "next";
import { ResourcePage } from "@/components/resource-page";
export const metadata: Metadata = {
  title: "Program literature",
  description:
    "Download the Celestium MALUS program brief, Taraka X-1 design basis and mission research resources.",
  alternates: { canonical: "/products/literature" },
};
export default function Page() {
  return <ResourcePage />;
}
