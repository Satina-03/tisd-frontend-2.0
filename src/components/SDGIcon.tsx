import Image from 'next/image';

interface SDGIconProps {
  sdgNumber: number;
  size?: number;
  className?: string;
  showLabel?: boolean;
}

export default function SDGIcon({ sdgNumber, size = 24, className = '', showLabel = true }: SDGIconProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      {showLabel && (
        <span className="text-xs font-medium text-gray-600">SDG {sdgNumber}</span>
      )}
      <div className={`relative ${className}`} style={{ width: size, height: size }}>
        <Image
          src={`/sdg-icons/sdg${sdgNumber}.png`}
          alt={`SDG ${sdgNumber}`}
          width={size}
          height={size}
          className="rounded-sm"
        />
      </div>
    </div>
  );
} 