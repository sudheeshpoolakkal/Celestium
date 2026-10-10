"use client";

import { createContext, useContext } from "react";

export type FlowMode = "none" | "both" | "particles" | "ribbons" | "surface";
export type ModuleKind = "medical" | "cargo" | "research";

export type Motion = {
  tilt: number;
  doors: number;
  doorsTarget: number;
  rotor: number;
  flow: FlowMode;
  xray: boolean;
  module: ModuleKind;
  spin: boolean;
  reduced: boolean;
  showScale: boolean;
  showDims: boolean;
};

const MotionContext = createContext<Motion | null>(null);

export function MotionProvider({ value, children }: { value: Motion; children: React.ReactNode }) {
  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
}

export function useMotion() {
  const value = useContext(MotionContext);
  if (!value) throw new Error("MotionProvider missing");
  return value;
}
