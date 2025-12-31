import { createApp } from 'vue';
import App from './App.vue';
import { setupI18n } from './locales';
import { setupIconifyOffline, setupLoading } from './plugins';
import { setupVueQuery } from './plugins/vue-query';
import { setupRouter } from './router';
import { setupStore } from './store';
import './styles/global.css';
import './plugins/assets';

async function bootstrap() {
  setupLoading();

  setupIconifyOffline();

  const app = createApp(App);

  setupVueQuery(app);

  setupStore(app);

  await setupRouter(app);

  setupI18n(app);

  app.mount('#app');
}

bootstrap();
