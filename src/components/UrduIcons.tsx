import type { SVGProps } from 'react';

export function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm5.81 14.08c-.25.69-1.42 1.32-1.97 1.4-.52.08-1.18.11-1.91-.12-.44-.14-1.01-.33-1.74-.65-3.05-1.32-5.04-4.38-5.19-4.58-.15-.2-1.24-1.65-1.24-3.15s.78-2.23 1.06-2.54c.28-.3.61-.38.81-.38.2 0 .41 0 .59.01.19.01.44-.07.69.53.25.61.86 2.1.94 2.25.08.15.13.33.03.53-.1.2-.15.33-.3.51-.15.18-.32.4-.45.54-.15.15-.31.31-.13.61.18.3.79 1.31 1.7 2.12 1.17 1.04 2.15 1.36 2.45 1.52.3.15.48.13.66-.08.18-.2.76-.88.96-1.19.2-.3.41-.25.69-.15.28.1 1.77.84 2.08.99.3.15.51.23.58.36.08.13.08.74-.17 1.43z" />
    </svg>
  );
}

export function GeometricOrnament({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`} aria-hidden="true">
      <span className="h-px w-16 bg-[#C9A45C]/60" />
      <svg
        viewBox="0 0 32 32"
        className="h-5 w-5 text-[#B68D40]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      >
        <polygon points="16,2 20,12 30,16 20,20 16,30 12,20 2,16 12,12" />
        <circle cx="16" cy="16" r="3" />
      </svg>
      <span className="h-px w-16 bg-[#C9A45C]/60" />
    </div>
  );
}
