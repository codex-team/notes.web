import Home from '@/presentation/pages/Home.vue';
import Note from '@/presentation/pages/Note.vue';
import Landing from '@/presentation/pages/Landing.vue';
import Settings from '@/presentation/pages/Settings.vue';
import Marketplace from '@/presentation/pages/Marketplace.vue';

// Default production hostname for homepage. If different, then custom hostname used
const websiteHostname = import.meta.env.VITE_PRODUCTION_HOSTNAME;

const routes = [
  {
    name: 'home',
    path: '/',
    component: Home,
    beforeEnter: () => {
      // Custom hostname should return page instead of homepage
      if (!import.meta.env.DEV && location.hostname != websiteHostname) {
        return '/view/#/'; // TODO: modify component template instead of redirect
      }

      return true;
    },
  },
  {
    name: 'note_view',
    path: '/note/:id',
    component: Note,
    props: route => ({
      id: Number(route.params.id),
    }),
  },
  {
    name: 'editorTools_view',
    path: '/marketplace',
    component: Marketplace,
  },
  {
    name: 'new',
    path: '/new',
    component: Note,
    props: {
      id: null,
    },
  },
  {
    path: '/view/',
    component: Landing,
  },
  {
    name: 'settings',
    path: '/note/:id/settings',
    component: Settings,
    props: route => ({
      id: Number(route.params.id),
    }),
  },
];

export default routes;
