import React from 'react';
import { NavTab, Language } from '../types';
import { Home, BarChart3, BrainCircuit, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  language: Language;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  setActiveTab,
  language,
}) => {
  const tabs: { id: NavTab; labelKo: string; labelEn: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'home', labelKo: '홈', labelEn: 'Home', icon: Home },
    { id: 'analysis', labelKo: '분석', labelEn: 'Analysis', icon: BarChart3 },
    { id: 'matching', labelKo: '매칭', labelEn: 'Matching', icon: BrainCircuit },
    { id: 'profile', labelKo: '프로필', labelEn: 'Profile', icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-[#f8f9ff]/95 backdrop-blur-md border-t border-[#c5c6cd]/70 shadow-lg pb-safe">
      <div className="flex justify-around items-center h-16 px-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              id={`mobile-nav-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center w-1/4 h-full transition-all duration-200 ${
                isActive
                  ? 'text-[#006c49] bg-[#6cf8bb]/15 rounded-xl px-2 py-1 my-1 scale-105 font-bold shadow-xs'
                  : 'text-[#45474c] hover:text-[#006c49]'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px] text-[#006c49]' : 'stroke-[1.8px]'}`} />
              <span className="text-[11px] mt-1 leading-none">
                {language === 'ko' ? tab.labelKo : tab.labelEn}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
