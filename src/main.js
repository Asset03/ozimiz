import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './style.css'
import App from '@/App.vue'
import router from '@/config/router'

const pinia = createPinia()
const app = createApp(App)

app.config.errorHandler = (err, instance, info) => {
  console.error('Global error handler:', err);
  const errorBoundary = instance?.$parent?.$refs.errorBoundary;
  if (errorBoundary) {
    errorBoundary.onError(err);
  }
};

app.use(pinia)
app.use(router)

app.mount('#app')
