import { ExperienceItem, SkillScore, MatchingResult } from '../types';

export const INITIAL_SKILLS: SkillScore[] = [
  { key: 'leadership', nameKo: '리더십', nameEn: 'Leadership', value: 85, fullMark: 100 },
  { key: 'strategy', nameKo: '전략', nameEn: 'Strategy', value: 70, fullMark: 100 },
  { key: 'tech', nameKo: '기술', nameEn: 'Tech', value: 90, fullMark: 100 },
  { key: 'communication', nameKo: '소통', nameEn: 'Communication', value: 75, fullMark: 100 },
  { key: 'design', nameKo: '디자인', nameEn: 'Design', value: 60, fullMark: 100 },
  { key: 'problemSolving', nameKo: '문제 해결', nameEn: 'Problem Solving', value: 95, fullMark: 100 },
];

export const INITIAL_EXPERIENCES: ExperienceItem[] = [
  {
    id: 'exp-1',
    titleKo: 'API 연동 프로젝트',
    titleEn: 'API Integration Project',
    date: 'Oct 2023',
    excerptKo: '백엔드 팀을 이끌어 서드파티 결제 게이트웨이를 성공적으로 연동하고 트랜잭션 지연 시간을 15% 단축했습니다.',
    excerptEn: 'Led the backend team to successfully integrate third-party payment gateways, reducing transaction latency by 15%.',
    fullNotes: '서드파티 결제 게이트웨이(Stripe & 국내 PG사)와의 마이크로서비스 연동 작업. 초기 부하 테스트 중 타임아웃 문제를 비동기 큐와 서킷 브레이커 패턴 도입으로 해결함. 결과적으로 트랜잭션 성공률 99.98% 달성 및 지연 시간 15% 단축.',
    tagsKo: ['문제해결', '기술'],
    tagsEn: ['ProblemSolving', 'Tech'],
    competenciesKo: ['기술 전문성', '아키텍처 설계', '문제 해결'],
    competenciesEn: ['Technical Expertise', 'Architecture Design', 'Problem Solving'],
    takeawaysKo: [
      '대규모 트랜잭션 처리 시 장애 복구 메커니즘의 중요성을 실증함.',
      '서드파티 API 장애 격리를 위한 안정적인 폴백 전략 구축.'
    ],
    takeawaysEn: [
      'Validated the critical role of resilience patterns under high load.',
      'Established reliable fallback strategies for third-party service outages.'
    ],
    scoreImpact: { tech: 90, problemSolving: 95 }
  },
  {
    id: 'exp-2',
    titleKo: '팀 리드 워크숍',
    titleEn: 'Team Lead Workshop',
    date: 'Sep 2023',
    excerptKo: '애자일 방법론과 교차 기능 팀 커뮤니케이션에 초점을 맞춘 2일간의 워크숍을 진행했습니다.',
    excerptEn: 'Facilitated a 2-day workshop focusing on agile methodologies and cross-functional team communication.',
    fullNotes: '디자인팀, 기획팀, 엔지니어링팀 총 24명이 참가한 2일 집중 스프린트 기획 워크숍. 팀 간 사일로 현상을 완화하기 위해 유저 스토리 매핑과 비동기 피드백 루프 템플릿을 개발하여 전사에 배포함.',
    tagsKo: ['리더십', '소통'],
    tagsEn: ['Leadership', 'Communication'],
    competenciesKo: ['리더십', '조직 소통', '애자일 코칭'],
    competenciesEn: ['Leadership', 'Organizational Communication', 'Agile Facilitation'],
    takeawaysKo: [
      '부서 간 이해관계 조율을 위한 실시간 피드백 캔버스 설계 능력 향상.',
      '스프린트 주기 단축과 팀 만족도 28% 상승 유도.'
    ],
    takeawaysEn: [
      'Enhanced ability to align cross-functional stakeholders through structured canvases.',
      'Drove 28% increase in sprint cycle agility and team satisfaction.'
    ],
    scoreImpact: { leadership: 85, communication: 75 }
  },
  {
    id: 'exp-3',
    titleKo: '베를린 해외 인턴십',
    titleEn: 'Overseas Internship in Berlin',
    date: 'Jun 2023',
    excerptKo: '현지 독일 개발자들과 한국 본사 팀 간의 조율을 통해 복잡한 프로젝트 요구 사항을 해결했습니다.',
    excerptEn: 'Navigated complex project requirements while coordinating between local German developers and the Korean HQ team.',
    fullNotes: '베를린 현지 모빌리티 스타트업에서의 6개월 인턴십. 한국 본사와의 시차와 문화적 차이를 극복하고 글로벌 데이터 파이프라인 마이그레이션 프로젝트를 주도적으로 조율하여 납기 내 완수.',
    tagsKo: ['소통', '전략'],
    tagsEn: ['Communication', 'Strategy'],
    competenciesKo: ['글로벌 마인드', '문화 간 커뮤니케이션', '다국적 협업'],
    competenciesEn: ['Global Mindset', 'Cross-cultural Communication', 'Multinational Collaboration'],
    takeawaysKo: [
      '다양한 문화적 배경을 가진 팀원들과의 비동기 커뮤니케이션 프로토콜 확립.',
      '글로벌 시장의 규제 및 엔지니어링 표준에 대한 깊은 이해 습득.'
    ],
    takeawaysEn: [
      'Established resilient asynchronous communication protocols across time zones.',
      'Gained deep understanding of global market regulations and engineering standards.'
    ],
    scoreImpact: { communication: 80, strategy: 70 }
  },
  {
    id: 'exp-4',
    titleKo: 'AI 해커톤 - 1위',
    titleEn: 'AI Hackathon - 1st Place',
    date: 'Apr 2023',
    excerptKo: '촉박한 마감 기한 내에 처리 시간을 40% 단축하는 혁신적인 데이터 파싱 접근 방식을 제안하고 구현했습니다.',
    excerptEn: 'Proposed and implemented an unconventional approach to data parsing that reduced processing time by 40% under tight deadlines.',
    fullNotes: '전국 대학/기업 연합 AI 해커톤에서 실시간 멀티모달 요약 엔진을 개발하여 1위 대상 수상. 메모리 병목을 해소하는 스트리밍 정렬 알고리즘을 제안하여 벤치마크 처리 속도를 40% 향상시킴.',
    tagsKo: ['문제해결', '기술'],
    tagsEn: ['ProblemSolving', 'Tech'],
    competenciesKo: ['혁신 및 창의성', '알고리즘 최적화', '신기술 탐색'],
    competenciesEn: ['Innovation & Creativity', 'Algorithm Optimization', 'Rapid Prototyping'],
    takeawaysKo: [
      '제한된 자원 환경에서 창의적인 알고리즘 설계를 통해 극적인 성능 개선 달성.',
      '아이디어 구체화부터 피칭까지 48시간 내 완결하는 실행력 증명.'
    ],
    takeawaysEn: [
      'Achieved dramatic latency reduction via unconventional parsing architecture.',
      'Demonstrated high execution speed delivering working prototype within 48 hours.'
    ],
    scoreImpact: { tech: 95, problemSolving: 98 }
  }
];

