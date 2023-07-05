import Home from './../../presentation/pages/Home.vue';
import Note from '../../presentation/pages/Note.vue';

const routes = [
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

export default routes;
