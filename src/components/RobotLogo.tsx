import React, { useState } from "react";

interface RobotLogoProps {
  className?: string;
  size?: number;
}

export default function RobotLogo({ className = "", size = 40 }: RobotLogoProps) {
  const [imgFailed, setImgFailed] = useState(false);

  if (!imgFailed) {
    return (
      <img
        src="/api/logo.png"
        alt="PancrePal Logo"
        width={size}
        height={size}
        referrerPolicy="no-referrer"
        onError={() => setImgFailed(true)}
        className={`object-contain rounded-xl ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }

  // Beautiful high-fidelity vector SVG representation of the PancrePal robot logo fallback!
  // Teal/Sage Green body, white face mask, black smiling curved eyes, orange heart on chest, orange antenna ball.
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background Circle - subtle tint */}
      <circle cx="50" cy="50" r="48" fill="#f1f7f6" stroke="#b9ded7" strokeWidth="2" />

      {/* Antenna */}
      <rect x="47" y="10" width="6" height="15" fill="#419488" rx="2" />
      <circle cx="50" cy="9" r="6" fill="#f05e23" />

      {/* Ears / Side Bolt speakers */}
      <rect x="18" y="42" width="8" height="16" rx="4" fill="#419488" />
      <rect x="74" y="42" width="8" height="16" rx="4" fill="#419488" />

      {/* Main Head */}
      <rect x="23" y="24" width="54" height="46" rx="22" fill="#419488" />
      
      {/* White Face Mask */}
      <rect x="28" y="29" width="44" height="34" rx="17" fill="#ffffff" />

      {/* Left Eye (Smiling Curve) */}
      <path d="M37 44C37 41.5 39.5 40 42 41.5" stroke="#1d3e3a" strokeWidth="3" strokeLinecap="round" />
      
      {/* Right Eye (Smiling Curve) */}
      <path d="M58 44C58 41.5 60.5 40 63 41.5" stroke="#1d3e3a" strokeWidth="3" strokeLinecap="round" />

      {/* Happy Mouth */}
      <path d="M46 51Q50 54 54 51" stroke="#1d3e3a" strokeWidth="2.5" strokeLinecap="round" />

      {/* Body */}
      <rect x="36" y="66" width="28" height="26" rx="10" fill="#419488" />

      {/* Orange/Coral Heart on Chest */}
      <path
        d="M50 78.5C50 78.5 44 74.5 44 71.5C44 69.5 45.5 68 47.5 68C48.8 68 49.6 68.8 50 69.5C50.4 68.8 51.2 68 52.5 68C54.5 68 56 69.5 56 71.5C56 74.5 50 78.5 50 78.5Z"
        fill="#f05e23"
      />

      {/* Left Waving Arm */}
      <path d="M24 74Q15 70 12 58" stroke="#419488" strokeWidth="6" strokeLinecap="round" />
      <circle cx="12" cy="58" r="4" fill="#419488" />

      {/* Right Arm */}
      <path d="M76 74Q80 80 84 84" stroke="#419488" strokeWidth="6" strokeLinecap="round" />
      <circle cx="84" cy="84" r="4" fill="#419488" />
    </svg>
  );
}
