import { createApp } from 'vue';
import App from './App.vue';
import i18n from './application/i18n';
import router from './application/router/index';

createApp(App).use(i18n, router).mount('#app');