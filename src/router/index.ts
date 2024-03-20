import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Main from '@/pages/Main.vue'
import PostView from '@/components/PostView.vue'
import About from "@/pages/About.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Main
  },
  {
    path: '/posts',
    name: 'posts',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/pages/Posts.vue')
  },
  {
    path: '/posts/:id',
    name: 'post',
    component: PostView
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
