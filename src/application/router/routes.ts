import Home from '@/presentation/pages/Home.vue';
import Note from '@/presentation/pages/Note.vue';

const routes = [
  {
    name: 'home',
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
  {
    path: '/new',
    component: Note,
    props: {
      id: null,
    },
  }
];

export default routes;
