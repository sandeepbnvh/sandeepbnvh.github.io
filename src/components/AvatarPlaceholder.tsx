import { useState } from 'react';
import { Camera } from 'lucide-react';

export default function AvatarPlaceholder() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="avatar-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        width: '180px',
        height: '180px',
        borderRadius: '50%',
        cursor: 'default',
        padding: '6px',
        background: 'linear-gradient(135deg, var(--glass-border) 0%, var(--border-color) 100%)',
        boxShadow: isHovered ? 'var(--shadow-hover), var(--shadow-glow)' : 'var(--shadow)',
        transition: 'all var(--transition-normal)',
        display: 'inline-block',
      }}
    >
      {/* Rotating border effect on hover */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          padding: '2px',
          background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-secondary) 100%)',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          pointerEvents: 'none',
        }}
      />

      {/* Main Avatar Circle */}
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, rgba(var(--accent-rgb), 0.1) 0%, rgba(var(--accent-rgb), 0.03) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          border: '1px solid var(--glass-border)',
        }}
      >
        {/* Abstract graphic background pattern inside the circle */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.15,
            color: 'var(--accent)',
            pointerEvents: 'none',
          }}
        >
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          <circle cx="20" cy="30" r="4" fill="currentColor" />
          <path d="M 75 25 L 85 35 M 85 25 L 75 35" stroke="currentColor" strokeWidth="1.5" />
        </svg>

        {/* The Silhouette SVG */}
        <svg
          viewBox="0 0 100 100"
          style={{
            width: '80%',
            height: '80%',
            color: 'var(--text-secondary)',
            opacity: isHovered ? 0.3 : 0.85,
            transition: 'all var(--transition-normal)',
          }}
        >
          <circle cx="50" cy="35" r="16" fill="currentColor" />
          <path
            d="M 32 35 C 32 20, 68 20, 68 35 C 68 22, 32 22, 32 35 Z"
            fill="var(--accent)"
            style={{ opacity: 0.8 }}
          />
          <path
            d="M 22 80 C 22 60, 32 52, 50 52 C 68 52, 78 60, 78 80 C 78 82, 22 82, 22 80 Z"
            fill="currentColor"
          />
          <path d="M 47 52 L 53 52 L 55 65 L 50 70 L 45 65 Z" fill="var(--accent)" />
        </svg>

        {/* Hover message Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(var(--accent-rgb), 0.05)',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity var(--transition-normal)',
            padding: '16px',
            textAlign: 'center',
            pointerEvents: 'none',
          }}
        >
          <Camera
            size={24}
            style={{
              color: 'var(--accent)',
              marginBottom: '6px',
              transform: isHovered ? 'scale(1.1) translateY(0)' : 'scale(0.9) translateY(5px)',
              transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
          <span
            style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              lineHeight: '1.2',
            }}
          >
            Upload Photo
            <br />
            Later
          </span>
        </div>
      </div>
    </div>
  );
}
