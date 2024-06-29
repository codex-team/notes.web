// / <reference types="vite/client" />
// To ensure it is treated as a module, add at least one `export` statement
export {};

declare module '*.vue';

import type { layouts } from '@/application/services/useLayout';

declare module 'vue-router' {
  interface RouteMeta {
    /**
     * Layout like component wrapper
     */
    layout?: keyof typeof layouts;

    /**
     * Short text description of the route's page
     */
    pageTitleI18n: string;
  }
}
