// 8-bit pixel art icons for Finnish Learning Arena

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

// Target/Bullseye icon for Verb Arena
export function TargetIcon({ size = 16, color = 'currentColor', className = '' }: IconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 16 16" 
      fill="none" 
      className={className}
      style={{ imageRendering: 'pixelated' }}
    >
      {/* Outer ring */}
      <rect x="5" y="0" width="6" height="2" fill={color} />
      <rect x="5" y="14" width="6" height="2" fill={color} />
      <rect x="0" y="5" width="2" height="6" fill={color} />
      <rect x="14" y="5" width="2" height="6" fill={color} />
      <rect x="2" y="2" width="2" height="3" fill={color} />
      <rect x="2" y="11" width="2" height="3" fill={color} />
      <rect x="12" y="2" width="2" height="3" fill={color} />
      <rect x="12" y="11" width="2" height="3" fill={color} />
      {/* Middle ring */}
      <rect x="6" y="4" width="4" height="2" fill={color} />
      <rect x="6" y="10" width="4" height="2" fill={color} />
      <rect x="4" y="6" width="2" height="4" fill={color} />
      <rect x="10" y="6" width="2" height="4" fill={color} />
      {/* Center dot */}
      <rect x="7" y="7" width="2" height="2" fill={color} />
    </svg>
  );
}

// Book stack icon for Kurssin Arvostelu
export function BookIcon({ size = 16, color = 'currentColor', className = '' }: IconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 16 16" 
      fill="none" 
      className={className}
      style={{ imageRendering: 'pixelated' }}
    >
      {/* Bottom book */}
      <rect x="1" y="12" width="14" height="3" fill={color} />
      <rect x="2" y="11" width="12" height="1" fill={color} opacity="0.6" />
      {/* Middle book */}
      <rect x="2" y="7" width="12" height="3" fill={color} />
      <rect x="3" y="6" width="10" height="1" fill={color} opacity="0.6" />
      {/* Top book */}
      <rect x="1" y="2" width="14" height="3" fill={color} />
      <rect x="2" y="1" width="12" height="1" fill={color} opacity="0.6" />
      {/* Book spines detail */}
      <rect x="3" y="12" width="1" height="3" fill={color} opacity="0.3" />
      <rect x="4" y="7" width="1" height="3" fill={color} opacity="0.3" />
      <rect x="3" y="2" width="1" height="3" fill={color} opacity="0.3" />
    </svg>
  );
}

// Open book icon for Recall mode
export function OpenBookIcon({ size = 16, color = 'currentColor', className = '' }: IconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 16 16" 
      fill="none" 
      className={className}
      style={{ imageRendering: 'pixelated' }}
    >
      {/* Left page */}
      <rect x="1" y="2" width="6" height="12" fill={color} />
      <rect x="0" y="3" width="1" height="10" fill={color} />
      {/* Right page */}
      <rect x="9" y="2" width="6" height="12" fill={color} />
      <rect x="15" y="3" width="1" height="10" fill={color} />
      {/* Spine */}
      <rect x="7" y="1" width="2" height="14" fill={color} />
      {/* Text lines on left */}
      <rect x="2" y="4" width="4" height="1" fill="currentColor" opacity="0.3" />
      <rect x="2" y="6" width="4" height="1" fill="currentColor" opacity="0.3" />
      <rect x="2" y="8" width="3" height="1" fill="currentColor" opacity="0.3" />
      <rect x="2" y="10" width="4" height="1" fill="currentColor" opacity="0.3" />
      {/* Text lines on right */}
      <rect x="10" y="4" width="4" height="1" fill="currentColor" opacity="0.3" />
      <rect x="10" y="6" width="4" height="1" fill="currentColor" opacity="0.3" />
      <rect x="10" y="8" width="3" height="1" fill="currentColor" opacity="0.3" />
      <rect x="10" y="10" width="4" height="1" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

// Pencil/pen icon for Active Recall
export function PencilIcon({ size = 16, color = 'currentColor', className = '' }: IconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 16 16" 
      fill="none" 
      className={className}
      style={{ imageRendering: 'pixelated' }}
    >
      {/* Pencil body diagonal */}
      <rect x="3" y="10" width="2" height="2" fill={color} />
      <rect x="5" y="8" width="2" height="2" fill={color} />
      <rect x="7" y="6" width="2" height="2" fill={color} />
      <rect x="9" y="4" width="2" height="2" fill={color} />
      <rect x="11" y="2" width="2" height="2" fill={color} />
      {/* Tip */}
      <rect x="1" y="12" width="2" height="2" fill={color} />
      <rect x="0" y="14" width="2" height="2" fill={color} />
      {/* Eraser */}
      <rect x="13" y="0" width="3" height="4" fill={color} opacity="0.6" />
      {/* Pencil edge detail */}
      <rect x="4" y="9" width="1" height="1" fill={color} opacity="0.5" />
      <rect x="6" y="7" width="1" height="1" fill={color} opacity="0.5" />
      <rect x="8" y="5" width="1" height="1" fill={color} opacity="0.5" />
      <rect x="10" y="3" width="1" height="1" fill={color} opacity="0.5" />
      <rect x="12" y="1" width="1" height="1" fill={color} opacity="0.5" />
    </svg>
  );
}

