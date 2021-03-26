import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _import = (path) => () => import(`@/views/${path}.vue`)

const routes = [
  {
    path: '/',
    name: 'home',
    component: _import('index'),
    meta: {
      title: 'Vue2.0 + VantUI',
    },
  },
  {
    path: '/swiper',
    name: 'swiper',
    component: _import('swiper'),
    meta: {
      title: 'swiper demo',
    },
  },
  {
    path: '*',
    redirect: '/',
  },
];

const routers = new Router({
  // mode: 'history',
  linkActiveClass: '',
  linkExactActiveClass: 'tive-item-active',
  routes: [
    ...routes
  ],
})

routers.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

routers.afterEach((to, from, next) => {
  window.scroll(0, 0)
})

export default routers
