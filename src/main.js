import { createApp } from 'vue';
import App from './App.vue';  // Относительный путь
import router from '@/router/router';  // Относительный путь
import '@/assets/style.css'

createApp(App).use(router).mount('#app');
