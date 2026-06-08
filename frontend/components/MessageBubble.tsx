interface MessageBubbleProps {
  message: {
    role: 'user' | 'ClauseIQ Agent'
    content: string
  }
}

function UserAvatar() {
  return (
    <div className="flex-shrink-0 mt-0.5 w-8 h-8 rounded-full bg-[oklch(0.19_0.014_264)] border border-[oklch(0.26_0.018_264)] flex items-center justify-center overflow-hidden">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="7.5" r="3.5" fill="oklch(0.50 0.025 264)" />
        <path
          d="M3 17c0-3.866 3.134-7 7-7s7 3.134 7 7"
          stroke="oklch(0.50 0.025 264)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}

function AgentAvatar() {
  return (
    <div className="flex-shrink-0 mt-0.5">
      <div className="relative w-8 h-8">
        <div className="absolute inset-0 bg-[oklch(0.68_0.22_264/0.25)] rounded-full blur-[5px]" />
        <div className="relative w-8 h-8 bg-gradient-to-br from-[oklch(0.75_0.22_264)] to-[oklch(0.52_0.26_264)] rounded-full flex items-center justify-center">
          <span className="text-white font-semibold text-[10px] tracking-tight">CQ</span>
        </div>
      </div>
    </div>
  )
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex gap-3 animate-[fade-up_0.25s_ease_forwards] ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && <AgentAvatar />}

      <div className={`max-w-[72%] flex flex-col gap-1.5 ${isUser ? 'items-end' : 'items-start'}`}>
        {/* Role label — smooth, light, no mono */}
        <span className={`text-[11px] font-medium px-0.5 ${
          isUser
            ? 'text-[oklch(0.42_0.018_264)]'
            : 'text-[oklch(0.48_0.06_264)]'
        }`}>
          {isUser ? 'You' : 'ClauseIQ'}
        </span>

        {/* Bubble */}
        <div
          className={`relative px-4 py-3 ${
            isUser
              ? 'rounded-2xl rounded-tr-md bg-gradient-to-br from-[oklch(0.70_0.22_264)] to-[oklch(0.56_0.26_264)] text-white shadow-[0_4px_24px_oklch(0.68_0.22_264/0.22)]'
              : 'rounded-2xl rounded-tl-md bg-[oklch(0.145_0.011_264)] border border-[oklch(0.21_0.014_264)] text-[oklch(0.86_0.005_264)]'
          }`}
        >
          <p className="text-[13.5px] leading-[1.75] whitespace-pre-wrap break-words font-normal tracking-[0.01em]">
            {message.content}
          </p>
        </div>
      </div>

      {isUser && <UserAvatar />}
    </div>
  )
}