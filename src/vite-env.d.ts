// / <reference types="vite/client" />
declare module '*.vue'

declare module 'vue-router' {
    interface RouteMeta {
      /**
       * Layout like component wrapper
       */
      layout?: string
    }
  }