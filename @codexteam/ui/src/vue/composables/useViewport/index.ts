import { createSharedComposable, useMediaQuery } from '@vueuse/core';

// Keep in sync with --mobile in styles/breakpoints.pcss
const MOBILE_MEDIA_QUERY = '(max-width: 768px)';

export const useViewport = createSharedComposable(() => ({
  isMobile: useMediaQuery(MOBILE_MEDIA_QUERY),
}));
