"use client";

import Image from "next/image";
import { ActionLink, Figure, PageIntro } from "./editorial";
import { useEffect, useState, type ReactNode } from "react";

export function WebGLGate({
  children,
  fullPage = false,
  onSupportChange,
}: {
  children: ReactNode;
  fullPage?: boolean;
  onSupportChange?: (supported: boolean) => void;
}) {
  const [supported, setSupported] = useState<boolean | null>(null);
  useEffect(() => {
    let context: WebGL2RenderingContext | null = null;
    let available = false;
    try {
      context = document.createElement("canvas").getContext("webgl2");
      available = Boolean(context);
    } catch {
      available = false;
    } finally {
      context?.getExtension("WEBGL_lose_context")?.loseContext();
    }
    setSupported(available);
    onSupportChange?.(available);
  }, [onSupportChange]);

  if (supported === false) return <WebGLFallback fullPage={fullPage} />;
  if (supported === null)
    return (
      <div className={fullPage ? "studio-loading" : "preview-loading"}>
        <div className="stage-wait">Preparing Taraka X-1</div>
      </div>
    );
  return children;
}

export function WebGLFallback({
  fullPage = false,
  reason = "webgl",
}: {
  fullPage?: boolean;
  reason?: "webgl" | "javascript";
}) {
  if (fullPage)
    return (
      <article className="editorial-page studio-fallback">
        <PageIntro
          chapter="The aircraft studio"
          title={
            <>
              Explore
              <br />
              <span>Taraka X-1.</span>
            </>
          }
          description={
            reason === "javascript"
              ? "The interactive studio needs JavaScript. Enable it to explore the 3D model, or continue with the aircraft introduction below."
              : "The interactive studio needs WebGL 2. Enable hardware acceleration in your browser to use the 3D model, or continue with the aircraft introduction below."
          }
          dark
        >
          <ActionLink href="/aircraft">Discover the aircraft</ActionLink>
        </PageIntro>
        <div className="container editorial-section">
          <Figure
            src="/images/taraka-dawn-v2.webp"
            alt="Taraka X-1 twin-duct aircraft concept"
            caption="Taraka X-1 / Twin-duct research configuration"
          />
          <div className="fallback-actions">
            <ActionLink href="/aircraft" solid>
              View the aircraft introduction
            </ActionLink>
            <ActionLink href="/technology">Explore the technology</ActionLink>
          </div>
        </div>
      </article>
    );
  return (
    <div className="preview-fallback">
      <Image
        src="/images/taraka-dawn-v2.webp"
        alt="Taraka X-1 aircraft concept"
        width={1672}
        height={941}
        sizes="(max-width: 800px) 100vw, 90vw"
      />
      <p>3D requires a browser with WebGL 2 enabled. You can still explore the architecture and research.</p>
    </div>
  );
}