export const INITIAL_MATCHING_RESULT: MatchingResult = {
  companyName: '한국가스공사 (Korea Gas Corporation)',
  coreValues: '안정성, 기술 혁신, 사회 책임 (Stability, Technology Innovation, Social Responsibility)',
  aiInsightKo: "AI 인사이트 - Alex님의 경험은 '기술 혁신'과 '팀 리더십' 항목에서 강한 일치도를 보입니다. 해커톤 프로젝트와 팀 워크숍 경험에 초점을 맞추어 이야기를 구성해 보세요.",
  aiInsightEn: 'AI Insight - Your experiences show strong alignment with "Technology Innovation" and "Team Leadership". Consider focusing on your Hackathon project and workshop facilitation to strengthen your narrative.',
  matrix: [
    {
      companyValueKo: '기술 혁신',
      companyValueEn: 'Technology Innovation',
      matchedExperienceKo: '베를린 해외 인턴십',
      matchedExperienceEn: 'Overseas Internship in Berlin',
      matchRate: 90,
      rationaleKo: '촉박한 기한 내에 창의적인 알고리즘으로 40% 성능 개선을 달성한 사례가 한국가스공사의 기술 혁신 인재상과 직결됩니다.',
      rationaleEn: 'Innovative algorithm optimization achieving 40% performance improvement aligns perfectly with Korea Gas Corporation\'s technology innovation values.'
    },
    {
      companyValueKo: '팀 리더십',
      companyValueEn: 'Team Leadership',
      matchedExperienceKo: '팀 리드 워크숍',
      matchedExperienceEn: 'Team Lead Workshop',
      matchRate: 88,
      rationaleKo: '24명 규모 팀의 애자일 워크숍을 주도하여 팀 만족도 28% 상승을 달성한 리더십 경험이 한국가스공사의 팀워크 중심 조직문화와 부합합니다.',
      rationaleEn: 'Leadership experience driving 28% team satisfaction improvement through agile workshops demonstrates your organizational development capabilities.'
    }
  ],
  recommendedStories: [
    {
      id: 'story-1',
      tagKo: '기술 혁신',
      tagEn: 'Technology Innovation',
      titleKo: '해커톤 알고리즘 최적화를 통한 성능 개선',
      titleEn: 'Performance Optimization Through Innovative Algorithm Design',
      descriptionKo: '촉박한 마감 기한 내에 처리 시간을 40% 단축하는 혁신적인 데이터 파싱 접근 방식을 제안하고 구현했습니다.',
      descriptionEn: 'Proposed and implemented an unconventional approach to data parsing that reduced processing time by 40% under tight deadlines.',
      draftBulletKo: '• 대용량 스트리밍 데이터의 메모리 오버헤드를 줄이기 위해 독자적인 파이프라인 정렬 기법을 설계·적용하여 처리 지연 시간을 기존 대비 40% 단축하고 해커톤 1위 대상 수상.',
      draftBulletEn: '• Architected an unconventional in-memory streaming sort pipeline during 48-hour hackathon, slashing latency by 40% and winning 1st Place overall.',
      starStructureKo: {
        situation: '48시간 AI 해커톤 중 실시간 멀티모달 데이터 처리량이 급증하여 메모리 버퍼 초과 발생.',
        task: '기존 정렬 라이브러리의 연산 비용을 획기적으로 낮추어 실시간 응답성을 확보해야 함.',
        action: '일반적인 정적 배열 버퍼 대신 청크 단위 경량 스트림 인덱싱 방식을 제안 및 직접 구현.',
        result: '전체 데이터 파싱 시간 40% 단축 달성, 심사위원 전원 일치로 1위 대상 수상.'
      },
      starStructureEn: {
        situation: 'Memory buffer threshold exceeded under surging multi-modal data streams during 48-hr hackathon.',
        task: 'Dramatically reduce compute cost of sorting routines to maintain sub-second response times.',
        action: 'Designed and deployed chunk-based lightweight stream indexing avoiding heavy heap allocations.',
        result: 'Reduced overall parsing latency by 40%, securing unanimous 1st place award.'
      }
    },
    {
      id: 'story-2',
      tagKo: '팀 리더십',
      tagEn: 'Team Leadership',
      titleKo: '크로스펑셔널 팀 워크숍을 통한 조직 효율성 개선',
      titleEn: 'Organizational Efficiency Improvement Through Team Leadership',
      descriptionKo: '애자일 방법론과 교차 기능 팀 커뮤니케이션에 초점을 맞춘 2일간의 워크숍을 진행했습니다.',
      descriptionEn: 'Facilitated a 2-day workshop focusing on agile methodologies and cross-functional team communication.',
      draftBulletKo: '• 디자인팀, 기획팀, 엔지니어링팀 24명이 참가한 애자일 스프린트 기획 워크숍을 주도하여 팀 간 사일로 현상 완화, 팀 만족도 28% 상승 및 스프린트 효율성 향상을 달성.',
      draftBulletEn: '• Led agile sprint planning workshop with 24 cross-functional participants, resolving team silos, achieving 28% satisfaction increase and improved sprint efficiency.',
      starStructureKo: {
        situation: '디자인팀, 기획팀, 엔지니어링팀 간의 소통 부족과 상이한 용어·기대치로 인한 협업 효율성 저하.',
        task: '부서 간 이해관계를 조율하고 통일된 스프린트 프로세스 수립 필요.',
        action: '유저 스토리 매핑과 비동기 피드백 루프 템플릿을 개발하여 실시간 피드백 캔버스 설계.',
        result: '팀 만족도 28% 상승, 스프린트 주기 단축, 부서 간 오해율 0건으로 통제.'
      },
      starStructureEn: {
        situation: 'Communication gaps and misaligned expectations between design, planning, and engineering teams reduced collaboration efficiency.',
        task: 'Align cross-departmental interests and establish unified sprint processes.',
        action: 'Developed user story mapping and async feedback loop templates with structured feedback canvas.',
        result: '28% increase in team satisfaction, shorter sprint cycles, zero cross-team misunderstandings.'
      }
    }
  ]
};

