import { createApp } from 'vue';
import App from '@/App.vue';
import i18n from '@application/i18n';
import router from '@application/router/index';

const app = createApp(App);

app.use(router);
app.use(i18n);
app.mount('#app');
