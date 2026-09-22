import type { ApiError } from '@/lib';
import { markMockProfileCompleted } from '@/services/auth';
import type { ProfileRequest } from '@/types/profile';

// POST /api/profile 목업. 서버 거절 흐름을 확인할 수 있게 경력 50년 초과는 INVALID_INPUT 으로 돌려준다.
export const mockSaveProfile = (request: ProfileRequest) =>
  new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      if (request.careerYears > 50) {
        const error: ApiError = {
          code: 'INVALID_INPUT',
          message: '경력 년수를 다시 확인해 주세요.',
          field: 'careerYears',
        };
        reject(error);
        return;
      }
      console.info('[mock] POST /api/profile', request);
      markMockProfileCompleted();
      resolve();
    }, 600);
  });
