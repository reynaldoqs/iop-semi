import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '@/routes/routes'
import store from '@/store/index'
// import store from '@/store';

Vue.use(VueRouter)

export const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  console.log((store.getters['isAuthenticated']))
  console.log(to)
  if (to.matched.some(m => m.meta.auth) && !store.getters['isAuthenticated']) {
    console.log('si necesita login')
    if (!store.getters['isAuthenticated']) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    console.log('no necesita login')
    next()
  }
})

Vue.router = router;
export default {
  router
}