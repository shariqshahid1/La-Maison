interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ className = '', size = 'md' }: LogoProps) {
  const sizes = {
    sm: { icon: 24, text: 'text-xl' },
    md: { icon: 32, text: 'text-2xl' },
    lg: { icon: 40, text: 'text-3xl' },
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        width={sizes[size].icon}
        height={sizes[size].icon}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* House roof */}
        <path
          d="M20 4L4 18H12V34H28V18H36L20 4Z"
          stroke="#10b981"
          strokeWidth="2"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Door */}
        <rect x="16" y="22" width="8" height="12" rx="1" fill="#10b981" opacity="0.3" />
        {/* Window */}
        <rect x="17" y="24" width="3" height="3" rx="0.5" fill="#10b981" opacity="0.6" />
        <rect x="21" y="24" width="3" height="3" rx="0.5" fill="#10b981" opacity="0.6" />
        {/* Chimney smoke - leaf accent */}
        <path
          d="M28 8C28 8 30 5 32 6C34 7 31 10 29 10"
          stroke="#10b981"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      <div className="flex items-baseline">
        <span className={`${sizes[size].text} font-light tracking-wide text-slate-300`}>
          La
        </span>
        <span className={`${sizes[size].text} font-semibold tracking-wide text-emerald-500 ml-1`}>
          Maison
        </span>
      </div>
    </div>
  );
}
