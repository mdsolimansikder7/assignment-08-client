export default function LogoMark({ size = 32, className }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      aria-hidden="true"
      className={className}
    >
      <path d="M24 41 C10 31 6 22 6 16 C6 10.5 10.5 7 15.5 7 C19.5 7 22.5 9.2 24 12 C25.5 9.2 28.5 7 32.5 7 C37.5 7 42 10.5 42 16 C42 22 38 31 24 41 Z" fill="var(--accent)" />
      <circle cx="24" cy="18" r="3.6" fill="#FFFFFF" />
      <path d="M16.5 29.5 C16.5 24.8 19.8 23 24 23 C28.2 23 31.5 24.8 31.5 29.5 Z" fill="#FFFFFF" />
    </svg>
  );
}