export const SAMPLE_NOTES_PRESETS = [
  {
    labelKo: 'API 연동 회고',
    labelEn: 'API Integration Review',
    textKo: '오늘 분기별 리뷰 회의를 주도했습니다. 백엔드 팀과 함께 새로운 서드파티 결제 API 연동에 대해 논의했고 단계별 출시 계획을 제안했습니다. 특히 타임아웃 장애를 방지하기 위해 서킷 브레이커와 재시도 큐를 설계하여 시스템 안정성을 15% 개선했습니다.',
    textEn: 'Today I led the quarterly review meeting. We discussed the new third-party payment API integration and I proposed a phased rollout plan with circuit breaker patterns, improving system resilience by 15%.'
  },
  {
    labelKo: '팀 리드 워크숍 진행',
    labelEn: 'Team Lead Workshop',
    textKo: '기획팀과 개발팀 간의 협업 갈등을 해결하기 위해 2일간 애자일 소통 워크숍을 기획하고 퍼실리테이션을 담당했습니다. 서로 다른 용어와 기대치를 맞추기 위한 스프린트 가이드를 만들어 배포했습니다.',
    textEn: 'Facilitated a 2-day cross-functional agile alignment workshop between product and engineering to resolve sprint silos and standardize documentation templates.'
  },
  {
    labelKo: '해외 지사 협업 회고',
    labelEn: 'Global Cross-Team Sync',
    textKo: '베를린 개발팀과의 프로젝트에서 문화적 차이로 발생하던 커뮤니케이션 오해를 해소하기 위해 비동기 PR 리뷰 룰과 영문 RFC 문서 템플릿을 도입했습니다. 결과적으로 피드백 루프가 2일에서 4시간으로 단축되었습니다.',
    textEn: 'Introduced asynchronous RFC templates and PR guidelines for the Berlin and Seoul teams, cutting cross-timezone code review turnarounds from 2 days to 4 hours.'
  },
  {
    labelKo: '대규모 트래픽 장애 해결',
    labelEn: 'High Traffic Incident Postmortem',
    textKo: '프로모션 이벤트 기간 동안 DB 커넥션 풀 고갈로 인한 서비스 지연 발생. 즉시 Read Replica 라우팅을 활성화하고 Redis 캐시 레이어를 튜닝하여 10분 만에 P99 레이턴시를 450ms에서 65ms로 복구했습니다.',
    textEn: 'Resolved database connection pool exhaustion during a flash promotion by dynamically routing read replicas and tuning Redis cache layers, dropping P99 latency from 450ms to 65ms.'
  }
];

