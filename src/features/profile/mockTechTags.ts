import type { TechTag } from '@/types/profile';

// GET /api/tech-tags 목데이터. 기술 20개는 09.21 확정 목록이고 id · postCount 는 예시다.
// 실제 id 는 DB 적재 때 정해지므로 화면 코드에서 id 를 직접 쓰지 않는다.
export const mockTechTags: TechTag[] = [
  { techTagId: 1, name: 'Spring', field: 'Backend', postCount: 48 },
  { techTagId: 2, name: 'Spring Boot', field: 'Backend', postCount: 41 },
  { techTagId: 3, name: 'MySQL', field: 'Backend', postCount: 22 },
  { techTagId: 4, name: 'Kotlin', field: 'Backend', postCount: 19 },
  { techTagId: 5, name: 'SSE', field: 'Backend', postCount: 4 },
  { techTagId: 6, name: 'React', field: 'Frontend', postCount: 37 },
  { techTagId: 7, name: 'JavaScript', field: 'Frontend', postCount: 25 },
  { techTagId: 8, name: 'Vite', field: 'Frontend', postCount: 6 },
  { techTagId: 9, name: 'LLM', field: 'Data', postCount: 30 },
  { techTagId: 10, name: 'RAG', field: 'Data', postCount: 12 },
  { techTagId: 11, name: 'MCP', field: 'Data', postCount: 7 },
  { techTagId: 12, name: 'Claude Code', field: 'Data', postCount: 5 },
  { techTagId: 13, name: 'Machine Learning', field: 'Data', postCount: 18 },
  { techTagId: 14, name: 'Airflow', field: 'Data', postCount: 3 },
  { techTagId: 15, name: 'Kafka', field: 'Infra', postCount: 21 },
  { techTagId: 16, name: 'Kubernetes', field: 'Infra', postCount: 26 },
  { techTagId: 17, name: 'Redis', field: 'Infra', postCount: 32 },
  { techTagId: 18, name: 'AWS', field: 'Infra', postCount: 29 },
  { techTagId: 19, name: 'Android', field: 'Mobile', postCount: 14 },
  { techTagId: 20, name: 'Flutter', field: 'Mobile', postCount: 8 },
];
