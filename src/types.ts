export type Language = 'ko' | 'en';

export type NavTab = 'home' | 'analysis' | 'matching' | 'profile';

export interface SkillScore {
  key: string;
  nameKo: string;
  nameEn: string;
  value: number; // 0 to 100
  fullMark: number;
}

export interface ExperienceItem {
  id: string;
  titleKo: string;
  titleEn: string;
  date: string; // e.g. "Oct 2023" or "2023.10"
  excerptKo: string;
  excerptEn: string;
  fullNotes?: string;
  tagsKo: string[];
  tagsEn: string[];
  competenciesKo: string[];
  competenciesEn: string[];
  takeawaysKo: string[];
  takeawaysEn: string[];
  scoreImpact?: { [skillKey: string]: number };
  bookmarked?: boolean;
}

export interface MatrixRow {
  companyValueKo: string;
  companyValueEn: string;
  matchedExperienceKo: string;
  matchedExperienceEn: string;
  matchRate: number; // e.g. 92
  rationaleKo?: string;
  rationaleEn?: string;
}

export interface RecommendedStory {
  id: string;
  tagKo: string;
  tagEn: string;
  titleKo: string;
  titleEn: string;
  descriptionKo: string;
  descriptionEn: string;
  draftBulletKo: string;
  draftBulletEn: string;
  starStructureKo?: {
    situation: string;
    task: string;
    action: string;
    result: string;
  };
  starStructureEn?: {
    situation: string;
    task: string;
    action: string;
    result: string;
  };
  bookmarked?: boolean;
}

export interface DevelopmentActivity {
  id: string;
  categoryKo: string;
  categoryEn: string;
  titleKo: string;
  titleEn: string;
  descriptionKo: string;
  descriptionEn: string;
  targetSkillKo: string;
  targetSkillEn: string;
  duration: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface MatchingResult {
  companyName: string;
  coreValues: string;
  aiInsightKo: string;
  aiInsightEn: string;
  matrix: MatrixRow[];
  recommendedStories: RecommendedStory[];
  developmentActivities?: DevelopmentActivity[];
}

export interface AnalysisResult {
  titleKo: string;
  titleEn: string;
  competenciesKo: string[];
  competenciesEn: string[];
  takeawaysKo: string[];
  takeawaysEn: string[];
  tagsKo: string[];
  tagsEn: string[];
  scoreImpact: { [skillKey: string]: number };
}
