import type { TechTag } from '@/types/profile';

// GET /api/tech-tags 목데이터. 02 기본정보 입력은 서버 목록을 쓰고, 07 마이페이지만 서버 연결 전까지 이걸 쓴다(id 는 예시).
// 실제 id 는 DB 적재 때 정해지므로 화면 코드에서 id 를 직접 쓰지 않는다.
export const mockTechTags: TechTag[] = [
  { techTagId: 1, name: 'Spring', field: 'Backend' },
  { techTagId: 2, name: 'Spring Boot', field: 'Backend' },
  { techTagId: 3, name: 'MySQL', field: 'Backend' },
  { techTagId: 4, name: 'Kotlin', field: 'Backend' },
  { techTagId: 5, name: 'SSE', field: 'Backend' },
  { techTagId: 6, name: 'React', field: 'Frontend' },
  { techTagId: 7, name: 'JavaScript', field: 'Frontend' },
  { techTagId: 8, name: 'Vite', field: 'Frontend' },
  { techTagId: 9, name: 'LLM', field: 'Data' },
  { techTagId: 10, name: 'RAG', field: 'Data' },
  { techTagId: 11, name: 'MCP', field: 'Data' },
  { techTagId: 12, name: 'Claude Code', field: 'Data' },
  { techTagId: 13, name: 'Machine Learning', field: 'Data' },
  { techTagId: 14, name: 'Airflow', field: 'Data' },
  { techTagId: 15, name: 'Kafka', field: 'Infra' },
  { techTagId: 16, name: 'Kubernetes', field: 'Infra' },
  { techTagId: 17, name: 'Redis', field: 'Infra' },
  { techTagId: 18, name: 'AWS', field: 'Infra' },
  { techTagId: 19, name: 'Android', field: 'Mobile' },
  { techTagId: 20, name: 'Flutter', field: 'Mobile' },
];
