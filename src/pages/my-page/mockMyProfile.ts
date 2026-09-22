import type { ApiError } from '@/lib';
import type { ProfileRequest, ProfileResponse } from '@/types/profile';

// GET · PUT /api/profile 목업. 서버 API(준우님 작업 중)가 들어오면 services 로 옮기고 지운다.
let mockProfile: ProfileResponse = {
  name: '테스트',
  jobFields: ['Backend'],
  careerYears: 0,
  haveSkills: [
    { techTagId: 1, name: 'Spring' },
    { techTagId: 3, name: 'MySQL' },
  ],
  wantSkills: [
    { techTagId: 15, name: 'Kafka' },
    { techTagId: 17, name: 'Redis' },
  ],
  profileVersion: 1,
};

export const mockGetProfile = () =>
  new Promise<ProfileResponse>((resolve) => {
    setTimeout(() => {
      console.info('[mock] GET /api/profile', mockProfile);
      resolve(mockProfile);
    }, 500);
  });

// 저장할 때마다 profileVersion +1 (09.22 명세: 값이 같아도 올린다). 경력 50년 초과는 F3 목업과 같이 거절한다.
export const mockUpdateProfile = (request: ProfileRequest, techTagName: (id: number) => string) =>
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
      const toSkills = (ids: number[]) =>
        ids.map((techTagId) => ({ techTagId, name: techTagName(techTagId) }));
      mockProfile = {
        ...mockProfile,
        jobFields: request.jobFields,
        careerYears: request.careerYears,
        haveSkills: toSkills(request.haveSkillIds),
        wantSkills: toSkills(request.wantSkillIds),
        profileVersion: mockProfile.profileVersion + 1,
      };
      console.info('[mock] PUT /api/profile', request, {
        profileVersion: mockProfile.profileVersion,
      });
      resolve();
    }, 600);
  });
