import Home from '@/presentation/pages/Home.vue';
import Note from '@/presentation/pages/Note.vue';
import Landing from '@/presentation/pages/Landing.vue';
import Settings from '@/presentation/pages/Settings.vue';
import NoteSettings from '@/presentation/pages/NoteSettings.vue';
import ErrorPage from '@/presentation/pages/Error.vue';
import Marketplace from '@/presentation/pages/marketplace/Marketplace.vue';
import type { RouteRecordRaw } from 'vue-router';
import AddTool from '@/presentation/pages/marketplace/AddTool.vue';

// Default production hostname for homepage. If different, then custom hostname used
const websiteHostname = import.meta.env.VITE_PRODUCTION_HOSTNAME;

const routes: RouteRecordRaw[] = [
  {
    name: 'home',
    path: '/',
    component: Home,
    meta: {
      pageTitle: 'Home',
    },
    beforeEnter: () => {
      // Custom hostname should return page instead of homepage
      if (!import.meta.env.DEV && location.hostname != websiteHostname) {
        return '/view/#/'; // TODO: modify component template instead of redirect
      }

      return true;
    },
  },
  {
    name: 'note',
    path: '/note/:id',
    component: Note,
    meta: {
      pageTitle: 'Note',
    },
    props: route => ({
      id: String(route.params.id),
    }),
  },
  {
    name: 'new',
    path: '/new',
    component: Note,
    props: {
      id: null,
    },
    meta: {
      pageTitle: 'New note',
    },
  },
  {
    path: '/note/:id/new',
    component: Note,
    props: route => ({
      id: null,
      parentId: String(route.params.id),
    }),
    meta: {
      pageTitle: 'New note',
    },
  },
  {
    path: '/view/',
    component: Landing,
    meta: {
      pageTitle: 'Landing',
    },
  },
  {
    path: `/settings/`,
    component: Settings,
    meta: {
      pageTitle: 'User settings',
    },
  },
  {
    name: 'note_settings',
    path: '/note/:id/settings',
    component: NoteSettings,
    props: route => ({
      id: String(route.params.id),
    }),
    meta: {
      pageTitle: 'Note Settings',
    },
  },
  {
    path: `/marketplace`,
    component: Marketplace,
    meta: {
      pageTitle: 'Marketplace',
    },
  },
  {
    name: 'newTool',
    path: `/marketplace/add`,
    component: AddTool,
    meta: {
      pageTitle: 'Add tool',
    },
  },
  /**
   * 404 page
   */
  {
    path: '/:pathMatch(.*)*',
    component: ErrorPage,
    meta: {
      layout: 'fullpage',
      pageTitle: 'Not found',
    },
    props: {
      code: 404,
    },
  },
];

export default routes;
