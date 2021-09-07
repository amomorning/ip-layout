import Vue from 'vue'
import VueRouter from 'vue-router'
import Viewport from "@/views/Viewport";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Viewport,
    meta: {title: 'Integer Programming'}
  },

]

const router = new VueRouter({
  routes
})

// eslint-disable-next-line no-unused-vars
router.afterEach((to, from) => {
  // Use next tick to handle router history correctly
  // see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
  Vue.nextTick(() => {
    document.title = to.meta.title || 'ArchiWeb';
  });
});
export default router
