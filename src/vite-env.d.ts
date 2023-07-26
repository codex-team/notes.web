// / <reference types="vite/client" />
// To ensure it is treated as a module, add at least one `export` statement
export {};

declare module '*.vue'

declare module 'vue-router' {
  interface RouteMeta {
    /**
     * Layout like component wrapper
     */
    layout?: string
  }
}