export const COMPANY_PRESETS = [
  {
    name: '한국가스공사 (Korea Gas Corporation)',
    valuesKo: '안정성과 신뢰, 기술 혁신, 사회 책임, 팀워크',
    valuesEn: 'Stability & Trust, Technology Innovation, Social Responsibility, Teamwork'
  },
  {
    name: '남동발전 (Dangjin Thermal Power)',
    valuesKo: '효율성과 혁신, 데이터 기반 의사결정, 에너지 전환, 안전 최우선',
    valuesEn: 'Efficiency & Innovation, Data-driven Decision Making, Energy Transition, Safety First'
  },
  {
    name: '한국전력 (Korea Electric Power Corporation)',
    valuesKo: '신뢰성, 기술 리더십, 지속가능성, 고객 중심',
    valuesEn: 'Reliability, Technical Leadership, Sustainability, Customer Focus'
  }
];

export const WEAK_SKILLS = [
  { key: 'design', nameKo: '디자인', nameEn: 'Design', value: 60, fullMark: 100 },
  { key: 'strategy', nameKo: '전략', nameEn: 'Strategy', value: 70, fullMark: 100 }
];

export const DEVELOPMENT_ACTIVITIES: import('../types').DevelopmentActivity[] = [
  {
    id: 'dev-1',
    categoryKo: '온라인 과정',
    categoryEn: 'Online Course',
    titleKo: 'UI/UX 디자인 핵심 가이드',
    titleEn: 'Essential UI/UX Design Guide',
    descriptionKo: '사용자 경험 설계의 기초부터 고급 프로토타이핑까지 배우는 5주 집중 과정. Figma를 활용한 실전 프로젝트 경험이 포함됩니다.',
    descriptionEn: 'A 5-week intensive course covering UX fundamentals to advanced prototyping with hands-on Figma projects.',
    targetSkillKo: '디자인',
    targetSkillEn: 'Design',
    duration: '5주',
    difficulty: 'medium'
  },
  {
    id: 'dev-2',
    categoryKo: '세미나/워크숍',
    categoryEn: 'Seminar/Workshop',
    titleKo: '디자인 씽킹과 사용자 연구',
    titleEn: 'Design Thinking & User Research',
    descriptionKo: '기업 입장에서 고객의 니즈를 파악하고 창의적인 솔루션을 만드는 과정을 체험합니다. 실제 사례 분석을 통해 전략적 사고를 강화합니다.',
    descriptionEn: 'Interactive workshop exploring customer empathy mapping and design-led problem solving with real industry case studies.',
    targetSkillKo: '전략',
    targetSkillEn: 'Strategy',
    duration: '2일',
    difficulty: 'medium'
  },
  {
    id: 'dev-3',
    categoryKo: '프로젝트 기반 학습',
    categoryEn: 'Project-based Learning',
    titleKo: '웹 서비스 리디자인 프로젝트',
    titleEn: 'Web Service Redesign Project',
    descriptionKo: '낡은 웹서비스의 UI를 분석하고 현대적 디자인 트렌드를 적용하여 완전히 재설계하는 포트폴리오 프로젝트.',
    descriptionEn: 'Apply modern design trends to redesign a legacy web service, building a portfolio case study.',
    targetSkillKo: '디자인',
    targetSkillEn: 'Design',
    duration: '3주',
    difficulty: 'hard'
  },
  {
    id: 'dev-4',
    categoryKo: '커뮤니티 참여',
    categoryEn: 'Community Involvement',
    titleKo: 'UXPA 코리아 정기 밋업 참석',
    titleEn: 'UXPA Korea Monthly Meetup',
    descriptionKo: '국내 UX 전문가들의 경험담과 최신 트렌드를 배울 수 있는 월간 커뮤니티 행사. 네트워킹 기회도 풍부합니다.',
    descriptionEn: 'Monthly UX professional community meetup featuring industry experts, trends, and networking opportunities.',
    targetSkillKo: '디자인',
    targetSkillEn: 'Design',
    duration: '월간',
    difficulty: 'easy'
  }
];

