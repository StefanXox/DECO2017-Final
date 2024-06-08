import Vue from 'vue'
import VueRouter from 'vue-router'
//import HomeView from '@/views/HomeView.vue'
import indexPageVue from '@/views/indexPage.vue';
import calendar from '@/views/calendar';
import library from '@/views/library'
import track from '@/views/track.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: indexPageVue
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: calendar
  },
  {
    path: '/library',
    name: 'library',
    component: library,
  },
  {
    path: '/tracker',
    name: 'tracker',
    component: track,
  },
]

const router = new VueRouter({
  routes
})

export default router