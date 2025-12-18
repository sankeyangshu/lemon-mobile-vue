import { createApp } from 'vue';
import App from './App.vue';
import { setupI18n } from './locales';
import { setupRouter } from './router';
import './styles/global.css';

async function bootstrap() {
  const app = createApp(App);

  setupRouter(app);

  setupI18n(app);

  app.mount('#app');
}

bootstrap();
