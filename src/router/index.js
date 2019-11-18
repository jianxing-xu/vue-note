import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: () => import('@/page/home.vue'),
    children: [
      {
        path: 'detail/:tid',
        name: 'detail',
        component: () => import('@/page/detailEditor.vue')
      },
      {
        path: 'groupEditor',
        name: 'groupEditor',
        component: () => import('@/components/groupEditor.vue')
      }
    ]
  },
  {
    path: '/new',
    name: 'new',
    component: () => import('@/page/detailEditor.vue')
  },
  {
    path: '/grouping',
    name: 'grouping',
    component: () => import('@/page/grouping.vue')
  },
  {
    path: '/',
    redirect: '/home'
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
