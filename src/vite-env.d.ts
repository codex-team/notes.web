// / <reference types="vite/client" />
declare module '*.vue'

declare module 'vue-router' {
    interface RouteMeta {
      // add Layout like component wrapper
      layout?: string
    }
  }