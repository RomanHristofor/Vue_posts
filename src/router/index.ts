import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import MainPage from '@/pages/MainPage.vue'
import PostView from '@/components/PostView.vue'
import AboutPage from "@/pages/AboutPage.vue";
import Composition from "@/pages/CompositionPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: MainPage
  },
  {
    path: '/posts',
    name: 'posts',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/pages/PostsPage.vue')
  },
  {
    path: '/posts/:id',
    name: 'post',
    component: PostView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutPage
  },
  {
    path: '/composition',
    name: 'composition',
    component: Composition
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
