export function CelestiumMark({ className = "celestium-mark" }: { className?: string }) {
  return (
    <svg className={className} width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <path d="M28.8 9.8a13.5 13.5 0 1 0 0 16.4" stroke="currentColor" strokeWidth="2" />
      <path d="m10.5 23 18-13-9 19-1.5-9-7.5 3Z" fill="currentColor" />
      <path d="M4 31 32 4" stroke="currentColor" strokeWidth=".7" opacity=".5" />
    </svg>
  );
}
