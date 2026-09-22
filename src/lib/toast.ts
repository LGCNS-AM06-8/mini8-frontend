import toast, { type ToasterProps } from 'react-hot-toast';

import { DEFAULT_ERROR_MESSAGE } from '@/constants/errorMessages';
import { theme } from '@/styles/theme';

import type { ApiError } from './AxiosInstance';

const { colors } = theme;

// main.tsx 의 <Toaster> 설정. 오류는 칸에 붙는 것(field)은 칸 아래, 칸이 없는 것은 토스트로 보여 준다 (F9).
export const toasterProps: ToasterProps = {
  position: 'top-center',
  toastOptions: {
    duration: 3000,
    style: {
      maxWidth: '30rem',
      padding: '0.75rem 1rem',
      borderRadius: '0.75rem',
      background: colors.grayScale.black,
      color: colors.grayScale.white,
      fontFamily: 'Pretendard, sans-serif',
      fontSize: '0.875rem',
      fontWeight: 500,
      wordBreak: 'keep-all',
    },
    success: {
      iconTheme: { primary: colors.violet.vt500, secondary: colors.grayScale.white },
    },
    error: {
      iconTheme: { primary: colors.violet.vt500, secondary: colors.grayScale.white },
    },
  },
};

// message 는 인터셉터가 code 를 우리 문구로 바꿔 둔 값이라 그대로 보여 줘도 된다.
export const showErrorToast = (error: Partial<ApiError> | undefined) =>
  toast.error(error?.message || DEFAULT_ERROR_MESSAGE, { id: error?.code });

export { toast };
