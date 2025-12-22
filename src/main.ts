import { createApp } from 'vue';
import App from './App.vue';
import { setupI18n } from './locales';
import { setupVueQuery } from './plugins/vue-query';
import { setupRouter } from './router';
import { setupStore } from './store';
import './styles/global.css';

async function bootstrap() {
  const app = createApp(App);

  setupVueQuery(app);

  setupStore(app);

  setupRouter(app);

  setupI18n(app);

  app.mount('#app');
}

bootstrap();
