import React, { useState } from 'react';
import { SkillScore, Language } from '../types';

interface RadarChartProps {
  skills: SkillScore[];
  language: Language;
}

export const RadarChart: React.FC<RadarChartProps> = ({ skills, language }) => {
  const [hoveredSkill, setHoveredSkill] = useState<SkillScore | null>(null);

  // Center coordinate and radius
  const size = 300;
  const center = size / 2;
  const maxRadius = 100;
  const levels = 4; // concentric grid levels: 25%, 50%, 75%, 100%

  // The 6 vertices angles starting from top (-90 deg = -PI/2) clockwise
  // 0: Leadership (-PI/2)
  // 1: Strategy (-PI/2 + PI/3)
  // 2: Tech (-PI/2 + 2*PI/3)
  // 3: Communication (-PI/2 + PI)
  // 4: Design (-PI/2 + 4*PI/3)
  // 5: Problem Solving (-PI/2 + 5*PI/3)
  const angleStep = (Math.PI * 2) / skills.length;

  const getPointCoordinates = (index: number, valueRatio: number, offset = 0) => {
    const angle = -Math.PI / 2 + index * angleStep;
    const r = maxRadius * valueRatio + offset;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y, angle };
  };

  // Build polygon path for level grids
  const getLevelPoints = (levelRatio: number) => {
    return skills
      .map((_, i) => {
        const { x, y } = getPointCoordinates(i, levelRatio);
        return `${x},${y}`;
      })
      .join(' ');
  };

  // Build polygon path for actual values
  const dataPoints = skills.map((skill, i) => {
    const ratio = Math.max(0.1, Math.min(1, skill.value / skill.fullMark));
    const { x, y } = getPointCoordinates(i, ratio);
    return { x, y, skill, ratio };
  });

  const dataPolygonString = dataPoints.map((p) => `${p.x},${p.y}`).join(' ');

  return (
    <div className="relative w-full max-w-[320px] aspect-square mx-auto flex items-center justify-center select-none">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="w-full h-full overflow-visible"
        aria-label="Skill Radar Chart"
      >
        {/* Background concentric level polygons */}
        {[0.25, 0.5, 0.75, 1.0].map((level, idx) => (
          <polygon
            key={idx}
            points={getLevelPoints(level)}
            fill={level === 1.0 ? 'rgba(241, 245, 249, 0.3)' : 'none'}
            stroke="#cbd5e1"
            strokeWidth="1"
            strokeDasharray={level === 1.0 ? 'none' : '2,2'}
            className="transition-all duration-300"
          />
        ))}

        {/* Axis lines from center to outer points */}
        {skills.map((_, i) => {
          const { x, y } = getPointCoordinates(i, 1.0);
          return (
            <line
              key={`axis-${i}`}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="#cbd5e1"
              strokeWidth="1"
            />
          );
        })}

        {/* Filled Data Polygon */}
        <polygon
          points={dataPolygonString}
          fill="rgba(16, 185, 129, 0.22)"
          stroke="#10B981"
          strokeWidth="2.5"
          className="transition-all duration-500 ease-out drop-shadow-sm"
        />

        {/* Data points (dots) with interactivity */}
        {dataPoints.map((p, i) => {
          const isHovered = hoveredSkill?.key === p.skill.key;
          return (
            <g
              key={`point-${i}`}
              className="cursor-pointer"
              onMouseEnter={() => setHoveredSkill(p.skill)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              {/* Outer halo */}
              <circle
                cx={p.x}
                cy={p.y}
                r={isHovered ? 7 : 5}
                fill="#10B981"
                className="transition-all duration-200"
              />
              {/* Inner core */}
              <circle
                cx={p.x}
                cy={p.y}
                r={isHovered ? 4 : 3}
                fill="#1E293B"
                className="transition-all duration-200"
              />
            </g>
          );
        })}

        {/* Axis Labels positioned nicely outside vertices */}
        {skills.map((skill, i) => {
          const { x, y } = getPointCoordinates(i, 1.0, 24);
          const isHovered = hoveredSkill?.key === skill.key;

          // Align anchor based on horizontal position
          let textAnchor: 'middle' | 'start' | 'end' = 'middle';
          if (x < center - 15) textAnchor = 'end';
          else if (x > center + 15) textAnchor = 'start';

          const label = language === 'ko' ? skill.nameKo : skill.nameEn;

          return (
            <g
              key={`label-${i}`}
              className="cursor-pointer group"
              onMouseEnter={() => setHoveredSkill(skill)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <text
                x={x}
                y={y + (y < center ? -2 : 4)}
                textAnchor={textAnchor}
                className={`text-[13px] font-medium transition-colors duration-200 ${
                  isHovered
                    ? 'fill-[#10B981] font-bold'
                    : 'fill-[#0b1c30] group-hover:fill-[#10B981]'
                }`}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Hover tooltip card */}
      {hoveredSkill && (
        <div className="absolute top-2 right-2 bg-[#1e293b] text-white text-xs px-2.5 py-1.5 rounded-lg shadow-lg flex items-center gap-2 pointer-events-none z-20 animate-fade-in border border-slate-700">
          <span className="font-semibold">
            {language === 'ko' ? hoveredSkill.nameKo : hoveredSkill.nameEn}:
          </span>
          <span className="text-[#10B981] font-bold">{hoveredSkill.value}%</span>
        </div>
      )}
    </div>
  );
};
