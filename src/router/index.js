import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'posts',
      component: HomeView
    },
    {
      path: '/comments',
      name: 'comments',
      component: () => import('../views/CommentsView.vue')
    },
    {
      path: '/albums',
      name: 'albums',
      component: () => import('../views/AlbumsView.vue')
    },
    {
      path: '/photos',
      name: 'photos',
      component: () => import('../views/PhotosView.vue')
    },
    {
      path: '/todos',
      name: 'todos',
      component: () => import('../views/TodosView.vue')
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/UsersView.vue')
    }
  ]
})

export default router