export const INITIAL_MATCHING_RESULT_WITH_DEV = {
  ...INITIAL_MATCHING_RESULT,
  developmentActivities: DEVELOPMENT_ACTIVITIES
};

// 기능 1: 저장된 자기소개서 초안
export const INITIAL_SAVED_DRAFTS: import('../types').SavedDraft[] = [
  {
    id: 'draft-1',
    companyName: '글로벌 테크놀로지 (Global Tech Inc.)',
    storyId: 'story-1',
    titleKo: '베를린 인턴십 중 문화 간 커뮤니케이션 적응',
    titleEn: 'Adapting to cross-cultural communication during Berlin Internship',
    bulletKo: '• 독일-한국 간 7시간 시차 환경에서 비동기 스프린트 회의 체계를 수립하여 3개 부서 20+명 간 요구사항 오해율을 0건으로 통제하고 프로젝트를 납기 내 100% 릴리즈함.',
    bulletEn: '• Established asynchronous sprint synchronization across 7-hour time difference, eliminating cross-cultural communication bottlenecks and delivering international data migration on schedule.',
    createdAt: '2024-08-25T10:30:00Z',
    updatedAt: '2024-08-25T10:30:00Z'
  }
];

// 기능 2: 역량 성장 트렌드
export const SKILL_GROWTH_TRENDS: import('../types').SkillGrowthTrend[] = [
  {
    skillKey: 'problemSolving',
    nameKo: '문제 해결',
    nameEn: 'Problem Solving',
    currentValue: 95,
    growthRate: 18,
    trendData: [
      { skillKey: 'problemSolving', date: '2024-02', value: 65 },
      { skillKey: 'problemSolving', date: '2024-04', value: 75 },
      { skillKey: 'problemSolving', date: '2024-06', value: 85 },
      { skillKey: 'problemSolving', date: '2024-08', value: 95 }
    ]
  },
  {
    skillKey: 'tech',
    nameKo: '기술',
    nameEn: 'Tech',
    currentValue: 90,
    growthRate: 12,
    trendData: [
      { skillKey: 'tech', date: '2024-02', value: 72 },
      { skillKey: 'tech', date: '2024-04', value: 78 },
      { skillKey: 'tech', date: '2024-06', value: 84 },
      { skillKey: 'tech', date: '2024-08', value: 90 }
    ]
  },
  {
    skillKey: 'leadership',
    nameKo: '리더십',
    nameEn: 'Leadership',
    currentValue: 85,
    growthRate: 8,
    trendData: [
      { skillKey: 'leadership', date: '2024-02', value: 72 },
      { skillKey: 'leadership', date: '2024-04', value: 76 },
      { skillKey: 'leadership', date: '2024-06', value: 80 },
      { skillKey: 'leadership', date: '2024-08', value: 85 }
    ]
  },
  {
    skillKey: 'communication',
    nameKo: '소통',
    nameEn: 'Communication',
    currentValue: 75,
    growthRate: 10,
    trendData: [
      { skillKey: 'communication', date: '2024-02', value: 60 },
      { skillKey: 'communication', date: '2024-04', value: 65 },
      { skillKey: 'communication', date: '2024-06', value: 70 },
      { skillKey: 'communication', date: '2024-08', value: 75 }
    ]
  },
  {
    skillKey: 'strategy',
    nameKo: '전략',
    nameEn: 'Strategy',
    currentValue: 70,
    growthRate: 5,
    trendData: [
      { skillKey: 'strategy', date: '2024-02', value: 60 },
      { skillKey: 'strategy', date: '2024-04', value: 63 },
      { skillKey: 'strategy', date: '2024-06', value: 66 },
      { skillKey: 'strategy', date: '2024-08', value: 70 }
    ]
  },
  {
    skillKey: 'design',
    nameKo: '디자인',
    nameEn: 'Design',
    currentValue: 60,
    growthRate: 3,
    trendData: [
      { skillKey: 'design', date: '2024-02', value: 54 },
      { skillKey: 'design', date: '2024-04', value: 56 },
      { skillKey: 'design', date: '2024-06', value: 58 },
      { skillKey: 'design', date: '2024-08', value: 60 }
    ]
  }
];