// Checkmark icon
export function CheckIcon({ size = 16, color = 'currentColor', className = '' }: IconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 16 16" 
      fill="none" 
      className={className}
      style={{ imageRendering: 'pixelated' }}
    >
      <rect x="2" y="8" width="2" height="2" fill={color} />
      <rect x="4" y="10" width="2" height="2" fill={color} />
      <rect x="6" y="8" width="2" height="2" fill={color} />
      <rect x="8" y="6" width="2" height="2" fill={color} />
      <rect x="10" y="4" width="2" height="2" fill={color} />
      <rect x="12" y="2" width="2" height="2" fill={color} />
    </svg>
  );
}

// Star icon for new records
export function StarIcon({ size = 16, color = 'currentColor', className = '' }: IconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 16 16" 
      fill="none" 
      className={className}
      style={{ imageRendering: 'pixelated' }}
    >
      <rect x="7" y="0" width="2" height="4" fill={color} />
      <rect x="7" y="12" width="2" height="4" fill={color} />
      <rect x="0" y="6" width="4" height="2" fill={color} />
      <rect x="12" y="6" width="4" height="2" fill={color} />
      <rect x="5" y="4" width="6" height="6" fill={color} />
      <rect x="3" y="5" width="2" height="4" fill={color} />
      <rect x="11" y="5" width="2" height="4" fill={color} />
      <rect x="2" y="10" width="2" height="2" fill={color} />
      <rect x="12" y="10" width="2" height="2" fill={color} />
      <rect x="1" y="11" width="2" height="2" fill={color} />
      <rect x="13" y="11" width="2" height="2" fill={color} />
    </svg>
  );
}

// X/Close icon
export function CloseIcon({ size = 16, color = 'currentColor', className = '' }: IconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 16 16" 
      fill="none" 
      className={className}
      style={{ imageRendering: 'pixelated' }}
    >
      <rect x="1" y="2" width="2" height="2" fill={color} />
      <rect x="3" y="4" width="2" height="2" fill={color} />
      <rect x="5" y="6" width="2" height="2" fill={color} />
      <rect x="7" y="8" width="2" height="2" fill={color} />
      <rect x="9" y="6" width="2" height="2" fill={color} />
      <rect x="11" y="4" width="2" height="2" fill={color} />
      <rect x="13" y="2" width="2" height="2" fill={color} />
      <rect x="9" y="10" width="2" height="2" fill={color} />
      <rect x="11" y="12" width="2" height="2" fill={color} />
      <rect x="13" y="14" width="2" height="2" fill={color} />
      <rect x="5" y="10" width="2" height="2" fill={color} />
      <rect x="3" y="12" width="2" height="2" fill={color} />
      <rect x="1" y="14" width="2" height="2" fill={color} />
    </svg>
  );
}

// Trophy/celebration icon
export function TrophyIcon({ size = 16, color = 'currentColor', className = '' }: IconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 16 16" 
      fill="none" 
      className={className}
      style={{ imageRendering: 'pixelated' }}
    >
      {/* Cup body */}
      <rect x="4" y="1" width="8" height="2" fill={color} />
      <rect x="4" y="3" width="8" height="4" fill={color} />
      <rect x="5" y="7" width="6" height="2" fill={color} />
      <rect x="6" y="9" width="4" height="1" fill={color} />
      {/* Handles */}
      <rect x="2" y="2" width="2" height="1" fill={color} />
      <rect x="1" y="3" width="2" height="3" fill={color} />
      <rect x="2" y="6" width="2" height="1" fill={color} />
      <rect x="12" y="2" width="2" height="1" fill={color} />
      <rect x="13" y="3" width="2" height="3" fill={color} />
      <rect x="12" y="6" width="2" height="1" fill={color} />
      {/* Stem */}
      <rect x="7" y="10" width="2" height="2" fill={color} />
      {/* Base */}
      <rect x="5" y="12" width="6" height="2" fill={color} />
      <rect x="4" y="14" width="8" height="2" fill={color} />
    </svg>
  );
}

