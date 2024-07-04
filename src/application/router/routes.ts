import Home from '@/presentation/pages/Home.vue';
import Note from '@/presentation/pages/Note.vue';
import Landing from '@/presentation/pages/Landing.vue';
import Settings from '@/presentation/pages/Settings.vue';
import NoteSettings from '@/presentation/pages/NoteSettings.vue';
import ErrorPage from '@/presentation/pages/Error.vue';
import type { RouteRecordRaw } from 'vue-router';
import AddTool from '@/presentation/pages/marketplace/AddTool.vue';
import MarketplacePage from '@/presentation/pages/marketplace/MarketplacePage.vue';
import Marketplace from '@/presentation/pages/marketplace/Marketplace.vue';

// Default production hostname for homepage. If different, then custom hostname used
const websiteHostname = import.meta.env.VITE_PRODUCTION_HOSTNAME;

const routes: RouteRecordRaw[] = [
  {
    name: 'home',
    path: '/',
    component: Home,
    meta: {
      pageTitleI18n: 'pages.home',
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
      pageTitleI18n: 'pages.note',
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
      pageTitleI18n: 'pages.newNote',
      discardTabOnLeave: true,
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
      pageTitleI18n: 'pages.newNote',
      discardTabOnLeave: true,
    },
  },
  {
    path: '/view/',
    component: Landing,
    meta: {
      pageTitleI18n: 'pages.landing',
    },
  },
  {
    path: `/settings/`,
    component: Settings,
    meta: {
      pageTitleI18n: 'pages.userSettings',
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
      pageTitleI18n: 'pages.noteSettings',
    },
  },
  {
    name: 'marketplacePage',
    path: `/marketplace`,
    component: MarketplacePage,
    redirect: '/marketplace/tools',
    meta: {
      pageTitleI18n: 'pages.marketplace',
    },
    children: [{
      name: 'marketplace',
      path: 'tools',
      component: Marketplace,
      meta: {
        pageTitleI18n: 'pages.marketplace',
      },
    },
    {
      name: 'newTool',
      path: `add`,
      component: AddTool,
      meta: {
        pageTitleI18n: 'pages.addTool',
      },
    }],
  },

  /**
   * 404 page
   */
  {
    path: '/:pathMatch(.*)*',
    component: ErrorPage,
    meta: {
      layout: 'fullpage',
      pageTitleI18n: 'pages.notFound',
      discardTabOnLeave: true,
    },
    props: {
      code: 404,
    },
  },
];

export default routes;
