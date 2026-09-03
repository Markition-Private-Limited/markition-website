export function ChevronDown() {
  return (
    <svg
      width="9"
      height="5"
      viewBox="0 0 9 5"
      fill="none"
      aria-hidden="true"
      className="mt-px flex-shrink-0 opacity-60"
    >
      <path
        d="M1 1l3.5 3.5L8 1"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="flex-shrink-0"
    >
      <line
        x1="3" y1="6" x2="17" y2="6"
        stroke="white" strokeWidth="1.5" strokeLinecap="round"
        style={{
          transformOrigin: "10px 6px",
          transform: open ? "rotate(45deg) translateY(4px)" : "rotate(0deg) translateY(0)",
          transition: "transform 0.25s ease",
        }}
      />
      <line
        x1="3" y1="10" x2="17" y2="10"
        stroke="white" strokeWidth="1.5" strokeLinecap="round"
        style={{
          opacity: open ? 0 : 1,
          transition: "opacity 0.15s ease",
        }}
      />
      <line
        x1="3" y1="14" x2="17" y2="14"
        stroke="white" strokeWidth="1.5" strokeLinecap="round"
        style={{
          transformOrigin: "10px 14px",
          transform: open ? "rotate(-45deg) translateY(-4px)" : "rotate(0deg) translateY(0)",
          transition: "transform 0.25s ease",
        }}
      />
    </svg>
  );
}

export function IconActivity({ className }: { className?: string }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}

export function IconZap({ className }: { className?: string }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

export function IconSend({ className }: { className?: string }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}
