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

// 기능 1: 드래프트 관리
export interface SavedDraft {
  id: string;
  companyName: string;
  storyId: string;
  titleKo: string;
  titleEn: string;
  bulletKo: string;
  bulletEn: string;
  createdAt: string;
  updatedAt: string;
}

// 기능 2: 역량 성장 트렌드
export interface SkillTrendData {
  skillKey: string;
  date: string;
  value: number;
}

export interface SkillGrowthTrend {
  skillKey: string;
  nameKo: string;
  nameEn: string;
  trendData: SkillTrendData[];
  currentValue: number;
  growthRate: number; // 기간 내 성장률
}

// 기능 3: 보완 활동 진행도
export interface ActivityProgress {
  id: string;
  activityId: string;
  status: 'not_started' | 'in_progress' | 'completed';
  progressPercent: number;
  startedAt?: string;
  completedAt?: string;
}

// 기능 4: 다중 기업 매칭 비교
export interface CompanyMatchingSummary {
  companyName: string;
  overallMatchRate: number;
  strongMatches: number; // 70% 이상 매칭 경험 수
  developmentNeeds: number; // 필요한 보완 활동 수
}

// 기능 5: 강점 활용 가이드
export interface StrengthGuidance {
  strengthKo: string;
  strengthEn: string;
  skillKey: string;
  value: number;
  careerPathsKo: string[];
  careerPathsEn: string[];
  differentiatorKo: string;
  differentiatorEn: string;
}
