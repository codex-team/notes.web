import Home from './../../presentation/pages/Home.vue';
import Note from '../../presentation/pages/Note.vue';
import { RouteRecordRaw } from 'vue-router';

/**
 * Init routes
 *
 * @returns { RouteRecordRaw[] } - Routes
 */
export default function (): RouteRecordRaw[] {
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
      }),
    },
  ];
}
