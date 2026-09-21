import React from 'react';

interface SplitTextHoverProps {
  text: string;
  className?: string;
  duplicateClassName?: string;
}

export const SplitTextHover: React.FC<SplitTextHoverProps> = ({
  text,
  className = '',
  duplicateClassName = '',
}) => {
  const characters = text.split('');

  return (
    <span
      className={`split-text-wrapper inline-flex relative overflow-hidden align-baseline ${className}`}
      aria-label={text}
    >
      {/* Primary line of characters (slides up and out on hover) */}
      <span className="split-text-line-1 inline-flex" aria-hidden="true">
        {characters.map((char, index) => (
          <span
            key={index}
            className="split-text-char inline-block transition-transform duration-350 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-[-105%] group-hover/split:translate-y-[-105%]"
            style={{
              transitionDelay: `${Math.min(index * 16, 280)}ms`,
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </span>

      {/* Duplicate line of characters (slides up from bottom on hover) */}
      <span
        className={`split-text-line-2 inline-flex absolute inset-0 pointer-events-none ${duplicateClassName}`}
        aria-hidden="true"
      >
        {characters.map((char, index) => (
          <span
            key={index}
            className="split-text-char inline-block transition-transform duration-350 ease-[cubic-bezier(0.76,0,0.24,1)] translate-y-[105%] group-hover:translate-y-0 group-hover/split:translate-y-0"
            style={{
              transitionDelay: `${Math.min(index * 16, 280)}ms`,
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </span>
    </span>
  );
};
