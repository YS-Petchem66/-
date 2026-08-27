import React, { useState, useEffect } from 'react';
import { NavTab, Language, SkillScore, ExperienceItem } from './types';
import { INITIAL_SKILLS, INITIAL_EXPERIENCES } from './data/initialData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/HomeScreen';
import { AnalysisScreen } from './components/AnalysisScreen';
import { MatchingScreen } from './components/MatchingScreen';
import { ProfileScreen } from './components/ProfileScreen';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [language, setLanguage] = useState<Language>('ko');

  // Persistent state for experiences and skill scores
  const [experiences, setExperiences] = useState<ExperienceItem[]>(() => {
    const saved = localStorage.getItem('gn_experiences');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return INITIAL_EXPERIENCES;
  });

  const [skills, setSkills] = useState<SkillScore[]>(() => {
    const saved = localStorage.getItem('gn_skills');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return INITIAL_SKILLS;
  });

  useEffect(() => {
    localStorage.setItem('gn_experiences', JSON.stringify(experiences));
  }, [experiences]);

  useEffect(() => {
    localStorage.setItem('gn_skills', JSON.stringify(skills));
  }, [skills]);

  const handleSaveExperience = (newExp: ExperienceItem) => {
    setExperiences((prev) => [newExp, ...prev]);
  };

  const handleUpdateSkills = (impact: { [key: string]: number }) => {
    setSkills((prevSkills) =>
      prevSkills.map((s) => {
        if (impact[s.key] !== undefined) {
          // Weighted moving average
          const newVal = Math.min(100, Math.round(s.value * 0.7 + impact[s.key] * 0.3));
          return { ...s, value: newVal };
        }
        return s;
      })
    );
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col font-sans">
      {/* Top App Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
        setLanguage={setLanguage}
        notificationCount={2}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomeScreen
            skills={skills}
            experiences={experiences}
            language={language}
            setActiveTab={setActiveTab}
            onOpenNewLog={() => setActiveTab('analysis')}
          />
        )}

        {activeTab === 'analysis' && (
          <AnalysisScreen
            language={language}
            onSaveExperience={handleSaveExperience}
            onUpdateSkills={handleUpdateSkills}
          />
        )}

        {activeTab === 'matching' && (
          <MatchingScreen
            language={language}
            experiences={experiences}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileScreen
            language={language}
            skills={skills}
            experiences={experiences}
          />
        )}
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <BottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
      />
    </div>
  );
}
