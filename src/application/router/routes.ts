import Home from '@/presentation/pages/Home.vue';
import Note from '@/presentation/pages/Note.vue';
import Landing from '@/presentation/pages/Landing.vue';

// Default production hostname for homepage. If different, then custom hostname used
const websiteHostname = import.meta.env.VITE_PRODUCTION_HOSTNAME;

const routes = [
  {
    path: '/',
    component: Home,
    beforeEnter: () => {
      // Custom hostname should return page instead of homepage
      if (location.hostname != websiteHostname) {
        return '/view/#/'; // TODO: modify component template instead of redirect
      }

      return true;
    },
  },
  {
    path: '/note/:id',
    component: Note,
    props: route => ({
      id: Number(route.params.id),
    }),
  },
  {
    path: '/view/',
    component: Landing,
  },
];

export default routes;