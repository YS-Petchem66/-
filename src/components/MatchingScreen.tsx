import React, { useState } from 'react';
import { MatchingResult, RecommendedStory, Language, ExperienceItem } from '../types';
import { INITIAL_MATCHING_RESULT, COMPANY_PRESETS } from '../data/initialData';
import { DraftModal } from './DraftModal';
import { Sparkles, ArrowRightLeft, Bookmark, Edit3, RefreshCw, CheckCircle, BrainCircuit } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MatchingScreenProps {
  language: Language;
  experiences: ExperienceItem[];
}

export const MatchingScreen: React.FC<MatchingScreenProps> = ({
  language,
  experiences,
}) => {
  const [matchingData, setMatchingData] = useState<MatchingResult>(INITIAL_MATCHING_RESULT);
  const [companyName, setCompanyName] = useState(INITIAL_MATCHING_RESULT.companyName);
  const [coreValues, setCoreValues] = useState(INITIAL_MATCHING_RESULT.coreValues);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedStory, setSelectedStory] = useState<RecommendedStory | null>(null);
  const [bookmarkedStories, setBookmarkedStories] = useState<Set<string>>(new Set());

  const handleAnalyzeFit = async () => {
    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/match-company', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName,
          coreValues,
          experiences
        })
      });

      const json = await response.json();
      if (json.success && json.data) {
        setMatchingData(json.data);
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      }
    } catch (err) {
      console.warn('Match fallback:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSelectPreset = (preset: typeof COMPANY_PRESETS[0]) => {
    setCompanyName(preset.name);
    setCoreValues(language === 'ko' ? preset.valuesKo : preset.valuesEn);
  };

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedStories((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 md:px-12 pt-6 pb-28 md:pb-16">
      {/* Page Header */}
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-[#091426]">
          {language === 'ko' ? '기업 인재상 매칭' : 'Company Fit Matcher'}
        </h2>
        <p className="text-sm text-[#45474c] mt-1">
          {language === 'ko'
            ? '과거 경험이 목표 기업의 핵심 가치와 얼마나 일치하는지 분석합니다.'
            : "Analyze how your past experiences align with your target company's core values."}
        </p>
      </div>

      {/* Main Grid: Input Column (4 cols) & Results Column (8 cols) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column (4 cols): Target Config & AI Insight Card */}
        <section className="col-span-1 md:col-span-4 flex flex-col gap-6">
          {/* Target Configuration Card */}
          <div className="bg-white rounded-xl p-6 card-shadow border border-[#c5c6cd]/50">
            <h3 className="text-lg font-bold text-[#091426] mb-4">
              {language === 'ko' ? '목표 설정' : 'Target Configuration'}
            </h3>

            {/* Presets */}
            <div className="mb-4">
              <span className="text-xs font-semibold text-slate-500 block mb-1.5">
                {language === 'ko' ? '기업 프리셋 선택:' : 'Quick Presets:'}
              </span>
              <div className="flex flex-col gap-1">
                {COMPANY_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectPreset(preset)}
                    className="text-left text-xs px-2.5 py-1.5 rounded-lg bg-[#eff4ff] hover:bg-[#dce9ff] text-[#1e293b] font-medium transition-colors border border-[#d3e4fe] truncate"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-bold text-[#45474c] mb-1.5 block" htmlFor="companyName">
                  {language === 'ko' ? '목표 기업명' : 'Target Company Name'}
                </label>
                <input
                  id="companyName"
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder={language === 'ko' ? '예: 글로벌 테크놀로지' : 'e.g., Global Tech Inc.'}
                  className="w-full min-h-[46px] px-3.5 py-2 rounded-lg border border-[#c5c6cd] bg-white text-sm text-[#0b1c30] placeholder:text-[#64748B] focus:outline-hidden focus:border-[#1e293b] focus:ring-1 focus:ring-[#1e293b] transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#45474c] mb-1.5 block" htmlFor="coreValues">
                  {language === 'ko' ? '핵심 가치 (인재상)' : 'Core Values (인재상)'}
                </label>
                <textarea
                  id="coreValues"
                  rows={4}
                  value={coreValues}
                  onChange={(e) => setCoreValues(e.target.value)}
                  placeholder={
                    language === 'ko'
                      ? '예: 글로벌 마인드, 혁신, 팀워크...'
                      : 'e.g., Global Mindset, Innovation, Teamwork...'
                  }
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#c5c6cd] bg-white text-sm text-[#0b1c30] placeholder:text-[#64748B] focus:outline-hidden focus:border-[#1e293b] focus:ring-1 focus:ring-[#1e293b] transition-colors resize-none leading-relaxed"
                />
              </div>

              <button
                id="analyze-fit-btn"
                type="button"
                onClick={handleAnalyzeFit}
                disabled={isAnalyzing}
                className="w-full bg-[#1e293b] text-white font-semibold text-sm py-3 px-4 rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>{language === 'ko' ? '매칭 분석 중...' : 'Analyzing Fit...'}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#10B981]" />
                    <span>{language === 'ko' ? '매칭 분석하기' : 'Analyze Fit'}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* AI Insight Summary Card */}
          <div className="bg-white rounded-xl p-6 card-shadow border border-[#c5c6cd]/50 border-l-4 border-l-[#10B981]">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-[#10B981]/15 rounded-lg text-[#10B981]">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#091426]">
                {language === 'ko' ? 'AI 인사이트' : 'AI Insight'}
              </h3>
            </div>
            <p className="text-xs text-[#45474c] leading-relaxed">
              {language === 'ko' ? matchingData.aiInsightKo : matchingData.aiInsightEn}
            </p>
          </div>
        </section>

        {/* Right Column (8 cols): Matching Matrix & Recommended Stories */}
        <section className="col-span-1 md:col-span-8 flex flex-col gap-6">
          {/* Matching Matrix */}
          <div className="bg-white rounded-xl p-6 card-shadow border border-[#c5c6cd]/50">
            <h3 className="text-lg font-bold text-[#091426] mb-4">
              {language === 'ko' ? '매칭 매트릭스' : 'Matching Matrix'}
            </h3>

            <div className="flex flex-col gap-3">
              {matchingData.matrix.map((row, idx) => (
                <div
                  key={idx}
                  className="flex flex-col md:flex-row gap-3 md:gap-4 items-start md:items-center p-4 rounded-xl border border-[#c5c6cd]/60 hover:shadow-md transition-shadow bg-[#f8f9ff]/40"
                >
                  <div className="w-full md:w-5/12">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      {language === 'ko' ? '기업 가치' : 'Company Value'}
                    </span>
                    <div className="text-sm text-[#091426] font-bold mt-0.5">
                      {language === 'ko' ? row.companyValueKo : row.companyValueEn}
                    </div>
                  </div>

                  <div className="hidden md:flex items-center justify-center text-[#10B981] px-2">
                    <ArrowRightLeft className="w-5 h-5" />
                  </div>

                  <div className="w-full md:w-7/12">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      {language === 'ko' ? '일치하는 경험' : 'Matched Experience'}
                    </span>
                    <div className="flex items-center justify-between gap-2 mt-0.5">
                      <span className="text-sm text-[#0b1c30] font-medium">
                        {language === 'ko' ? row.matchedExperienceKo : row.matchedExperienceEn}
                      </span>
                      <span className="bg-[#10B981]/15 text-[#006c49] text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap border border-[#10B981]/30">
                        {row.matchRate}% {language === 'ko' ? '일치' : 'Match'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Stories */}
          <div>
            <h3 className="text-lg font-bold text-[#091426] mb-4">
              {language === 'ko' ? '추천 스토리' : 'Recommended Stories'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {matchingData.recommendedStories.map((story) => {
                const isBookmarked = bookmarkedStories.has(story.id);
                return (
                  <div
                    key={story.id}
                    className="bg-white rounded-xl p-5 card-shadow border border-[#c5c6cd]/60 hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-2.5">
                        <span className="text-xs font-bold text-[#1e293b] bg-[#dce9ff] px-2.5 py-1 rounded-md">
                          {language === 'ko' ? story.tagKo : story.tagEn}
                        </span>
                        <button
                          onClick={(e) => toggleBookmark(story.id, e)}
                          className="text-slate-400 hover:text-[#10B981] p-1 rounded-full hover:bg-slate-100 transition-colors"
                          aria-label="Bookmark Story"
                        >
                          <Bookmark
                            className={`w-4 h-4 ${
                              isBookmarked ? 'fill-[#10B981] text-[#10B981]' : ''
                            }`}
                          />
                        </button>
                      </div>

                      <h4 className="text-sm font-bold text-[#091426] mb-1.5 line-clamp-2 leading-snug">
                        {language === 'ko' ? story.titleKo : story.titleEn}
                      </h4>

                      <p className="text-xs text-[#45474c] mb-4 line-clamp-3 leading-relaxed">
                        {language === 'ko' ? story.descriptionKo : story.descriptionEn}
                      </p>
                    </div>

                    <div className="mt-auto pt-3 border-t border-slate-100">
                      <button
                        id={`generate-bullet-btn-${story.id}`}
                        onClick={() => setSelectedStory(story)}
                        className="w-full text-center text-[#1e293b] font-bold text-xs py-2.5 px-3 rounded-lg border border-[#c5c6cd] hover:bg-[#eff4ff] hover:border-[#1e293b] transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>{language === 'ko' ? '자기소개서 초안 생성' : 'Generate Draft Bullet'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      {/* Modal for Draft Bullet Generation */}
      {selectedStory && (
        <DraftModal
          story={selectedStory}
          language={language}
          companyName={companyName}
          onClose={() => setSelectedStory(null)}
        />
      )}
    </div>
  );
};