// 기능 3: 보완 활동 진행도
export const INITIAL_ACTIVITY_PROGRESS: import('../types').ActivityProgress[] = [
  {
    id: 'progress-1',
    activityId: 'dev-1',
    status: 'in_progress',
    progressPercent: 43,
    startedAt: '2024-08-01T09:00:00Z'
  },
  {
    id: 'progress-2',
    activityId: 'dev-2',
    status: 'not_started',
    progressPercent: 0
  },
  {
    id: 'progress-3',
    activityId: 'dev-3',
    status: 'not_started',
    progressPercent: 0
  },
  {
    id: 'progress-4',
    activityId: 'dev-4',
    status: 'in_progress',
    progressPercent: 25,
    startedAt: '2024-08-15T18:00:00Z'
  }
];

// 기능 4: 다중 기업 매칭 비교
export const COMPANY_MATCHING_SUMMARIES: import('../types').CompanyMatchingSummary[] = [
  {
    companyName: '한국가스공사 (Korea Gas Corporation)',
    overallMatchRate: 90,
    strongMatches: 2,
    developmentNeeds: 2
  },
  {
    companyName: '남동발전 (Dangjin Thermal Power)',
    overallMatchRate: 87,
    strongMatches: 2,
    developmentNeeds: 2
  },
  {
    companyName: '한국전력 (Korea Electric Power Corporation)',
    overallMatchRate: 89,
    strongMatches: 2,
    developmentNeeds: 1
  }
];

