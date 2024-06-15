import Home from '@/presentation/pages/Home.vue';
import Note from '@/presentation/pages/Note.vue';
import Landing from '@/presentation/pages/Landing.vue';
import Settings from '@/presentation/pages/Settings.vue';
import NoteSettings from '@/presentation/pages/NoteSettings.vue';
import ErrorPage from '@/presentation/pages/Error.vue';
import Marketplace from '@/presentation/pages/marketplace/Marketplace.vue';
import type { RouteRecordRaw } from 'vue-router';
import AddTool from '@/presentation/pages/marketplace/AddTool.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
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
      pageTitle: t('note.new'),
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
      pageTitle: t('note.new'),
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
      pageTitle: t('note.new'),
    },
  },
  {
    path: '/view/',
    component: Landing,
    meta: {
      pageTitle: t('appTitle'),
    },
  },
  {
    path: `/settings/`,
    component: Settings,
    meta: {
      pageTitle: t('userSettings.title'),
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
      pageTitle: t('noteSettings.title'),
    },
  },
  {
    path: `/marketplace`,
    component: Marketplace,
    meta: {
      pageTitle: t('marketplace.title'),
    },
  },
  {
    name: 'newTool',
    path: `/marketplace/add`,
    component: AddTool,
    meta: {
      pageTitle: t('marketplace.addTool'),
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
      pageTitle: t('errors.404'),
    },
    props: {
      code: 404,
    },
  },
];

export default routes;
