import React from 'react';
import { Language, CompanyMatchingSummary } from '../types';
import { BarChart3, Trophy } from 'lucide-react';

interface CompanyMatchComparisonProps {
  language: Language;
  comparisons: CompanyMatchingSummary[];
}

export const CompanyMatchComparison: React.FC<CompanyMatchComparisonProps> = ({
  language,
  comparisons
}) => {
  const bestMatch = comparisons.length > 0
    ? [...comparisons].sort((a, b) => b.overallMatchRate - a.overallMatchRate)[0]
    : null;

  return (
    <div className="bg-white rounded-xl p-6 card-shadow border border-[#c5c6cd]/50">
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 className="w-5 h-5 text-[#1e293b]" />
        <h3 className="text-lg font-bold text-[#091426]">
          {language === 'ko' ? '기업 매칭 비교' : 'Company Fit Comparison'}
        </h3>
      </div>

      <div className="space-y-4">
        {comparisons.map((company, idx) => (
          <div key={idx} className="relative">
            {/* Company Header */}
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-[#091426]">{company.companyName}</h4>
                {bestMatch && company.companyName === bestMatch.companyName && (
                  <Trophy className="w-4 h-4 text-[#f59e0b]" />
                )}
              </div>
              <span className="text-sm font-bold text-[#10B981]">{company.overallMatchRate}%</span>
            </div>

            {/* Match Rate Bar */}
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-gradient-to-r from-[#10B981] to-[#059669] rounded-full transition-all duration-500"
                style={{ width: `${company.overallMatchRate}%` }}
              />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 bg-[#f0fdf4] rounded-lg border border-[#dcfce7]">
                <span className="text-slate-600">{language === 'ko' ? '강한 일치' : 'Strong Matches'}</span>
                <p className="font-bold text-[#006c49]">{company.strongMatches}개</p>
              </div>
              <div className="p-2 bg-[#fffbeb] rounded-lg border border-[#fde68a]">
                <span className="text-slate-600">{language === 'ko' ? '보완 필요' : 'Dev Areas'}</span>
                <p className="font-bold text-[#92400e]">{company.developmentNeeds}개</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recommendation */}
      {bestMatch && (
        <div className="mt-6 pt-6 border-t border-slate-100">
          <div className="bg-[#f0fdf4] p-4 rounded-lg border border-[#bbf7d0]">
            <p className="text-xs text-[#166534] font-medium">
              {language === 'ko'
                ? `🎯 추천: "${bestMatch.companyName}"이 당신의 경험과 가장 잘 맞습니다 (${bestMatch.overallMatchRate}% 매칭율). 이 기업을 우선적으로 지원해보세요!`
                : `🎯 Recommendation: "${bestMatch.companyName}" is your best fit (${bestMatch.overallMatchRate}% match rate). Prioritize this company!`}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
