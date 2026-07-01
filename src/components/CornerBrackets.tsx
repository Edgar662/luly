export default function CornerBrackets({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-2 z-10 ${className}`}>
      <span className="absolute left-0 top-0 h-3 w-3 border-l border-t border-kp-green/40" />
      <span className="absolute right-0 top-0 h-3 w-3 border-r border-t border-kp-green/40" />
      <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-kp-green/40" />
      <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-kp-green/40" />
    </div>
  );
}
