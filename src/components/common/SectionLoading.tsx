import React from 'react';

export interface SectionLoadingProps {
  /** Minimum or explicit height class (e.g. 'min-h-[600px]', 'h-[500px]') */
  minHeight?: string;
  /** Layout skeleton archetype to closely match lazy-loaded section */
  variant?: 'grid' | 'map' | 'split' | 'accordion' | 'cards' | 'default';
  /** Optional descriptive label rendered in subtle typography */
  label?: string;
  /** Additional CSS class names */
  className?: string;
}

export const SectionLoading: React.FC<SectionLoadingProps> = ({
  minHeight = 'min-h-[450px]',
  variant = 'default',
  label = 'Loading section...',
  className = '',
}) => {
  return (
    <div
      className={`w-full ${minHeight} bg-[#FFFFFF] border-t border-b border-[#ECEDEF] px-4 sm:px-8 lg:px-12 py-10 sm:py-16 flex flex-col justify-center items-center relative overflow-hidden select-none ${className}`}
      aria-busy="true"
      aria-label={label}
    >
      {/* Background Micro Dot Texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#121417 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      <div className="w-full max-w-7xl mx-auto flex flex-col gap-8 relative z-10">
        {/* Section Header Skeleton (Title + Subtitle + Badge) */}
        <div className="flex flex-col items-center text-center gap-3 w-full max-w-2xl mx-auto">
          {/* Badge Skeleton */}
          <div className="relative w-32 h-6 rounded-full bg-[#ECEDEF] overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/70 to-transparent transform-gpu" />
          </div>

          {/* Heading Skeleton */}
          <div className="relative w-3/4 sm:w-2/3 h-8 sm:h-10 rounded-lg bg-[#ECEDEF] overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/70 to-transparent transform-gpu" />
          </div>

          {/* Subheading Skeleton */}
          <div className="relative w-5/6 sm:w-1/2 h-4 rounded bg-[#ECEDEF]/70 overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/70 to-transparent transform-gpu" />
          </div>
        </div>

        {/* Dynamic Skeleton Archetype Body */}
        {variant === 'map' && (
          <div className="w-full h-[380px] sm:h-[480px] rounded-2xl bg-[#ECEDEF]/80 border border-[#ECEDEF] relative overflow-hidden flex flex-col justify-between p-6">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent transform-gpu" />
            <div className="flex justify-between items-center z-10">
              <div className="w-36 h-9 rounded-xl bg-white/80" />
              <div className="w-28 h-9 rounded-xl bg-white/80" />
            </div>
            <div className="w-full max-w-sm h-16 rounded-xl bg-white/80 z-10 self-center" />
          </div>
        )}

        {(variant === 'grid' || variant === 'cards') && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full pt-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-[320px] rounded-xl bg-[#ECEDEF]/70 border border-[#ECEDEF] relative overflow-hidden flex flex-col justify-between p-6"
              >
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent transform-gpu" />
                <div className="w-12 h-12 rounded-lg bg-white/80 z-10" />
                <div className="space-y-3 z-10">
                  <div className="w-3/4 h-5 rounded bg-white/90" />
                  <div className="w-full h-3.5 rounded bg-white/60" />
                  <div className="w-5/6 h-3.5 rounded bg-white/60" />
                  <div className="w-1/3 h-4 rounded bg-white/80 pt-2" />
                </div>
              </div>
            ))}
          </div>
        )}

        {variant === 'split' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full items-center pt-2">
            <div className="h-[320px] rounded-2xl bg-[#ECEDEF]/70 relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent transform-gpu" />
            </div>
            <div className="space-y-4">
              <div className="relative w-2/3 h-7 rounded bg-[#ECEDEF] overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent transform-gpu" />
              </div>
              <div className="relative w-full h-4 rounded bg-[#ECEDEF]/70 overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent transform-gpu" />
              </div>
              <div className="relative w-5/6 h-4 rounded bg-[#ECEDEF]/70 overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent transform-gpu" />
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="h-20 rounded-xl bg-[#ECEDEF]/60 relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent transform-gpu" />
                </div>
                <div className="h-20 rounded-xl bg-[#ECEDEF]/60 relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent transform-gpu" />
                </div>
              </div>
            </div>
          </div>
        )}

        {variant === 'accordion' && (
          <div className="w-full max-w-3xl mx-auto flex flex-col gap-3 pt-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-16 rounded-xl bg-[#ECEDEF]/70 border border-[#ECEDEF] relative overflow-hidden flex items-center justify-between px-6"
              >
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent transform-gpu" />
                <div className="w-1/2 h-4 rounded bg-white/90 z-10" />
                <div className="w-6 h-6 rounded-full bg-white/90 z-10" />
              </div>
            ))}
          </div>
        )}

        {variant === 'default' && (
          <div className="w-full h-48 rounded-2xl bg-[#ECEDEF]/60 border border-[#ECEDEF] relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent transform-gpu" />
            <span className="font-['Delight'] text-xs uppercase tracking-widest text-[#121417]/40 z-10">
              {label}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
