import { createApp } from 'vue';
import App from './App.vue';
import i18n from './application/i18n';
import router from './application/router/index';
import './presentation/styles/colors.pcss';
import 'normalize.css';
import './presentation/styles/sizes.pcss';
import './presentation/styles/typography.pcss';
const app = createApp(App);

app.use(router);
app.use(i18n);
app.mount('#app');
