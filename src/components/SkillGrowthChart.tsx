import React from 'react';
import { Language, SkillGrowthTrend } from '../types';
import { TrendingUp, BarChart3 } from 'lucide-react';

interface SkillGrowthChartProps {
  language: Language;
  trends: SkillGrowthTrend[];
}

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

      <div className="space-y-4">
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
            
            {/* Simple bar representation */}
            <div className="relative h-8 bg-slate-50 rounded-lg overflow-hidden border border-slate-200">
              {/* Timeline representation */}
              <div className="absolute inset-0 flex items-center gap-1 px-2">
                {trend.trendData.map((data, idx) => (
                  <div key={idx} className="flex flex-col items-center flex-1">
                    <div
                      className="w-full h-6 bg-gradient-to-t from-[#10B981] to-[#10B981] rounded-sm"
                      style={{ opacity: data.value / 100 }}
                    />
                    <span className="text-[9px] text-slate-500 mt-0.5">
                      {data.date.split('-')[1]}월
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Growth insight */}
            <p className="text-xs text-slate-600 mt-2">
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
