import type { Metadata } from "next";
import { ResourcePage } from "@/components/resource-page";
export const metadata: Metadata = {
  title: "Technical research resources",
  description: "The current MALUS concept documents, design assumptions and research resources.",
  alternates: { canonical: "/support/resources" },
};
export default function Page() {
  return <ResourcePage support />;
}
