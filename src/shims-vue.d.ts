/**
 * Vue exports Component as any.
 * We declare default .vue file as Component
 * See also: https://github.com/typescript-eslint/typescript-eslint/issues/2865
 */
declare module '*.vue' {
  import type { Component } from 'vue';
  const component: Component;

  export default component;
}
