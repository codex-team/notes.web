import { computed, type MaybeRefOrGetter, toValue } from 'vue';
import { useTitle } from '@vueuse/core';

/**
 * Sets the browser tab title of the page
 * @param title - page title
 */
export default function usePageTitle(title: MaybeRefOrGetter<string>): void {
  useTitle(computed(() => toValue(title)), { titleTemplate: '%s · NoteX' });
}
