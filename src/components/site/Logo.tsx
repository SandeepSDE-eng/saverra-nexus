export function Logo({ className = "size-10" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 48 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M 30 6 L 6 6 L 6 32 L 42 32 L 42 58 L 18 58" 
        stroke="currentColor" 
        strokeWidth="6" 
        strokeLinejoin="miter" 
        strokeLinecap="square"
      />
      <line x1="18" y1="6" x2="18" y2="58" stroke="currentColor" strokeWidth="6" strokeLinecap="square" />
      <line x1="30" y1="6" x2="30" y2="58" stroke="currentColor" strokeWidth="6" strokeLinecap="square" />
    </svg>
  );
}
