import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About')
  },
    {
      path: '/blog/:id',
      name: 'Blog',
      component: () => import('../views/Blog/index')
    },
    {
      path: '/article/:id',
      name: 'Article',
      component: () => import('../views/Article')
    },
    {
      path: '/message',
      name: 'Message',
      component: () => import('../views/Message')
    },
    {
      path: '/diary',
      name: 'Diary',
      component: () => import('../views/Diary')
    },
    {
      path: '/link',
      name: 'Link',
      component: () => import('../views/Link')
    }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
