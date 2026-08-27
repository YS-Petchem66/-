import React, { useState } from 'react';
import { NavTab, Language } from '../types';
import { Home, BarChart3, BrainCircuit, User, Bell, Sparkles, Check } from 'lucide-react';

interface HeaderProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  notificationCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  language,
  setLanguage,
  notificationCount
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const avatarUrl =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBqUkNXNIYTD_bpe37KiuT959NjmATwJ04ePNE2OPo1tRPOIf6haKmfMuKTBv3HQcY4M2ogsU5s3-dhzbrPVcOZqszfdu6O6d9ggtFTYTjwMlEprAVoE_sA55oBWcUgMVwqEz0b6tPlji1D_7h7zWDp7Qkve4rHyQVgGvRSnl6Xn9wImIVmd4ZTV0r5SoW6H3io_Iyiga29cW9C1dduCzPYs8HVdGjP6wCUEqjFHmJWfaogdzGkq8LN';

  const navItems: { id: NavTab; labelKo: string; labelEn: string; icon: React.ReactNode }[] = [
    { id: 'home', labelKo: '홈', labelEn: 'Home', icon: <Home className="w-5 h-5" /> },
    { id: 'analysis', labelKo: '분석', labelEn: 'Analysis', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'matching', labelKo: '매칭', labelEn: 'Matching', icon: <BrainCircuit className="w-5 h-5" /> },
    { id: 'profile', labelKo: '프로필', labelEn: 'Profile', icon: <User className="w-5 h-5" /> },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#f8f9ff]/90 backdrop-blur-md border-b border-[#c5c6cd]/50">
      <div className="flex justify-between items-center px-4 md:px-12 h-16 w-full max-w-[1280px] mx-auto">
        {/* Left: Avatar + Title */}
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => setActiveTab('home')}
        >
          <img
            src={avatarUrl}
            alt="Alex User Avatar"
            referrerPolicy="no-referrer"
            className="w-10 h-10 rounded-full object-cover border border-[#c5c6cd] shadow-xs group-hover:scale-105 transition-transform"
          />
          <h1 className="text-xl font-bold text-[#091426] tracking-tight">
            {language === 'ko' ? '경험 성장 노트' : 'Growth Note'}
          </h1>
        </div>

        {/* Center / Right: Desktop Nav Tabs */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-3 bg-white/70 px-3 py-1.5 rounded-xl border border-[#c5c6cd]/40 shadow-xs">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`desktop-nav-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all duration-150 ${
                  isActive
                    ? 'bg-[#1e293b] text-white shadow-xs'
                    : 'text-[#45474c] hover:bg-[#eff4ff] hover:text-[#091426]'
                }`}
              >
                {item.icon}
                <span>{language === 'ko' ? item.labelKo : item.labelEn}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: Language switch + Notification Bell */}
        <div className="flex items-center gap-2">
          {/* Language Toggle */}
          <button
            id="lang-toggle-btn"
            onClick={() => setLanguage(language === 'ko' ? 'en' : 'ko')}
            className="px-2.5 py-1 rounded-lg text-xs font-bold border border-[#c5c6cd] bg-white text-[#1e293b] hover:bg-[#eff4ff] transition-colors"
            title="Switch Language"
          >
            {language === 'ko' ? 'EN' : '한국어'}
          </button>

          {/* Notifications Button */}
          <div className="relative">
            <button
              id="notification-btn"
              aria-label="Notifications"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative text-[#0b1c30] hover:bg-[#eff4ff] transition-colors rounded-full p-2"
            >
              <Bell className="w-5 h-5" />
              {notificationCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#10B981] rounded-full ring-2 ring-white animate-pulse" />
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-[#c5c6cd]/60 p-4 z-50 animate-fade-in">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="font-bold text-sm text-[#091426]">
                    {language === 'ko' ? '알림 및 업데이트' : 'Notifications & Updates'}
                  </span>
                  <span className="text-xs text-[#10B981] font-semibold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> AI Ready
                  </span>
                </div>
                <div className="space-y-3 mt-3 max-h-60 overflow-y-auto text-xs">
                  <div className="p-2.5 rounded-lg bg-[#f8f9ff] border-l-3 border-[#10B981]">
                    <p className="font-semibold text-slate-800">
                      {language === 'ko'
                        ? '역량 업데이트 완료'
                        : 'Competencies Updated'}
                    </p>
                    <p className="text-slate-500 mt-0.5">
                      {language === 'ko'
                        ? '최근 프로젝트 리뷰를 통해 3개의 주요 역량이 업데이트되었습니다.'
                        : '3 key skills updated from your latest project review.'}
                    </p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#f8f9ff] border-l-3 border-blue-500">
                    <p className="font-semibold text-slate-800">
                      {language === 'ko' ? '기업 매칭 분석 준비' : 'Target Fit Ready'}
                    </p>
                    <p className="text-slate-500 mt-0.5">
                      {language === 'ko'
                        ? '글로벌 테크놀로지 기업 인재상 매칭도가 92%로 산출되었습니다.'
                        : 'Calculated 92% fit for Global Tech Inc.'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
