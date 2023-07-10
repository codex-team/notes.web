import Home from './../../presentation/pages/Home.vue';
import Note from '../../presentation/pages/Note.vue';

const routes = [
  {
    path: '/',
    meta: { layout: 'AppLayout' },
    component: Home,
  },
  {
    path: '/note/:id',
    component: Note,
    props: true,
  },
];

export default routes;
