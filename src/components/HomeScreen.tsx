import React, { useState } from 'react';
import { ExperienceItem, SkillScore, Language, NavTab } from '../types';
import { RadarChart } from './RadarChart';
import { Sparkles, Code, Database, Users, MessageSquare, TrendingUp, Plus, ArrowRight, CheckCircle2, ChevronRight, Bookmark } from 'lucide-react';

interface HomeScreenProps {
  skills: SkillScore[];
  experiences: ExperienceItem[];
  language: Language;
  setActiveTab: (tab: NavTab) => void;
  onOpenNewLog: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  skills,
  experiences,
  language,
  setActiveTab,
  onOpenNewLog
}) => {
  const [showAllModal, setShowAllModal] = useState(false);
  const [selectedExp, setSelectedExp] = useState<ExperienceItem | null>(null);

  // Helper to choose tag icon
  const getTagIcon = (tag: string) => {
    const t = tag.toLowerCase();
    if (t.includes('기술') || t.includes('tech') || t.includes('code')) return <Code className="w-3.5 h-3.5" />;
    if (t.includes('문제') || t.includes('problem') || t.includes('storage') || t.includes('database')) return <Database className="w-3.5 h-3.5" />;
    if (t.includes('리더십') || t.includes('leadership') || t.includes('팀') || t.includes('groups')) return <Users className="w-3.5 h-3.5" />;
    return <MessageSquare className="w-3.5 h-3.5" />;
  };

  const recentList = experiences.slice(0, 3);

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 md:px-12 pt-6 pb-24 md:pb-12">
      {/* Header Section */}
      <section className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#091426] tracking-tight mb-3">
          {language === 'ko' ? '안녕하세요, Alex님' : 'Good Morning, Alex'}
        </h1>

        {/* AI Summary Banner */}
        <div className="bg-white rounded-xl card-shadow p-5 flex flex-col md:flex-row items-start justify-between gap-4 ai-accent-border border border-[#c5c6cd]/40">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-[#10B981]/10 text-[#10B981] mt-0.5">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#1e293b] mb-1">
                {language === 'ko' ? 'AI 요약' : 'AI Summary'}
              </h2>
              <p className="text-sm text-[#45474c]">
                {language === 'ko'
                  ? '최근 프로젝트 리뷰를 통해 3개의 주요 역량이 업데이트되었습니다.'
                  : '3 key skills updated from your latest project review.'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-[#10B981]/10 text-[#006c49] px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 border border-[#10B981]/20">
              <TrendingUp className="w-3.5 h-3.5" />
              {language === 'ko' ? '문제 해결 +5%' : 'Problem Solving +5%'}
            </span>
            <span className="bg-[#10B981]/10 text-[#006c49] px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 border border-[#10B981]/20">
              <TrendingUp className="w-3.5 h-3.5" />
              {language === 'ko' ? '리더십 +3%' : 'Leadership +3%'}
            </span>
          </div>
        </div>
      </section>

      {/* Main Grid: Radar Chart (6 cols) & Recent Experiences (6 cols) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Skill Distribution / Radar Chart Section */}
        <section className="col-span-1 md:col-span-6 bg-white rounded-xl card-shadow p-6 border border-[#c5c6cd]/40 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-xl font-bold text-[#091426]">
                {language === 'ko' ? '역량 분포도' : 'Skill Distribution'}
              </h2>
              <p className="text-xs text-[#64748B] mt-0.5">
                {language === 'ko'
                  ? '기록된 경험을 바탕으로 산출된 6대 핵심 역량'
                  : '6 core competencies extracted from your logged notes'}
              </p>
            </div>
            <button
              onClick={() => setActiveTab('analysis')}
              className="text-xs font-semibold text-[#006c49] hover:underline flex items-center gap-1"
            >
              {language === 'ko' ? '분석 추가' : 'Add Note'} <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="py-2 flex items-center justify-center">
            <RadarChart skills={skills} language={language} />
          </div>

          {/* Quick Skill Bars under radar */}
          <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-3 gap-3 text-center">
            {skills.slice(0, 3).map((s) => (
              <div key={s.key} className="bg-[#f8f9ff] p-2 rounded-lg border border-slate-200/60">
                <span className="text-[11px] text-slate-500 block">
                  {language === 'ko' ? s.nameKo : s.nameEn}
                </span>
                <span className="text-sm font-bold text-[#091426]">{s.value}%</span>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Experiences Section */}
        <section className="col-span-1 md:col-span-6 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-[#091426]">
              {language === 'ko' ? '최근 경험' : 'Recent Experiences'}
            </h2>
            <span className="text-xs text-[#64748B] font-medium">
              {language === 'ko' ? `총 ${experiences.length}개 기록됨` : `${experiences.length} total logs`}
            </span>
          </div>

          {/* Experience Cards */}
          <div className="flex flex-col gap-3.5">
            {recentList.map((exp) => (
              <div
                key={exp.id}
                onClick={() => setSelectedExp(exp)}
                className="bg-white rounded-xl card-shadow p-5 border border-[#c5c6cd]/50 hover:shadow-md transition-all duration-200 cursor-pointer group"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-base font-bold text-[#1e293b] group-hover:text-[#006c49] transition-colors flex items-center gap-1.5">
                    {language === 'ko' ? exp.titleKo : exp.titleEn}
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#006c49]" />
                  </h3>
                  <span className="text-xs text-[#75777d] font-medium px-2 py-0.5 rounded-md bg-[#eff4ff]">
                    {exp.date}
                  </span>
                </div>
                <p className="text-sm text-[#45474c] mb-3 line-clamp-2 leading-relaxed">
                  {language === 'ko' ? exp.excerptKo : exp.excerptEn}
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  {(language === 'ko' ? exp.tagsKo : exp.tagsEn).map((tag, idx) => (
                    <span
                      key={idx}
                      className="emerald-tag px-2.5 py-0.5 rounded-md text-xs font-semibold flex items-center gap-1"
                    >
                      {getTagIcon(tag)}
                      <span>#{tag}</span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* View All Experiences Button */}
          <button
            id="view-all-experiences-btn"
            onClick={() => setShowAllModal(true)}
            className="w-full py-3 rounded-xl border border-[#c5c6cd] text-[#1e293b] font-semibold text-sm hover:bg-[#eff4ff] hover:border-[#1e293b] transition-all duration-150 shadow-xs flex items-center justify-center gap-2"
          >
            <span>{language === 'ko' ? '모든 경험 보기' : 'View All Experiences'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </section>
      </div>

      {/* Floating Action Button (+) */}
      <button
        id="fab-add-experience-btn"
        aria-label="Add Experience"
        onClick={onOpenNewLog}
        className="fixed bottom-20 md:bottom-8 right-4 md:right-12 w-14 h-14 bg-[#10B981] hover:bg-[#006c49] text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 z-40 focus:outline-hidden"
      >
        <Plus className="w-7 h-7 stroke-[2.5]" />
      </button>

      {/* Modal: View All Experiences */}
      {showAllModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-[#f8f9ff]">
              <div>
                <h3 className="text-lg font-bold text-[#091426]">
                  {language === 'ko' ? '경험 아카이브 전체 목록' : 'All Logged Experiences'}
                </h3>
                <p className="text-xs text-slate-500">
                  {language === 'ko' ? '누적된 모든 경험과 AI 분석 역량 태그' : 'Complete history of your analyzed experience logs'}
                </p>
              </div>
              <button
                onClick={() => setShowAllModal(false)}
                className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4 flex-1">
              {experiences.map((exp) => (
                <div
                  key={exp.id}
                  onClick={() => setSelectedExp(exp)}
                  className="p-4 rounded-xl border border-slate-200 hover:border-[#10B981] hover:bg-[#f8f9ff] transition-all cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-1.5">
                    <h4 className="font-bold text-sm text-[#1e293b]">
                      {language === 'ko' ? exp.titleKo : exp.titleEn}
                    </h4>
                    <span className="text-xs text-slate-500 font-medium">{exp.date}</span>
                  </div>
                  <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                    {language === 'ko' ? exp.excerptKo : exp.excerptEn}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {(language === 'ko' ? exp.tagsKo : exp.tagsEn).map((t, idx) => (
                      <span key={idx} className="emerald-tag text-[11px] px-2 py-0.5 rounded-md font-semibold">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-slate-100 bg-[#f8f9ff] flex justify-between items-center">
              <button
                onClick={() => {
                  setShowAllModal(false);
                  setActiveTab('analysis');
                }}
                className="btn-emerald px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                {language === 'ko' ? '새 경험 분석 추가' : 'Log New Experience'}
              </button>
              <button
                onClick={() => setShowAllModal(false)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-200"
              >
                {language === 'ko' ? '닫기' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Single Experience Detail */}
      {selectedExp && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex justify-between items-start bg-[#f8f9ff]">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-slate-500 px-2 py-0.5 rounded-md bg-slate-200">
                    {selectedExp.date}
                  </span>
                  <span className="text-xs font-semibold text-[#006c49] bg-[#10B981]/15 px-2 py-0.5 rounded-md">
                    AI Analyzed
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#091426]">
                  {language === 'ko' ? selectedExp.titleKo : selectedExp.titleEn}
                </h3>
              </div>
              <button
                onClick={() => setSelectedExp(null)}
                className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4 flex-1 text-sm text-slate-700">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  {language === 'ko' ? '경험 상세 및 회고' : 'Full Reflection Notes'}
                </h4>
                <p className="p-3 bg-[#f8f9ff] rounded-xl border border-slate-200 leading-relaxed">
                  {selectedExp.fullNotes || (language === 'ko' ? selectedExp.excerptKo : selectedExp.excerptEn)}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  {language === 'ko' ? '추출된 핵심 역량' : 'Extracted Competencies'}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(language === 'ko' ? selectedExp.competenciesKo : selectedExp.competenciesEn).map((c, i) => (
                    <span key={i} className="emerald-tag px-3 py-1 rounded-full text-xs font-bold">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  {language === 'ko' ? '성장 포인트 및 시사점' : 'Growth Takeaways'}
                </h4>
                <ul className="space-y-2">
                  {(language === 'ko' ? selectedExp.takeawaysKo : selectedExp.takeawaysEn).map((takeaway, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 bg-[#f8f9ff] flex justify-end">
              <button
                onClick={() => setSelectedExp(null)}
                className="px-4 py-2 rounded-lg text-xs font-bold bg-[#1e293b] text-white hover:bg-slate-800"
              >
                {language === 'ko' ? '확인' : 'OK'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
