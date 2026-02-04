import { createApp } from 'vue';
import { createHead } from 'unhead';
import App from './App.vue';
import i18n from '@/application/i18n';
import hawk from '@/application/error-catcher';
import router from '@/application/router/index';
import '@codexteam/ui/styles';
import '@codexteam/ui/styles/fonts';
import '@codexteam/ui/styles/themes/graphite';
import '@codexteam/ui/styles/themes/sky';
import '@codexteam/ui/styles/themes/crimson';
import '@codexteam/ui/styles/themes/grass';
import '@codexteam/ui/styles/themes/violet';
import '@codexteam/ui/styles/themes/amber';
import '@codexteam/ui/styles/themes/pure';
import '@/presentation/styles/index.pcss';

const app = createApp(App);

app.use(hawk);
app.use(createHead);
app.use(router);
app.use(i18n);
app.mount('#app');
