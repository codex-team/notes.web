import Home from '@/presentation/pages/Home.vue';
import Note from '@/presentation/pages/Note.vue';
import Landing from '@/presentation/pages/Landing.vue';
import type { RouteRecordRaw } from 'vue-router';
import MarketplaceTools from '@/presentation/pages/marketplace/MarketplaceTools.vue';

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
      layout: 'fullpage',
      pageTitleI18n: 'pages.note',
    },
    props: route => ({
      id: String(route.params.id),
    }),
  },
  {
    name: 'history',
    path: '/note/:noteId/history',
    component: () => import('@/presentation/pages/History.vue'),
    meta: {
      layout: 'fullpage',
      pageTitleI18n: 'pages.history',
      authRequired: true,
    },
    props: route => ({
      noteId: String(route.params.noteId),
    }),
  },
  {
    name: 'history_version',
    path: '/note/:noteId/history/:historyId',
    component: () => import('@/presentation/pages/HistoryVersion.vue'),
    meta: {
      layout: 'fullpage',
      pageTitleI18n: 'pages.historyVersion',
      authRequired: true,
    },
    props: route => ({
      noteId: String(route.params.noteId),
      historyId: Number(route.params.historyId),
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
      authRequired: true,
      layout: 'fullpage',
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
      authRequired: true,
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
    name: 'settings',
    path: `/settings/`,
    component: () => import('@/presentation/pages/Settings.vue'),
    meta: {
      pageTitleI18n: 'pages.userSettings',
      authRequired: true,
    },
  },
  {
    name: 'note_settings',
    path: '/note/:id/settings',
    component: () => import('@/presentation/pages/NoteSettings.vue'),
    props: route => ({
      id: String(route.params.id),
    }),
    meta: {
      pageTitleI18n: 'pages.noteSettings',
      authRequired: true,
    },
  },
  {
    name: 'marketplacePage',
    path: `/`,
    component: () => import('@/presentation/pages/marketplace/MarketplacePage.vue'),
    redirect: '/marketplace',
    meta: {
      pageTitleI18n: 'pages.marketplace',
    },
    children: [{
      name: 'marketplace',
      path: 'marketplace',
      component: MarketplaceTools,
      meta: {
        pageTitleI18n: 'pages.marketplace',
        authRequired: true,
      },
    },
    {
      name: 'marketplaceAddTool',
      path: `marketplace/add`,
      component: () => import('@/presentation/pages/marketplace/AddTool.vue'),
      meta: {
        pageTitleI18n: 'pages.addTool',
        authRequired: true,
      },
    }],
  },
  {
    name: 'join',
    path: '/join/:hash',
    component: () => import('@/presentation/pages/Join.vue'),
    props: route => ({
      invitationHash: String(route.params.hash),
    }),
    meta: {
      pageTitleI18n: 'pages.joinTeam',
      discardTabOnLeave: true,
      authRequired: true,
    },
  },
  {
    name: 'authorization',
    path: '/auth',
    component: () => import('@/presentation/pages/AuthorizationPage.vue'),
    props: route => ({
      redirect: String(route.query.redirect),
    }),
    meta: {
      pageTitleI18n: 'pages.authorization',
      discardTabOnLeave: true,
    },
  },
  /**
   * 404 page
   */
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/presentation/pages/Error.vue'),
    meta: {
      layout: 'fullpage',
      pageTitleI18n: 'pages.notFound',
      discardTabOnLeave: true,
    },
    props: {
      code: 404,
    },
  },
  /**
   * error page
   */
  {
    path: '/error/:code',
    component: () => import('@/presentation/pages/Error.vue'),
    meta: {
      layout: 'fullpage',
      pageTitleI18n: 'pages.error',
      discardTabOnLeave: true,
    },
    props: route => ({
      code: route.params.code,
    }),
  },
];

export default routes;
