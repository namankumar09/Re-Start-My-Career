import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: number | string;
  color?: string;
  style?: React.CSSProperties;
}

/**
 * Official Re\Start My Career Brand Logo
 * Pixel-accurate vector replica of the official geometric mark.
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = 'w-6 h-6',
  color = 'currentColor',
  style,
}) => {
  return (
    <svg
      viewBox="0 0 1000 500"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none ${className}`}
      aria-label="Re\Start My Career"
      role="img"
      style={style}
    >
      <g fill={color}>
        {/* Component 1: Leftmost Wave/Arch */}
        <path
          d="M 40 450
             C 120 450, 190 410, 260 300
             C 300 238, 345 200, 405 200
             C 435 200, 460 215, 485 240
             L 655 410
             L 695 450
             L 575 450
             L 395 270
             C 385 260, 375 255, 360 255
             C 330 255, 298 295, 240 385
             C 205 440, 135 450, 40 450
             Z"
          style={{ display: 'none' }}
        />

        {/* 
          EXACT GEOMETRIC CONTOUR FOR THE 3 COMPONENTS:
        */}

        {/* 1. Left Ramp / Arch with bottom-left horizontal taper and sharp inner notch */}
        <path
          d="M 45 450
             C 140 450, 215 415, 285 305
             C 320 250, 360 215, 415 215
             C 442 215, 465 228, 488 250
             L 688 450
             L 570 450
             L 395 275
             C 382 262, 370 258, 355 258
             C 322 258, 292 298, 238 388
             C 205 440, 135 450, 45 450
             Z"
        />

        {/* 2. Middle Diagonal Slash Bar */}
        <path
          d="M 455 450
             L 645 260
             L 730 345
             L 540 450
             Z"
        />

        {/* 3. Right 'C' and Dynamic Upward Growth Arrow */}
        <path
          d="M 910 35
             L 865 185
             L 805 125
             L 745 185
             C 700 230, 672 290, 680 355
             C 692 430, 760 480, 840 470
             C 890 462, 930 430, 950 380
             L 865 350
             C 855 372, 835 388, 810 388
             C 775 388, 748 360, 752 320
             C 756 290, 775 265, 800 240
             L 865 180
             L 805 120
             Z"
        />
      </g>
    </svg>
  );
};
