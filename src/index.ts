import { createApp } from 'vue';
import { createHead } from 'unhead';
import App from './App.vue';
import i18n from '@/application/i18n';
import router from '@/application/router/index';
import '@/presentation/styles/index.pcss';
import { useErrorCatcher } from './application/services/useErrorCatcher';

const app = createApp(App);

app.use(createHead);
app.use(router);
app.use(i18n);
app.mount('#app');

const { init } = useErrorCatcher();
init(app);
