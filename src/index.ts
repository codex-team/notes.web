import { createApp } from 'vue';
import App from './App.vue';
import i18n from './application/i18n';
import createRouter from './application/router/index';
import { init as initRepositories } from './infrastructure';
import { init as initDomains } from './domain';

/**
 * Init repository
 */
const repositories = initRepositories();

/**
 * Init domain
 */
const services = initDomains(repositories);

/**
 * Init router
 */
const router = createRouter(services.noteService);


const app = createApp(App);

app.use(router);
app.use(i18n);
app.mount('#app');
