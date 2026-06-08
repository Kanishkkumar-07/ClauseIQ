export default function LoadingSpinner() {
  return (
    <div className="flex items-center gap-3 px-1 py-1 animate-[fade-up_0.3s_ease_forwards]">
      <div className="flex gap-1.5 items-center">
        <div className="h-1.5 w-1.5 rounded-full bg-[oklch(0.68_0.22_264)] animate-bounce [animation-delay:0s] shadow-[0_0_6px_oklch(0.68_0.22_264/0.8)]" />
        <div className="h-1.5 w-1.5 rounded-full bg-[oklch(0.68_0.22_264/0.7)] animate-bounce [animation-delay:0.18s] shadow-[0_0_6px_oklch(0.68_0.22_264/0.5)]" />
        <div className="h-1.5 w-1.5 rounded-full bg-[oklch(0.68_0.22_264/0.4)] animate-bounce [animation-delay:0.36s]" />
      </div>
      <span className="text-[11px] text-[oklch(0.45_0.02_264)] font-light tracking-wide">
        Analyzing
      </span>
    </div>
  )
}