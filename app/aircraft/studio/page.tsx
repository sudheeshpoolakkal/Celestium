import type { Metadata } from "next";
import { Chrome } from "@/components/chrome";
import { Studio } from "@/components/viewers";
import { WebGLFallback } from "@/components/webgl-gate";

export const metadata: Metadata = {
  title: "Aircraft studio",
  description:
    "Explore the Taraka X-1 research geometry, tilting ducts, mission modules and illustrative analytic flow field in an interactive 3D studio.",
};

export default function AircraftStudioPage() {
  return (
    <Chrome tone="overlay">
      <Studio />
      <noscript>
        <WebGLFallback fullPage reason="javascript" />
      </noscript>
    </Chrome>
  );
}
