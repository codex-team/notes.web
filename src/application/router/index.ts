import { createRouter, createWebHistory, Router } from 'vue-router';
import createRoutes from './routes';

/**
 * Init router
 *
 * @returns { Router } - Router
 */
export default function (): Router {
  const routes = createRoutes();

  return createRouter({
    history: createWebHistory(),
    routes,
  });
}
