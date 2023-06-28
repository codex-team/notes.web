import Home from './../../presentation/pages/Home.vue';
import Note from '../../presentation/pages/Note.vue';
import NoteService from '../../domain/note.service';
import { RouteRecordRaw } from 'vue-router';

/**
 * Init routes
 *
 * @param noteService - Note service instance
 * @returns { RouteRecordRaw[] } - Routes
 */
export default function (noteService: NoteService): RouteRecordRaw[] {
  return [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/note/:id',
      component: Note,
      props: route => ({
        id: Number(route.params.id),
        noteService,
      }),
    },
  ];
}