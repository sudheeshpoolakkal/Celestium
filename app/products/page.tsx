import type { Metadata } from "next";
import { Chrome } from "@/components/chrome";
import { FlightCTA, FlightHero, FlightSectionHeading } from "@/components/flight-editorial";
import { ProductBrowser } from "@/components/product-browser";
export const metadata: Metadata = {
  title: "Aircraft & architecture studies",
  description:
    "Explore, filter and compare Celestium aircraft concepts and technology-reference architectures.",
  alternates: { canonical: "/products" },
};
export default function ProductsPage() {
  return (
    <Chrome tone="overlay">
      <div className="c-site">
        <FlightHero
          eyebrow="Aircraft / Explore the possibilities"
          title={
            <>
              Find a different
              <br />
              flight path.
            </>
          }
          description="Explore aircraft concepts, mission platforms and the architectures that challenge what vertical flight can be."
          image="/media/bell/tiltrotor-sunset.webp"
          alt="Bell V-280 aircraft concepts above a forest at sunset"
          href="#aircraft-studies"
          action="Explore the studies"
        />
        <section className="c-container c-section" id="aircraft-studies">
          <FlightSectionHeading
            eyebrow="Architecture / Mission / Research"
            title={
              <>
                A purpose for
                <br />
                <em>every study.</em>
              </>
            }
            description="Filter by architecture or mission. Compare the research focus of up to three studies. Bell reference imagery illustrates separate technology families."
          />
          <ProductBrowser />
        </section>
        <FlightCTA />
      </div>
    </Chrome>
  );
}
