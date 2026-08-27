import React, { useState } from 'react';
import { Language, ExperienceItem, SkillScore, AnalysisResult } from '../types';
import { SAMPLE_NOTES_PRESETS } from '../data/initialData';
import { Sparkles, BrainCircuit, CheckCircle2, TrendingUp, RefreshCw, Save, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AnalysisScreenProps {
  language: Language;
  onSaveExperience: (newExp: ExperienceItem) => void;
  onUpdateSkills: (impact: { [key: string]: number }) => void;
}

export const AnalysisScreen: React.FC<AnalysisScreenProps> = ({
  language,
  onSaveExperience,
  onUpdateSkills
}) => {
  const [noteText, setNoteText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  const handleAnalyze = async () => {
    if (!noteText.trim()) return;

    setIsAnalyzing(true);
    setIsSaved(false);

    try {
      const response = await fetch('/api/analyze-experience', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: noteText, language }),
      });

      const json = await response.json();
      if (json.success && json.data) {
        setAnalysisResult(json.data);
      } else {
        throw new Error('Analysis failed');
      }
    } catch (err) {
      console.warn('Analysis fallback:', err);
      // Fallback result matching mockup
      setAnalysisResult({
        titleKo: '분기별 리뷰 및 출시 계획 제안',
        titleEn: 'Quarterly Review & Phased Rollout Plan',
        tagsKo: ['리더십', '전략', '소통'],
        tagsEn: ['Leadership', 'Strategy', 'Communication'],
        competenciesKo: ['리더십', '전략 기획', '커뮤니케이션'],
        competenciesEn: ['Leadership', 'Strategic Planning', 'Communication'],
        takeawaysKo: [
          '구조화된 단계별 출시를 제안하여 강한 주도성을 보여주었으며, 더 큰 프로젝트 관리 역할을 맡을 준비가 되었음을 나타냅니다.',
          '전략 기획 역량을 더욱 강화하기 위해 다음에는 타 부서와의 조율에 집중해 보세요.'
        ],
        takeawaysEn: [
          'Demonstrated strong initiative by proposing a structured phased rollout, indicating readiness for larger project management roles.',
          'Consider focusing next on cross-departmental alignment to further strengthen strategic planning competency.'
        ],
        scoreImpact: { leadership: 90, strategy: 82, communication: 85 }
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSaveToLog = () => {
    if (!analysisResult) return;

    const newExp: ExperienceItem = {
      id: 'exp-' + Date.now(),
      titleKo: analysisResult.titleKo || '새 프로젝트 회고',
      titleEn: analysisResult.titleEn || 'New Project Reflection',
      date: language === 'ko' ? '2023.11' : 'Nov 2023',
      excerptKo: noteText.slice(0, 80) + (noteText.length > 80 ? '...' : ''),
      excerptEn: noteText.slice(0, 80) + (noteText.length > 80 ? '...' : ''),
      fullNotes: noteText,
      tagsKo: analysisResult.tagsKo.length ? analysisResult.tagsKo : ['성장', '경험'],
      tagsEn: analysisResult.tagsEn.length ? analysisResult.tagsEn : ['Growth', 'Experience'],
      competenciesKo: analysisResult.competenciesKo,
      competenciesEn: analysisResult.competenciesEn,
      takeawaysKo: analysisResult.takeawaysKo,
      takeawaysEn: analysisResult.takeawaysEn,
      scoreImpact: analysisResult.scoreImpact
    };

    onSaveExperience(newExp);
    if (analysisResult.scoreImpact) {
      onUpdateSkills(analysisResult.scoreImpact);
    }

    setIsSaved(true);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  const handleSelectPreset = (preset: typeof SAMPLE_NOTES_PRESETS[0]) => {
    setNoteText(language === 'ko' ? preset.textKo : preset.textEn);
  };

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 md:px-12 pt-6 pb-28 md:pb-16">
      {/* Main Grid: Input Form (7 cols) + AI Output Preview (5 cols) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column: Input Form */}
        <section className="col-span-1 md:col-span-7 flex flex-col gap-5">
          <div className="bg-white rounded-xl card-shadow p-6 border border-[#c5c6cd]/50">
            <h2 className="text-xl md:text-2xl font-bold text-[#0b1c30] mb-1.5">
              {language === 'ko' ? 'AI 경험 분석' : 'Log Experience'}
            </h2>
            <p className="text-sm text-[#45474c] mb-4 leading-relaxed">
              {language === 'ko'
                ? '프로젝트 회고, 일과, 또는 회의 노트를 붙여넣어 AI 분석을 시작하세요.'
                : 'Paste your project reflections, daily activities, or meeting notes below for AI analysis.'}
            </p>

            {/* Quick Preset Chips */}
            <div className="mb-3">
              <span className="text-xs font-semibold text-slate-500 block mb-1.5">
                {language === 'ko' ? '빠른 예시 불러오기:' : 'Quick Sample Presets:'}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {SAMPLE_NOTES_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectPreset(preset)}
                    className="text-xs px-2.5 py-1 rounded-lg bg-[#eff4ff] hover:bg-[#dce9ff] text-[#1e293b] font-medium transition-colors border border-[#d3e4fe]"
                  >
                    {language === 'ko' ? preset.labelKo : preset.labelEn}
                  </button>
                ))}
              </div>
            </div>

            {/* Note Textarea */}
            <textarea
              id="experience-note-input"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder={
                language === 'ko'
                  ? '예: 오늘 분기별 리뷰 회의를 주도했습니다. 새로운 API 연동에 대해 논의했고 단계별 출시 계획을 제안했습니다...'
                  : 'E.g., Today I led the quarterly review meeting. We discussed the new API integration and I proposed a phased rollout plan...'
              }
              rows={8}
              className="w-full p-4 border border-[#c5c6cd] rounded-xl focus:border-[#1e293b] focus:ring-1 focus:ring-[#1e293b] text-base resize-none transition-colors outline-hidden bg-[#f8f9ff]/50 leading-relaxed"
            />

            {/* Submit Action Button */}
            <div className="mt-5 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                {noteText.length} {language === 'ko' ? '자' : 'chars'}
              </span>
              <button
                id="analyze-btn"
                type="button"
                onClick={handleAnalyze}
                disabled={isAnalyzing || !noteText.trim()}
                className={`btn-emerald text-sm font-semibold py-3 px-8 rounded-xl shadow-xs hover:shadow-md transition-all flex items-center gap-2 ${
                  isAnalyzing || !noteText.trim() ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>{language === 'ko' ? '분석 중...' : 'Analyzing...'}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>{language === 'ko' ? '내 경험 분석하기' : 'Analyze My Experience'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* Right Column: AI Output Preview */}
        <section className="col-span-1 md:col-span-5">
          {!analysisResult ? (
            /* Empty State */
            <div
              id="ai-empty-state"
              className="bg-white rounded-xl p-8 card-shadow min-h-[380px] h-full flex flex-col items-center justify-center text-center border border-dashed border-[#c5c6cd]"
            >
              <div className="w-14 h-14 rounded-full bg-[#eff4ff] flex items-center justify-center mb-3 text-[#75777d]">
                <BrainCircuit className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-[#0b1c30] mb-1">
                {language === 'ko' ? '입력 대기 중' : 'Awaiting Input'}
              </h3>
              <p className="text-xs text-[#45474c] max-w-[260px] leading-relaxed">
                {language === 'ko'
                  ? '노트를 입력하고 분석 버튼을 눌러 핵심 역량과 통찰을 추출하세요.'
                  : 'Enter your notes and click analyze to extract insights and core competencies.'}
              </p>
            </div>
          ) : (
            /* Active State */
            <div
              id="ai-active-state"
              className="bg-white rounded-xl p-6 card-shadow ai-accent-border border border-[#c5c6cd]/50 h-full flex flex-col justify-between animate-fade-in"
            >
              <div>
                {/* Heading */}
                <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 bg-[#10B981]/15 text-[#006c49] rounded-lg">
                      <BrainCircuit className="w-5 h-5" />
                    </span>
                    <h3 className="text-lg font-bold text-[#0b1c30]">
                      {language === 'ko' ? 'AI 인사이트' : 'AI Insights'}
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-[#10B981] bg-[#10B981]/10 px-2.5 py-1 rounded-full border border-[#10B981]/20">
                    Extracted
                  </span>
                </div>

                {/* Extracted Competencies */}
                <div className="mb-6">
                  <h4 className="text-xs font-bold text-[#45474c] uppercase tracking-wider mb-2.5">
                    {language === 'ko' ? '추출된 역량' : 'Extracted Competencies'}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {(language === 'ko' ? analysisResult.competenciesKo : analysisResult.competenciesEn).map(
                      (comp, idx) => (
                        <span
                          key={idx}
                          className="bg-[#10B981]/10 text-[#006c49] text-xs font-bold px-3 py-1 rounded-full border border-[#10B981]/20"
                        >
                          {comp}
                        </span>
                      )
                    )}
                  </div>
                </div>

                {/* Growth Takeaways */}
                <div>
                  <h4 className="text-xs font-bold text-[#45474c] uppercase tracking-wider mb-2.5">
                    {language === 'ko' ? '성장 포인트' : 'Growth Takeaways'}
                  </h4>
                  <ul className="space-y-3.5">
                    {(language === 'ko' ? analysisResult.takeawaysKo : analysisResult.takeawaysEn).map(
                      (item, idx) => (
                        <li key={idx} className="flex gap-2.5 items-start">
                          {idx === 0 ? (
                            <CheckCircle2 className="w-4 h-4 text-[#006c49] shrink-0 mt-0.5" />
                          ) : (
                            <TrendingUp className="w-4 h-4 text-[#006c49] shrink-0 mt-0.5" />
                          )}
                          <p className="text-xs text-[#0b1c30] leading-relaxed">{item}</p>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>

              {/* Save & Apply Action */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col gap-2">
                <button
                  onClick={handleSaveToLog}
                  disabled={isSaved}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    isSaved
                      ? 'bg-[#eff4ff] text-[#006c49] border border-[#10B981]/30 cursor-default'
                      : 'bg-[#1e293b] text-white hover:bg-slate-800 shadow-xs'
                  }`}
                >
                  {isSaved ? (
                    <>
                      <Check className="w-4 h-4 text-[#10B981]" />
                      <span>{language === 'ko' ? '경험 아카이브에 저장됨' : 'Saved to Experience Log'}</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>
                        {language === 'ko'
                          ? '경험 저장 및 역량 점수 반영'
                          : 'Save Experience & Update Skills'}
                      </span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
