import { Chrome } from "@/components/chrome";
import { ActionLink, PageIntro, RelatedPages } from "@/components/editorial";

export default function NotFound() {
  return (
    <Chrome>
      <PageIntro
        chapter="Page not found / 404"
        title={
          <>
            A different
            <br />
            <span>direction.</span>
          </>
        }
        description="This page could not be found. Explore Celestium, the MALUS architecture or discover Taraka X-1 from the links below."
      >
        <ActionLink href="/" solid>
          Return to Celestium
        </ActionLink>
      </PageIntro>
      <RelatedPages current="/missing" />
    </Chrome>
  );
}
