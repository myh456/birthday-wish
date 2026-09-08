import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import('../views/main-view.vue'),
    },
    {
      path: '/item1',
      name: 'item1',
      component: () => import('../components/item-1.vue'),
    },
    {
      path: '/item2',
      name: 'item2',
      component: () => import('../components/item-2.vue'),
    },
    {
      path: '/item3',
      name: 'item3',
      component: () => import('../components/item-3.vue'),
    },
    {
      path: '/item4',
      name: 'item4',
      component: () => import('../components/item-4.vue'),
    },
  ],
})

export default router
