import { createApp } from 'vue';
import App from './App.vue';
import i18n from './application/i18n';
import createRouter from './application/router/index';

/**
 * Init router
 */
const router = createRouter();


const app = createApp(App);

app.use(router);
app.use(i18n);
app.mount('#app');