// 기능 5: 강점 활용 가이드
export const STRENGTH_GUIDANCE: import('../types').StrengthGuidance[] = [
  {
    strengthKo: '문제 해결',
    strengthEn: 'Problem Solving',
    skillKey: 'problemSolving',
    value: 95,
    careerPathsKo: [
      '기술 리더 - 복잡한 시스템 아키텍처 설계 및 의사결정',
      '프로덕트 매니저 - 고객 문제를 데이터 기반으로 분석하고 해결',
      '컨설턴트 - 기업의 핵심 문제를 진단하고 솔루션 제시',
      '스타트업 창업가 - 초기 시장 문제를 빠르게 식별하고 MVP 구축'
    ],
    careerPathsEn: [
      'Tech Lead - Design complex system architectures and drive technical decisions',
      'Product Manager - Analyze customer problems with data-driven insights',
      'Management Consultant - Diagnose business challenges and propose solutions',
      'Startup Founder - Identify market problems and build MVPs rapidly'
    ],
    differentiatorKo: '당신의 95% 문제해결력은 상위 5% 수준입니다. 특히 "AI 해커톤에서 메모리 최적화 알고리즘으로 40% 성능 개선"처럼 제약 조건 내에서 창의적 해결책을 찾는 능력이 핵심 차별점입니다.',
    differentiatorEn: 'Your 95% Problem Solving proficiency is in the top 5%. Your key differentiator is discovering creative solutions under constraints—like optimizing algorithms under memory limits during your hackathon win.'
  },
  {
    strengthKo: '기술',
    strengthEn: 'Tech',
    skillKey: 'tech',
    value: 90,
    careerPathsKo: [
      '백엔드 엔지니어 - 대규모 시스템 설계, 마이크로서비스 아키텍처',
      'DevOps 엔지니어 - 인프라 자동화, 배포 파이프라인 구축',
      'AI/ML 엔지니어 - 모델 개발 및 프로덕션 배포',
      '기술 리더/CTO - 엔지니어링 팀 리딩 및 기술 전략 수립'
    ],
    careerPathsEn: [
      'Backend Engineer - Design large-scale systems and microservices',
      'DevOps Engineer - Automate infrastructure and CI/CD pipelines',
      'AI/ML Engineer - Develop and deploy models in production',
      'Tech Lead/CTO - Lead engineering teams and define technology strategy'
    ],
    differentiatorKo: '"결제 게이트웨이 연동 중 트랜잭션 지연 15% 단축"이라는 실제 성과와 "서킷 브레이커 패턴 도입"같은 구체적 기술 선택이 당신을 단순 개발자가 아닌 시스템 설계자로 포지셔닝합니다.',
    differentiatorEn: 'Your ability to reduce payment gateway latency by 15% and implement resilience patterns like circuit breakers shows you\'re not just a developer—you\'re a systems architect.'
  },
  {
    strengthKo: '리더십',
    strengthEn: 'Leadership',
    skillKey: 'leadership',
    value: 85,
    careerPathsKo: [
      '엔지니어링 매니저 - 팀 빌딩, 채용, 성과관리',
      '프로덕트 리더 - 크로스펑셔널 팀 조율, 로드맵 주도',
      '조직개발 리더 - 기업문화, 조직구조 개선',
      'VP/Executive - 사업부 전략 수립 및 경영진 레벨 의사결정'
    ],
    careerPathsEn: [
      'Engineering Manager - Build teams, hiring, performance management',
      'Product Leader - Coordinate cross-functional teams, drive roadmaps',
      'Organizational Development Leader - Improve culture and structure',
      'VP/Executive - Define business strategy and make executive decisions'
    ],
    differentiatorKo: '"24명 참가 워크숍 진행 후 팀 만족도 28% 상승"은 단순 리더십이 아닌 "조직 효율성을 수치로 개선하는" 리더십입니다. 이는 매니저 이상으로의 승진에서 강력한 무기입니다.',
    differentiatorEn: 'Increasing team satisfaction by 28% through structured workshops demonstrates you\'re not just a leader—you\'re a change agent who drives measurable organizational improvements.'
  }
];

