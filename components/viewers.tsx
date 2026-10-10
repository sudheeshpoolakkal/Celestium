"use client";

import dynamic from "next/dynamic";
import { Component, type ReactNode } from "react";
import { WebGLGate, WebGLFallback } from "./webgl-gate";

const StudioContent = dynamic(() => import("./studio").then((mod) => mod.Studio), {
  ssr: false,
  loading: () => <div className="stage-wait">Preparing Taraka X-1</div>,
});

export function Studio() {
  return (
    <WebGLGate fullPage>
      <StudioBoundary>
        <StudioContent />
      </StudioBoundary>
    </WebGLGate>
  );
}

class StudioBoundary extends Component<{ children: ReactNode }, { error: boolean }> {
  state = { error: false };
  static getDerivedStateFromError() {
    return { error: true };
  }
  render() {
    if (this.state.error) return <WebGLFallback fullPage />;
    return this.props.children;
  }
}
