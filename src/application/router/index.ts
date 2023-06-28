import { createRouter, createWebHistory, Router } from 'vue-router';
import createRoutes from './routes';
import NoteService from '../../domain/note.service';

/**
 * Init router
 *
 * @param noteService - Note service instance
 * @returns { Router } - Router
 */
export default function (noteService: NoteService): Router {
  const routes = createRoutes(noteService);

  return createRouter({
    history: createWebHistory(),
    routes,
  });
}
