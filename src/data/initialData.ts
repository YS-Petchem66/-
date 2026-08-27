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
  companyName: '글로벌 테크놀로지 (Global Tech Inc.)',
  coreValues: '글로벌 마인드, 혁신, 팀워크 (Global Mindset, Innovation, Teamwork)',
  aiInsightKo: "AI 인사이트 - Alex님의 경험은 '글로벌 마인드'와 '혁신' 항목에서 강한 일치도를 보입니다. 해외 인턴십과 해커톤 프로젝트에 초점을 맞추어 이야기를 구성해 보세요.",
  aiInsightEn: 'AI Insight - Your experiences show strong alignment with "Global Mindset" and "Innovation". Consider focusing on your Overseas Internship and Hackathon project to strengthen your narrative.',
  matrix: [
    {
      companyValueKo: '글로벌 마인드',
      companyValueEn: 'Global Mindset',
      matchedExperienceKo: '베를린 해외 인턴십',
      matchedExperienceEn: 'Overseas Internship in Berlin',
      matchRate: 92,
      rationaleKo: '다국적 개발팀과의 교차 시차 협업 및 현지-본사 커뮤니케이션 주도 경험이 글로벌 역량과 완벽히 부합합니다.',
      rationaleEn: 'Experience bridging time zones and coordinating between international teams directly demonstrates global execution.'
    },
    {
      companyValueKo: '혁신 및 창의성',
      companyValueEn: 'Innovation & Creativity',
      matchedExperienceKo: 'AI 해커톤 - 1위',
      matchedExperienceEn: 'AI Hackathon - 1st Place',
      matchRate: 88,
      rationaleKo: '기존 관행을 깬 독창적 정렬 알고리즘 적용으로 처리 시간을 40% 단축한 사례가 기업의 혁신 인재상과 직결됩니다.',
      rationaleEn: 'Proposing novel streaming algorithms to improve speed by 40% validates continuous drive for innovation.'
    }
  ],
  recommendedStories: [
    {
      id: 'story-1',
      tagKo: '글로벌 마인드',
      tagEn: 'Global Mindset',
      titleKo: '베를린 인턴십 중 문화 간 커뮤니케이션 적응',
      titleEn: 'Adapting to cross-cultural communication during Berlin Internship',
      descriptionKo: '현지 독일 개발자들과 한국 본사 팀 간의 조율을 통해 복잡한 프로젝트 요구 사항을 해결했습니다.',
      descriptionEn: 'Navigated complex project requirements while coordinating between local German developers and the Korean HQ team.',
      draftBulletKo: '• 독일-한국 간 7시간 시차 환경에서 비동기 스프린트 회의 체계를 수립하여 3개 부서 20+명 간 요구사항 오해율을 0건으로 통제하고 프로젝트를 납기 내 100% 릴리즈함.',
      draftBulletEn: '• Established asynchronous sprint synchronization across 7-hour time difference, eliminating cross-cultural communication bottlenecks and delivering international data migration on schedule.',
      starStructureKo: {
        situation: '베를린 인턴십 중 독일 엔지니어링 팀과 한국 본사 제품팀 간의 상이한 개발 관행 및 언어/시차 장벽 존재.',
        task: '다국적 팀 간 데이터 파이프라인 명세를 통일하고 3주 내 통합 테스트 완료 필요.',
        action: '주간 비동기 데일리 스크럼 템플릿을 도입하고, 핵심 인터페이스 스펙을 다이어그램 기반 자동화 문서로 공유.',
        result: '시차로 인한 병목 지연을 30% 감소시키고, 오류 없이 정시 배포 완료.'
      },
      starStructureEn: {
        situation: 'Encountered architectural discrepancies and time zone friction between German engineering and Korean product HQ.',
        task: 'Standardize cross-border data pipeline specifications and execute integration testing within 3 weeks.',
        action: 'Implemented async daily scrum templates and standardized diagram-based automated API specs.',
        result: 'Reduced cross-team turnaround lag by 30% and achieved zero release defects.'
      }
    },
    {
      id: 'story-2',
      tagKo: '혁신',
      tagEn: 'Innovation',
      titleKo: '해커톤을 위한 새로운 정렬 알고리즘 개발',
      titleEn: 'Developing a novel sorting algorithm for Hackathon',
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
    name: '글로벌 테크놀로지 (Global Tech Inc.)',
    valuesKo: '글로벌 마인드, 혁신 및 창의성, 주도적 문제 해결, 팀워크',
    valuesEn: 'Global Mindset, Innovation & Creativity, Proactive Problem Solving, Teamwork'
  },
  {
    name: '혁신 핀테크 플랫폼 (Toss / FinTech Corp)',
    valuesKo: '극단적 속도와 실행력, 데이터 기반 의사결정, 고객 중심 문제해결, 투명한 소통',
    valuesEn: 'High Execution Velocity, Data-driven Decision Making, Customer Focus, Transparent Communication'
  },
  {
    name: '글로벌 AI 연구소 (AI Frontier Labs)',
    valuesKo: '기술적 탁월성, 끊임없는 연구와 도전, 윤리적 리더십, 개방형 협업',
    valuesEn: 'Technical Excellence, Relentless Curiosity, Ethical Leadership, Open Collaboration'
  }
];
