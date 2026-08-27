import React, { useState } from 'react';
import { RecommendedStory, Language } from '../types';
import { Sparkles, Copy, Check, FileText, CheckCircle2, Bookmark, Share2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface DraftModalProps {
  story: RecommendedStory | null;
  language: Language;
  companyName: string;
  onClose: () => void;
}

export const DraftModal: React.FC<DraftModalProps> = ({
  story,
  language,
  companyName,
  onClose
}) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [activeFormat, setActiveFormat] = useState<'bullet' | 'star' | 'pitch'>('bullet');

  if (!story) return null;

  const handleCopy = (text: string, sectionKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionKey);
    confetti({
      particleCount: 30,
      spread: 40,
      origin: { y: 0.6 }
    });
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const title = language === 'ko' ? story.titleKo : story.titleEn;
  const tag = language === 'ko' ? story.tagKo : story.tagEn;
  const bullet = language === 'ko' ? story.draftBulletKo : story.draftBulletEn;
  const star = language === 'ko' ? story.starStructureKo : story.starStructureEn;

  const starText = star
    ? `[Situation] ${star.situation}\n[Task] ${star.task}\n[Action] ${star.action}\n[Result] ${star.result}`
    : '';

  const pitchText =
    language === 'ko'
      ? `저는 '${title}' 경험을 통해 '${tag}' 역량을 실전에서 입증했습니다. ${companyName}에서도 복잡한 요구사항을 능동적으로 해결하고 측정 가능한 성과를 창출하겠습니다.`
      : `Through my experience in '${title}', I proved my '${tag}' competency. At ${companyName}, I look forward to solving challenging problems and delivering measurable impact.`;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex justify-between items-start bg-[#f8f9ff]">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold text-[#1e293b] bg-[#dce9ff] px-2.5 py-0.5 rounded-md">
                {tag}
              </span>
              <span className="text-xs font-bold text-[#006c49] bg-[#10B981]/15 px-2.5 py-0.5 rounded-md flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> AI Tailored
              </span>
            </div>
            <h3 className="text-base font-bold text-[#091426] line-clamp-1">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-600 font-bold"
          >
            ✕
          </button>
        </div>

        {/* Tab Format Switcher */}
        <div className="flex border-b border-slate-100 px-5 pt-3 gap-2 bg-white">
          <button
            onClick={() => setActiveFormat('bullet')}
            className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition-all ${
              activeFormat === 'bullet'
                ? 'border-[#10B981] text-[#006c49]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {language === 'ko' ? '이력서 불렛 포인트' : 'Resume Bullet'}
          </button>
          <button
            onClick={() => setActiveFormat('star')}
            className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition-all ${
              activeFormat === 'star'
                ? 'border-[#10B981] text-[#006c49]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {language === 'ko' ? 'STAR 구조화 답변' : 'STAR Story'}
          </button>
          <button
            onClick={() => setActiveFormat('pitch')}
            className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition-all ${
              activeFormat === 'pitch'
                ? 'border-[#10B981] text-[#006c49]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {language === 'ko' ? '자기소개서 문단' : 'Cover Letter Pitch'}
          </button>
        </div>

        {/* Content Area */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1 text-sm text-slate-700">
          {activeFormat === 'bullet' && (
            <div className="space-y-3">
              <div className="p-4 bg-[#f8f9ff] rounded-xl border border-slate-200">
                <p className="text-sm font-medium text-slate-800 leading-relaxed">{bullet}</p>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => handleCopy(bullet, 'bullet')}
                  className="btn-emerald px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs"
                >
                  {copiedSection === 'bullet' ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>{language === 'ko' ? '복사됨!' : 'Copied!'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{language === 'ko' ? '이력서 불렛 복사' : 'Copy Resume Bullet'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {activeFormat === 'star' && star && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 gap-2.5 text-xs">
                <div className="p-3 bg-[#eff4ff] rounded-lg border border-[#d3e4fe]">
                  <span className="font-bold text-[#1e293b] block mb-1">Situation (상황)</span>
                  <p className="text-slate-700 leading-relaxed">{star.situation}</p>
                </div>
                <div className="p-3 bg-[#eff4ff] rounded-lg border border-[#d3e4fe]">
                  <span className="font-bold text-[#1e293b] block mb-1">Task (과제)</span>
                  <p className="text-slate-700 leading-relaxed">{star.task}</p>
                </div>
                <div className="p-3 bg-[#e5eeff] rounded-lg border border-[#dce9ff]">
                  <span className="font-bold text-[#006c49] block mb-1">Action (행동)</span>
                  <p className="text-slate-700 leading-relaxed">{star.action}</p>
                </div>
                <div className="p-3 bg-[#6cf8bb]/15 rounded-lg border border-[#10B981]/30">
                  <span className="font-bold text-[#006c49] block mb-1">Result (성과)</span>
                  <p className="text-slate-700 leading-relaxed">{star.result}</p>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => handleCopy(starText, 'star')}
                  className="btn-emerald px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs"
                >
                  {copiedSection === 'star' ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>{language === 'ko' ? '복사됨!' : 'Copied!'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{language === 'ko' ? 'STAR 답변 전체 복사' : 'Copy STAR Story'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {activeFormat === 'pitch' && (
            <div className="space-y-3">
              <div className="p-4 bg-[#f8f9ff] rounded-xl border border-slate-200">
                <p className="text-sm text-slate-800 leading-relaxed">{pitchText}</p>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => handleCopy(pitchText, 'pitch')}
                  className="btn-emerald px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs"
                >
                  {copiedSection === 'pitch' ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>{language === 'ko' ? '복사됨!' : 'Copied!'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{language === 'ko' ? '문단 복사' : 'Copy Paragraph'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-[#f8f9ff] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-200"
          >
            {language === 'ko' ? '닫기' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
