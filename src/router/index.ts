import { createRouter, createWebHistory } from 'vue-router'
import HomePageVue from '../views/HomePage.vue'
import UserViewVue from '../views/UserView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePageVue,
  },
  {
    path: '/user/:id',
    name: 'User',
    component: UserViewVue,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
