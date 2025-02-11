import { createRouter, createWebHistory } from 'vue-router'
import CharacterListView from '../views/CharacterListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'characterList',
      component: CharacterListView,
    },
    {
      path: '/character/:id',
      name: 'characterDetails',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CharacterDetailsView.vue'),
    },
  ],
})

export default router
