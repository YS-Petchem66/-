import React, { useState } from 'react';
import { Language, ExperienceItem, SkillScore } from '../types';
import { User, Award, FileText, Download, CheckCircle2, Star, Sparkles, Mail, Briefcase, Calendar, TrendingDown, Lightbulb } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ProfileScreenProps {
  language: Language;
  skills: SkillScore[];
  experiences: ExperienceItem[];
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  language,
  skills,
  experiences
}) => {
  const [downloaded, setDownloaded] = useState(false);

  const avatarUrl =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBqUkNXNIYTD_bpe37KiuT959NjmATwJ04ePNE2OPo1tRPOIf6haKmfMuKTBv3HQcY4M2ogsU5s3-dhzbrPVcOZqszfdu6O6d9ggtFTYTjwMlEprAVoE_sA55oBWcUgMVwqEz0b6tPlji1D_7h7zWDp7Qkve4rHyQVgGvRSnl6Xn9wImIVmd4ZTV0r5SoW6H3io_Iyiga29cW9C1dduCzPYs8HVdGjP6wCUEqjFHmJWfaogdzGkq8LN';

  const handleExportData = () => {
    const dataStr = JSON.stringify({ profile: 'Alex', skills, experiences }, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `GrowthNote_Alex_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);

    setDownloaded(true);
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.6 }
    });
    setTimeout(() => setDownloaded(false), 3000);
  };

  const topSkills = [...skills].sort((a, b) => b.value - a.value).slice(0, 3);
  const weakSkills = [...skills].sort((a, b) => a.value - b.value).slice(0, 2);

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 md:px-12 pt-6 pb-28 md:pb-16">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column: User Card */}
        <section className="col-span-1 md:col-span-4 flex flex-col gap-6">
          <div className="bg-white rounded-xl p-6 card-shadow border border-[#c5c6cd]/50 text-center flex flex-col items-center">
            <div className="relative mb-3">
              <img
                src={avatarUrl}
                alt="Alex User Avatar"
                referrerPolicy="no-referrer"
                className="w-20 h-20 rounded-full object-cover border-2 border-[#10B981] shadow-md"
              />
              <span className="absolute bottom-0 right-0 w-5 h-5 bg-[#10B981] rounded-full ring-2 ring-white flex items-center justify-center text-white text-[10px] font-bold">
                ✓
              </span>
            </div>

            <h3 className="text-xl font-bold text-[#091426]">Alex Kim</h3>
            <p className="text-xs text-[#006c49] font-bold mt-0.5">
              {language === 'ko' ? '시니어 프로덕트 엔지니어 & 테크 리드' : 'Senior Product Engineer & Tech Lead'}
            </p>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed max-w-[240px]">
              {language === 'ko'
                ? 'AI 시스템 아키텍처 및 크로스 펑셔널 팀 리딩에 강점을 지닌 엔지니어'
                : 'Passionate about distributed system resilience and cross-functional team leadership.'}
            </p>

            <div className="w-full mt-5 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2 text-center text-xs">
              <div className="p-2.5 rounded-lg bg-[#f8f9ff]">
                <span className="text-slate-400 block text-[11px]">
                  {language === 'ko' ? '기록된 경험' : 'Total Logs'}
                </span>
                <span className="text-base font-bold text-[#091426]">{experiences.length}개</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#f8f9ff]">
                <span className="text-slate-400 block text-[11px]">
                  {language === 'ko' ? '성장 지수' : 'Growth Index'}
                </span>
                <span className="text-base font-bold text-[#10B981]">Top 5%</span>
              </div>
            </div>

            <button
              onClick={handleExportData}
              className="w-full mt-4 btn-emerald py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>
                {downloaded
                  ? language === 'ko'
                    ? '내보내기 완료!'
                    : 'Exported!'
                  : language === 'ko'
                  ? '커리어 성장 데이터 내보내기'
                  : 'Export Career Data (JSON)'}
              </span>
            </button>
          </div>

          {/* Core Strengths Card */}
          <div className="bg-white rounded-xl p-6 card-shadow border border-[#c5c6cd]/50">
            <h4 className="text-sm font-bold text-[#091426] mb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-[#10B981]" />
              {language === 'ko' ? '상위 강점 역량' : 'Top Core Strengths'}
            </h4>
            <div className="space-y-3">
              {topSkills.map((s, idx) => (
                <div key={s.key}>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-[#1e293b]">
                      {idx + 1}. {language === 'ko' ? s.nameKo : s.nameEn}
                    </span>
                    <span className="text-[#006c49] font-bold">{s.value}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#10B981] rounded-full transition-all duration-500"
                      style={{ width: `${s.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weak Competencies Card */}
          <div className="bg-white rounded-xl p-6 card-shadow border border-[#c5c6cd]/50">
            <h4 className="text-sm font-bold text-[#091426] mb-3 flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-[#f97316]" />
              {language === 'ko' ? '성장 기회 역량' : 'Growth Opportunity Areas'}
            </h4>
            <div className="space-y-3">
              {weakSkills.map((s, idx) => (
                <div key={s.key}>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-[#1e293b]">
                      {language === 'ko' ? s.nameKo : s.nameEn}
                    </span>
                    <span className="text-[#f97316] font-bold">{s.value}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#f97316] rounded-full transition-all duration-500"
                      style={{ width: `${s.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-3 pt-3 border-t border-slate-100 flex items-center gap-1">
              <Lightbulb className="w-3.5 h-3.5 text-[#f97316]" />
              {language === 'ko' ? '매칭 화면에서 보완 활동을 추천받으세요' : 'Check Matching screen for development recommendations'}
            </p>
          </div>
        </section>

        {/* Right Column: Career Milestone Timeline */}
        <section className="col-span-1 md:col-span-8 flex flex-col gap-6">
          <div className="bg-white rounded-xl p-6 card-shadow border border-[#c5c6cd]/50">
            <div className="flex justify-between items-center mb-5 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-[#091426]">
                  {language === 'ko' ? '경험 기록 연대기' : 'Experience Chronicle'}
                </h3>
                <p className="text-xs text-slate-500">
                  {language === 'ko' ? '시간 순으로 축적된 역량 성장 발자취' : 'Timeline of verified career reflections and projects'}
                </p>
              </div>
              <span className="text-xs font-bold text-[#006c49] bg-[#10B981]/15 px-2.5 py-1 rounded-full">
                {experiences.length} Milestones
              </span>
            </div>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {experiences.map((exp, idx) => (
                <div key={exp.id} className="relative group">
                  {/* Timeline node */}
                  <span className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-white border-2 border-[#10B981] flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                  </span>

                  <div className="bg-[#f8f9ff] p-4 rounded-xl border border-slate-200/80 hover:border-[#10B981] transition-all">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="text-sm font-bold text-[#091426]">
                        {language === 'ko' ? exp.titleKo : exp.titleEn}
                      </h4>
                      <span className="text-xs font-medium text-slate-500">{exp.date}</span>
                    </div>

                    <p className="text-xs text-slate-600 mb-2.5 leading-relaxed">
                      {language === 'ko' ? exp.excerptKo : exp.excerptEn}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {(language === 'ko' ? exp.competenciesKo : exp.competenciesEn).map((c, i) => (
                        <span key={i} className="emerald-tag text-[10px] font-bold px-2 py-0.5 rounded-md">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
