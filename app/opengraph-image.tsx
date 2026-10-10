import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { CelestiumMark } from "@/components/celestium-mark";

export const runtime = "nodejs";
export const alt = "Celestium — A new era of flight. Introducing the MALUS research program and Taraka X-1.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const aircraft = await readFile(join(process.cwd(), "assets/resources/images/taraka-dawn-v2.jpg"));
  const image = `data:image/jpeg;base64,${aircraft.toString("base64")}`;
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        background: "#131313",
        color: "#f4f6ef",
        fontFamily: "sans-serif",
      }}
    >
      {/* This is a native brand layout composed around the existing concept asset. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image} width={1200} height={675} alt="" style={{ position: "absolute", top: 76, left: 0 }} />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: 360,
          display: "flex",
          background: "linear-gradient(#131313 30%, rgba(19,19,19,0.7) 65%, rgba(19,19,19,0))",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 95,
          display: "flex",
          background: "linear-gradient(rgba(19,19,19,0), #131313)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 38,
          left: 48,
          right: 48,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <CelestiumMark />
          <span style={{ fontSize: 25, letterSpacing: 3 }}>CELESTIUM</span>
        </div>
        <span style={{ fontSize: 13, color: "#c6d2c5", letterSpacing: 1.5 }}>CONCEPT DEVELOPMENT</span>
      </div>
      <div
        style={{
          position: "absolute",
          top: 107,
          left: 48,
          display: "flex",
          flexDirection: "column",
          fontSize: 48,
          letterSpacing: -3.5,
          lineHeight: 1.05,
        }}
      >
        <span>A new era</span>
        <span style={{ color: "#d4ded0" }}>of vertical flight.</span>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 27,
          left: 48,
          right: 48,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: 25, letterSpacing: -0.5 }}>Taraka X-1 / Medical air ambulance</span>
        <span style={{ fontSize: 10, color: "#c6d2c5", letterSpacing: 0.8 }}>
          ILLUSTRATIVE CONCEPT RENDERING
        </span>
      </div>
    </div>,
    size,
  );
}
