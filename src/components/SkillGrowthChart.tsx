import React, { useState } from 'react';
import { Language, SkillGrowthTrend } from '../types';
import { TrendingUp } from 'lucide-react';

interface SkillGrowthChartProps {
  language: Language;
  trends: SkillGrowthTrend[];
}

const LineChart: React.FC<{ trend: SkillGrowthTrend }> = ({ trend }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const data = trend.trendData;
  const width = 280;
  const height = 140;
  const padding = 20;
  const graphWidth = width - padding * 2;
  const graphHeight = height - padding * 2;
  
  const minValue = Math.min(...data.map(d => d.value), 50);
  const maxValue = 100;
  const range = maxValue - minValue;
  
  // 포인트 계산
  const points = data.map((d, idx) => ({
    x: padding + (idx / (data.length - 1)) * graphWidth,
    y: padding + graphHeight - ((d.value - minValue) / range) * graphHeight,
    value: d.value
  }));
  
  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  
  return (
    <div className="relative" onMouseLeave={() => setHoveredIndex(null)}>
      <svg width={width} height={height} className="w-full" viewBox={`0 0 ${width} ${height}`}>
        {/* 그리드 라인 */}
        {[20, 40, 60, 80, 100].map((val) => (
          val >= minValue && (
            <line
              key={`grid-${val}`}
              x1={padding}
              y1={padding + graphHeight - ((val - minValue) / range) * graphHeight}
              x2={width - padding}
              y2={padding + graphHeight - ((val - minValue) / range) * graphHeight}
              stroke="#e2e8f0"
              strokeWidth="1"
              strokeDasharray="4"
            />
          )
        ))}
        
        {/* Y축 */}
        <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#cbd5e1" strokeWidth="1" />
        
        {/* X축 */}
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#cbd5e1" strokeWidth="1" />
        
        {/* 선 그래프 */}
        <polyline
          points={points.map(p => `${p.x},${p.y}`).join(' ')}
          fill="none"
          stroke="#10B981"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* 데이터 포인트 */}
        {points.map((point, idx) => (
          <circle
            key={`point-${idx}`}
            cx={point.x}
            cy={point.y}
            r="4"
            fill={hoveredIndex === idx ? '#059669' : '#10B981'}
            stroke="white"
            strokeWidth="2"
            className="cursor-pointer transition-all"
            onMouseEnter={() => setHoveredIndex(idx)}
          />
        ))}
        
        {/* 값 레이블 */}
        {points.map((point, idx) => (
          <text
            key={`label-${idx}`}
            x={point.x}
            y={point.y - 10}
            textAnchor="middle"
            className="text-[11px] font-bold fill-[#091426]"
            opacity={hoveredIndex === idx ? 1 : 0.6}
          >
            {data[idx].value}%
          </text>
        ))}
      </svg>
      
      {/* 월 레이블 */}
      <div className="flex justify-between px-5 text-[9px] text-slate-500 mt-1">
        {data.map((d, idx) => (
          <span key={`month-${idx}`}>{d.date.split('-')[1]}월</span>
        ))}
      </div>
    </div>
  );
};

export const SkillGrowthChart: React.FC<SkillGrowthChartProps> = ({ language, trends }) => {
  return (
    <div className="bg-white rounded-xl p-6 card-shadow border border-[#c5c6cd]/50">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-1.5 bg-[#10B981]/15 rounded-lg text-[#10B981]">
          <TrendingUp className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-bold text-[#091426]">
          {language === 'ko' ? '역량 성장 트렌드 (지난 6개월)' : 'Skill Growth Trend (6 months)'}
        </h3>
      </div>

      <div className="space-y-5">
        {trends.map((trend) => (
          <div key={trend.skillKey} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-[#091426]">
                {language === 'ko' ? trend.nameKo : trend.nameEn}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[#10B981]">{trend.currentValue}%</span>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                  trend.growthRate > 10 ? 'bg-[#dcfce7] text-[#006c49]' :
                  trend.growthRate > 5 ? 'bg-[#dbeafe] text-[#0c4a6e]' :
                  'bg-slate-100 text-slate-600'
                }`}>
                  +{trend.growthRate}%
                </span>
              </div>
            </div>
            
            {/* Line chart */}
            <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
              <LineChart trend={trend} />
            </div>

            {/* Growth insight */}
            <p className="text-xs text-slate-600">
              {language === 'ko' ? (
                <>
                  {trend.trendData[0].value}% → {trend.currentValue}% 
                  {trend.growthRate > 10 && ' 🔥 급성장 중!'}
                  {trend.growthRate > 5 && trend.growthRate <= 10 && ' 📈 안정적 성장'}
                  {trend.growthRate <= 5 && ' 📊 꾸준한 개선'}
                </>
              ) : (
                <>
                  {trend.trendData[0].value}% → {trend.currentValue}%
                  {trend.growthRate > 10 && ' 🔥 Rapid growth!'}
                  {trend.growthRate > 5 && trend.growthRate <= 10 && ' 📈 Steady progress'}
                  {trend.growthRate <= 5 && ' 📊 Consistent improvement'}
                </>
              )}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-slate-100">
        <div className="bg-[#f0fdf4] p-4 rounded-lg border border-[#dcfce7]">
          <p className="text-xs text-[#166534] font-medium">
            {language === 'ko' 
              ? '💡 팁: 지난 6개월간 "문제 해결" 역량이 18% 성장했어요! 이는 최근 경험들이 당신의 핵심 강점을 집중적으로 개발했다는 의미입니다.'
              : '💡 Tip: Your "Problem Solving" skill grew by 18% over 6 months! This shows your recent experiences have strengthened your core competency.'}
          </p>
        </div>
      </div>
    </div>
  );
};
