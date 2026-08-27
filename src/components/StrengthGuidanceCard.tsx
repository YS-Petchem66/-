import React from 'react';
import { Language, StrengthGuidance } from '../types';
import { Star, Zap, Briefcase, LightbulbIcon } from 'lucide-react';

interface StrengthGuidanceCardProps {
  language: Language;
  guidance: StrengthGuidance[];
}

export const StrengthGuidanceCard: React.FC<StrengthGuidanceCardProps> = ({ language, guidance }) => {
  const topStrength = guidance.length > 0 ? guidance[0] : null;

  if (!topStrength) return null;

  return (
    <div className="bg-white rounded-xl p-6 card-shadow border border-[#c5c6cd]/50">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-1.5 bg-[#fbbf24]/15 rounded-lg text-[#f59e0b]">
          <Star className="w-5 h-5 fill-current" />
        </div>
        <h3 className="text-lg font-bold text-[#091426]">
          {language === 'ko' ? '강점 활용 가이드' : 'Strength Utilization Guide'}
        </h3>
      </div>

      {/* Strength Highlight */}
      <div className="bg-gradient-to-r from-[#fef3c7] to-[#fef08a] p-4 rounded-lg border border-[#fcd34d] mb-5">
        <div className="flex items-start gap-3">
          <Zap className="w-5 h-5 text-[#d97706] flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-[#92400e] mb-1">
              {language === 'ko' ? '당신의 최강 역량: ' : 'Your Top Strength: '}
              <span className="text-lg">{language === 'ko' ? topStrength.strengthKo : topStrength.strengthEn}</span>
            </h4>
            <p className="text-sm text-[#b45309]">
              {topStrength.value}% - {language === 'ko' ? '상위 5% 수준' : 'Top 5% Proficiency'}
            </p>
          </div>
        </div>
      </div>

      {/* Differentiator */}
      <div className="mb-5">
        <h4 className="text-sm font-bold text-[#091426] mb-2 flex items-center gap-2">
          <LightbulbIcon className="w-4 h-4 text-[#f59e0b]" />
          {language === 'ko' ? '당신의 차별점' : 'Your Differentiator'}
        </h4>
        <p className="text-xs text-[#45474c] leading-relaxed bg-[#fffbeb] p-3 rounded-lg border border-[#fde68a]">
          {language === 'ko' ? topStrength.differentiatorKo : topStrength.differentiatorEn}
        </p>
      </div>

      {/* Career Paths */}
      <div>
        <h4 className="text-sm font-bold text-[#091426] mb-3 flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-[#f59e0b]" />
          {language === 'ko' ? '어울리는 커리어 경로' : 'Ideal Career Paths'}
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {(language === 'ko' ? topStrength.careerPathsKo : topStrength.careerPathsEn).map((path, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2 p-3 bg-[#f0fdf4] rounded-lg border border-[#bbf7d0]"
            >
              <span className="text-[#16a34a] font-bold text-lg leading-none mt-0.5">→</span>
              <span className="text-xs text-[#166534] font-medium">{path}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Recommendation */}
      <div className="mt-5 pt-5 border-t border-slate-100">
        <div className="bg-[#f3f4f6] p-4 rounded-lg">
          <p className="text-xs text-[#1f2937] font-medium">
            {language === 'ko'
              ? '🎯 추천: 이 강점을 차별화 요소로 활용하여 기업에 어필하세요. 특히 위의 커리어 경로들에서 당신의 기술과 경험이 가장 가치 있을 것입니다.'
              : '🎯 Recommendation: Leverage this strength as your key differentiator when approaching companies. You\'ll be most valuable in the career paths listed above.'}
          </p>
        </div>
      </div>
    </div>
  );
};
