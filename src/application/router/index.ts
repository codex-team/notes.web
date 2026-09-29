import { createRouter, createWebHistory } from 'vue-router';
import routes, { Note } from '@/application/router/routes';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

/**
 * Most visits end on a note, so its chunk with the editor is fetched once the first page is shown
 */
const PREFETCH_DELAY = 2000;

void router.isReady().then(() => setTimeout(() => void Note(), PREFETCH_DELAY));

export default router;
