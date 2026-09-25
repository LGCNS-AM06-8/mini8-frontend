import type { ApiError } from '@/lib';
import type { ProfileRequest } from '@/types/profile';

// PUT /api/profile 목업. 서버 저장 API 가 들어오면 services/profile.ts 로 옮기고 지운다.
// 경력 50년 초과는 F3 목업과 같이 거절한다.
export const mockUpdateProfile = (request: ProfileRequest) =>
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
      console.info('[mock] PUT /api/profile', request);
      resolve();
    }, 600);
  });