// Map pin icon for Cases/Location
export function MapPinIcon({ size = 16, color = 'currentColor', className = '' }: IconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 16 16" 
      fill="none" 
      className={className}
      style={{ imageRendering: 'pixelated' }}
    >
      {/* Pin body */}
      <rect x="5" y="0" width="6" height="2" fill={color} />
      <rect x="4" y="2" width="8" height="2" fill={color} />
      <rect x="3" y="4" width="10" height="4" fill={color} />
      <rect x="4" y="8" width="8" height="2" fill={color} />
      <rect x="5" y="10" width="6" height="2" fill={color} />
      {/* Point */}
      <rect x="6" y="12" width="4" height="2" fill={color} />
      <rect x="7" y="14" width="2" height="2" fill={color} />
      {/* Center hole */}
      <rect x="6" y="5" width="4" height="2" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

// Eye icon for revealing content
export function EyeIcon({ size = 16, color = 'currentColor', className = '' }: IconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 16 16" 
      fill="none" 
      className={className}
      style={{ imageRendering: 'pixelated' }}
    >
      {/* Eye outline */}
      <rect x="0" y="6" width="2" height="4" fill={color} />
      <rect x="14" y="6" width="2" height="4" fill={color} />
      <rect x="2" y="4" width="2" height="2" fill={color} />
      <rect x="12" y="4" width="2" height="2" fill={color} />
      <rect x="2" y="10" width="2" height="2" fill={color} />
      <rect x="12" y="10" width="2" height="2" fill={color} />
      <rect x="4" y="2" width="8" height="2" fill={color} />
      <rect x="4" y="12" width="8" height="2" fill={color} />
      {/* Pupil */}
      <rect x="6" y="6" width="4" height="4" fill={color} />
    </svg>
  );
}

// Globe icon for World/Location
export function GlobeIcon({ size = 16, color = 'currentColor', className = '' }: IconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 16 16" 
      fill="none" 
      className={className}
      style={{ imageRendering: 'pixelated' }}
    >
      {/* Globe outer ring */}
      <rect x="5" y="0" width="6" height="2" fill={color} />
      <rect x="5" y="14" width="6" height="2" fill={color} />
      <rect x="0" y="5" width="2" height="6" fill={color} />
      <rect x="14" y="5" width="2" height="6" fill={color} />
      <rect x="2" y="2" width="3" height="3" fill={color} />
      <rect x="2" y="11" width="3" height="3" fill={color} />
      <rect x="11" y="2" width="3" height="3" fill={color} />
      <rect x="11" y="11" width="3" height="3" fill={color} />
      {/* Horizontal line */}
      <rect x="2" y="7" width="12" height="2" fill={color} opacity="0.6" />
      {/* Vertical line */}
      <rect x="7" y="2" width="2" height="12" fill={color} opacity="0.6" />
      {/* Center */}
      <rect x="5" y="5" width="6" height="6" fill={color} opacity="0.3" />
    </svg>
  );
}

// Newspaper icon for reading articles
export function NewspaperIcon({ size = 16, color = 'currentColor', className = '' }: IconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 16 16" 
      fill="none" 
      className={className}
      style={{ imageRendering: 'pixelated' }}
    >
      {/* Paper outline */}
      <rect x="1" y="2" width="14" height="12" fill="none" stroke={color} strokeWidth="2" />
      {/* Headline */}
      <rect x="3" y="4" width="10" height="2" fill={color} />
      {/* Text lines */}
      <rect x="3" y="8" width="6" height="1" fill={color} opacity="0.6" />
      <rect x="3" y="10" width="8" height="1" fill={color} opacity="0.6" />
      <rect x="3" y="12" width="5" height="1" fill={color} opacity="0.6" />
      {/* Image placeholder */}
      <rect x="10" y="8" width="3" height="3" fill={color} opacity="0.4" />
    </svg>
  );
}
