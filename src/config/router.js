import { defineAsyncComponent } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import LoadingSpinner from '../components/LoadingSpinner.vue';

const lazyLoadWithDelay = (path, delay = 1500) => 
  defineAsyncComponent({
    loader: () => 
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(import(`@/pages/${path}.vue`));
        }, delay);
      }),
    loadingComponent: LoadingSpinner,
    delay: 0,
    timeout: 30000,
    suspensible: false
  });

const routes = [
  { 
    path: "", 
    redirect: '/main' 
  },
  { 
    path: "/main", 
    name: 'main', 
    component: lazyLoadWithDelay('Main')
  },
  { 
    path: '/:pathMatch(.*)*', 
    redirect: '/main' 
  }
];

const router = createRouter({
  routes,
  history: createWebHistory()
});

export default router;