import { createApp } from 'vue';
import App from './App.vue';
import themeService from './application/services/themeService';
import i18n from '@/application/i18n';
import router from '@/application/router/index';
import '@/presentation/styles/index.pcss';
const app = createApp(App);

app.provide('theme', themeService);
app.use(router);
app.use(i18n);
app.mount('#app');
