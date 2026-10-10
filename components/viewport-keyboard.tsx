"use client";

import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import type { OrbitControls } from "three-stdlib";

/** Provide the same orbit and zoom inspection to keyboard users. */
export function ViewportKeyboard({ preview }: { preview: boolean }) {
  const gl = useThree((state) => state.gl);
  const camera = useThree((state) => state.camera);
  const controls = useThree((state) => state.controls) as OrbitControls | null;
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    if (!controls) return;
    const canvas = gl.domElement;
    canvas.tabIndex = 0;
    canvas.setAttribute("role", "img");
    canvas.setAttribute(
      "aria-label",
      `Interactive Taraka X-1 research model. Arrow keys orbit, plus and minus zoom, Home resets the view.${preview ? " Escape exits 3D." : ""}`,
    );
    const focus = () => canvas.focus({ preventScroll: true });
    const onKey = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey) return;
      switch (event.key) {
        case "ArrowLeft":
          controls.setAzimuthalAngle(controls.getAzimuthalAngle() - 0.16);
          break;
        case "ArrowRight":
          controls.setAzimuthalAngle(controls.getAzimuthalAngle() + 0.16);
          break;
        case "ArrowUp":
          controls.setPolarAngle(controls.getPolarAngle() - 0.1);
          break;
        case "ArrowDown":
          controls.setPolarAngle(controls.getPolarAngle() + 0.1);
          break;
        case "+":
        case "=":
          controls.dollyIn(0.88);
          break;
        case "-":
        case "_":
          controls.dollyOut(0.88);
          break;
        case "Home":
          if (preview) camera.position.set(11.8, 6.1, 12.4);
          else camera.position.set(11.8, 5.6, 11.4);
          controls.target.set(2.4, 1.65, 0);
          break;
        default:
          return;
      }
      event.preventDefault();
      controls.update();
      invalidate();
    };
    canvas.addEventListener("pointerdown", focus);
    canvas.addEventListener("keydown", onKey);
    return () => {
      canvas.removeEventListener("pointerdown", focus);
      canvas.removeEventListener("keydown", onKey);
    };
  }, [camera, controls, gl, invalidate, preview]);
  return null;
}
