import { createApp } from 'vue';
import { createHead } from 'unhead';
import App from './App.vue';
import i18n from '@/application/i18n';
import hawk from '@/application/error-catcher';
import router from '@/application/router/index';
import '../@codexteam/ui/dist/styles.css';
import '@/presentation/styles/index.pcss';

const app = createApp(App);

app.use(hawk);
app.use(createHead);
app.use(router);
app.use(i18n);
app.mount('#app');
