import type { Metadata } from "next";
import Link from "next/link";
import { Chrome } from "@/components/chrome";
export const metadata: Metadata = {
  title: "Privacy information",
  description:
    "How the current Celestium website handles local enquiry information and third-party references.",
};
export default function PrivacyPage() {
  return (
    <Chrome>
      <article className="c-site">
        <header className="c-container c-journal-heading">
          <p className="c-eyebrow">Celestium / Privacy information</p>
          <h1>
            Your enquiry.
            <br />
            On your device.
          </h1>
          <p>
            This page describes the current website implementation, including the local preview and
            downloadable enquiry builder.
          </p>
        </header>
        <div className="c-container c-article-body c-information-body">
          <section>
            <h2>The local enquiry builder</h2>
            <p>
              Name, optional email, organisation and enquiry details are held in browser memory while the page
              is open. The builder does not submit them to a server, send an email or save them in local
              storage. Downloading creates a Markdown file on your device for you to review and share.
            </p>
            <p>
              Leaving or reloading the page clears the in-memory form. Your browser may offer its own autofill
              or form restoration independently.
            </p>
          </section>
          <section>
            <h2>Media and fonts</h2>
            <p>
              Selected Bell reference images and animations are hosted as local website assets. The site does
              not embed Bell’s Vimeo players. Fonts are self-hosted through the application build.
            </p>
          </section>
          <section>
            <h2>Analytics and hosting</h2>
            <p>
              The application does not include third-party analytics or advertising scripts. A hosting
              provider or local server may generate ordinary request logs independently of the application. A
              public deployment would need privacy information appropriate to that hosting configuration.
            </p>
          </section>
          <section>
            <h2>External links</h2>
            <p>
              Following a Bell source link or another external reference opens that provider’s website. Its
              own privacy practices apply there. The Celestium enquiry form does not transfer your details to
              those references.
            </p>
          </section>
          <Link className="c-text-link" href="/contact">
            Return to enquiry preparation ↗
          </Link>
        </div>
      </article>
    </Chrome>
  );
}
