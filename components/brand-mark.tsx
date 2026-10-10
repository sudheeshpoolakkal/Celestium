import { MARK_STEM, MARK_SWEEP, MARK_VIEWBOX } from "@/lib/brand";

export function BrandMark({
  className = "brand-mark",
  color = "currentColor",
  width,
  height,
}: {
  className?: string;
  color?: string;
  width?: number;
  height?: number;
}) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox={MARK_VIEWBOX}
      fill="none"
      aria-hidden="true"
    >
      <g stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d={MARK_SWEEP} />
        <path d={MARK_STEM} />
      </g>
    </svg>
  );
}
