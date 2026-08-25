import React from 'react';
import { DimensionScore, RIASECDimension } from '../../types';

interface HexagonSVGProps {
  scores: Record<RIASECDimension, DimensionScore>;
  size?: number;
  interactive?: boolean;
  onDimensionClick?: (dim: RIASECDimension) => void;
  selectedDimension?: RIASECDimension | null;
}

const DIMENSIONS_ORDER: RIASECDimension[] = [
  'Realistic',
  'Investigative',
  'Artistic',
  'Social',
  'Enterprising',
  'Conventional'
];

export const HexagonSVG: React.FC<HexagonSVGProps> = ({
  scores,
  size = 380,
  interactive = true,
  onDimensionClick,
  selectedDimension,
}) => {
  const center = size / 2;
  const radius = (size / 2) - 48; // padding for labels

  // Compute angle for 6 vertices (start at top -90 deg)
  const getCoordinates = (index: number, valueRatio: number) => {
    const angle = (Math.PI / 3) * index - Math.PI / 2;
    const r = radius * Math.max(0.1, Math.min(1.0, valueRatio));
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  // Background grid polygons at 25%, 50%, 75%, 100%
  const gridLevels = [0.25, 0.5, 0.75, 1.0];
  const gridPolygons = gridLevels.map((lvl) => {
    return DIMENSIONS_ORDER.map((_, i) => {
      const coord = getCoordinates(i, lvl);
      return `${coord.x},${coord.y}`;
    }).join(' ');
  });

  // Interest Polygon
  const interestPoints = DIMENSIONS_ORDER.map((dim, i) => {
    const score = (scores[dim]?.interestScore || 50) / 100;
    const coord = getCoordinates(i, score);
    return `${coord.x},${coord.y}`;
  }).join(' ');

  // Confidence Polygon
  const confidencePoints = DIMENSIONS_ORDER.map((dim, i) => {
    const score = (scores[dim]?.confidenceScore || 50) / 100;
    const coord = getCoordinates(i, score);
    return `${coord.x},${coord.y}`;
  }).join(' ');

  return (
    <div className="flex flex-col items-center select-none">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="overflow-visible"
      >
        <defs>
          <radialGradient id="hexRadial" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.08)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <filter id="amberGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer subtle glow */}
        <circle cx={center} cy={center} r={radius} fill="url(#hexRadial)" />

        {/* Concentric grid lines */}
        {gridPolygons.map((poly, idx) => (
          <polygon
            key={idx}
            points={poly}
            fill="transparent"
            stroke="rgba(148, 163, 184, 0.15)"
            strokeWidth={idx === 3 ? 1.5 : 1}
            strokeDasharray={idx === 3 ? undefined : '3,3'}
          />
        ))}

        {/* Radial axes */}
        {DIMENSIONS_ORDER.map((_, i) => {
          const coord = getCoordinates(i, 1.0);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={coord.x}
              y2={coord.y}
              stroke="rgba(148, 163, 184, 0.18)"
              strokeWidth="1"
            />
          );
        })}

        {/* Interest Polygon (Filled Blue) */}
        <polygon
          points={interestPoints}
          fill="rgba(59, 130, 246, 0.22)"
          stroke="#3b82f6"
          strokeWidth="2.5"
          className="transition-all duration-700 ease-out"
        />

        {/* Confidence Polygon (Dashed Green) */}
        <polygon
          points={confidencePoints}
          fill="rgba(34, 197, 94, 0.12)"
          stroke="#22c55e"
          strokeWidth="2"
          strokeDasharray="5,4"
          className="transition-all duration-700 ease-out"
        />

        {/* Interest & Confidence Vertex dots and Latent Gap Amber markers */}
        {DIMENSIONS_ORDER.map((dim, i) => {
          const intScore = scores[dim]?.interestScore || 50;
          const confScore = scores[dim]?.confidenceScore || 50;
          const gap = scores[dim]?.gap || 0;
          const isLatent = gap > 20;

          const intCoord = getCoordinates(i, intScore / 100);
          const confCoord = getCoordinates(i, confScore / 100);
          const labelCoord = getCoordinates(i, 1.22);

          const isSelected = selectedDimension === dim;

          return (
            <g
              key={dim}
              className={interactive ? 'cursor-pointer group' : ''}
              onClick={() => onDimensionClick && onDimensionClick(dim)}
            >
              {/* Interest node */}
              <circle
                cx={intCoord.x}
                cy={intCoord.y}
                r="4.5"
                fill="#3b82f6"
                stroke="#1e293b"
                strokeWidth="1.5"
                className="transition-transform group-hover:scale-125"
              />

              {/* Confidence node */}
              <circle
                cx={confCoord.x}
                cy={confCoord.y}
                r="3.5"
                fill="#22c55e"
                stroke="#1e293b"
                strokeWidth="1.5"
              />

              {/* Latent gap highlight (Amber marker) */}
              {isLatent && (
                <g filter="url(#amberGlow)">
                  <circle
                    cx={intCoord.x}
                    cy={intCoord.y}
                    r="8"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="2"
                    className="animate-pulse"
                  />
                  <line
                    x1={intCoord.x}
                    y1={intCoord.y}
                    x2={confCoord.x}
                    y2={confCoord.y}
                    stroke="#f59e0b"
                    strokeWidth="2"
                    strokeDasharray="2,2"
                  />
                </g>
              )}

              {/* Dimension label */}
              <text
                x={labelCoord.x}
                y={labelCoord.y + (labelCoord.y > center ? 4 : -2)}
                textAnchor="middle"
                dominantBaseline="central"
                className={`text-[11px] font-medium tracking-tight transition-colors ${
                  isSelected
                    ? 'fill-blue-400 font-semibold'
                    : isLatent
                    ? 'fill-amber-400'
                    : 'fill-zinc-300 group-hover:fill-white'
                }`}
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {dim}
              </text>

              {/* Score breakdown label */}
              <text
                x={labelCoord.x}
                y={labelCoord.y + (labelCoord.y > center ? 16 : 10)}
                textAnchor="middle"
                dominantBaseline="central"
                className="text-[9px] fill-zinc-400 font-mono tracking-tighter"
              >
                {intScore}% / {confScore}%
              </text>
            </g>
          );
        })}
      </svg>

      {/* Legend & Canonical Caption */}
      <div className="mt-4 flex items-center gap-5 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-blue-500 inline-block shadow-sm" />
          <span className="text-zinc-300">Interest ({scores.Investigative ? 'Pull' : ''})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full border border-dashed border-green-500 bg-green-500/20 inline-block" />
          <span className="text-zinc-300">Confidence (Self-belief)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block ring-2 ring-amber-500/30" />
          <span className="text-amber-400">Latent Gap (&gt;+20)</span>
        </div>
      </div>

      <p className="mt-4 max-w-md text-center text-xs text-zinc-400 font-normal leading-relaxed italic border-t border-zinc-800/80 pt-3">
        “Blue is what pulls you. Green is what you believe you can do. The space between them is where careers get quietly abandoned.”
      </p>
    </div>
  );
};
