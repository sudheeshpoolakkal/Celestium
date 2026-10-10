import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { Chrome } from "@/components/chrome";
import { EnquiryBuilder } from "@/components/enquiry-builder";
export const metadata: Metadata = {
  title: "Start a research conversation",
  description:
    "Prepare a downloadable mission or research enquiry brief for Celestium. Information remains local until you choose to share it.",
  alternates: { canonical: "/contact" },
};
export default function ContactPage() {
  return (
    <Chrome>
      <div className="c-site">
        <header className="c-container c-journal-heading">
          <p className="c-eyebrow">Celestium / Let’s talk</p>
          <h1>
            Bring a question.
            <br />
            Begin a conversation.
          </h1>
          <p>
            Prepare a mission or research enquiry you can review, download and share. This preview creates a
            local brief; it does not send an email.
          </p>
        </header>
        <section className="c-container c-contact-layout">
          <aside className="c-contact-aside">
            <span className="c-eyebrow">A starting point</span>
            <h2>
              What would you
              <br />
              like to explore?
            </h2>
            <p>
              Aircraft architecture, energy systems, mission design or a focused research collaboration. A
              clear question gives the conversation a useful direction.
            </p>
            <div>
              <Link href="/research">Review the design basis ↗</Link>
              <Link href="/company/partners">Explore collaboration areas ↗</Link>
              <Link href="/products/literature">Download the program brief ↗</Link>
            </div>
            <p className="c-contact-status">
              Concept development
              <br />
              MALUS / Taraka X-1
            </p>
          </aside>
          <noscript>
            <div className="c-enquiry-noscript">
              <h2>Download a mission brief.</h2>
              <p>
                The interactive enquiry builder needs JavaScript. You can use the downloadable template to
                prepare the same research questions.
              </p>
              <a className="c-button" href="/resources/celestium-mission-brief-template.md" download>
                Download the brief template
              </a>
            </div>
          </noscript>
          <Suspense fallback={<p>Preparing the enquiry builder…</p>}>
            <EnquiryBuilder />
          </Suspense>
        </section>
      </div>
    </Chrome>
  );
}
