
import NotFound from './views/NotFound'
import Login from './views/Login'
export default [
  {
    path: '/',
    redirect: '/usuario'
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound
  },
  {
    path: '/login',
    name: 'login-page',
    component: Login
  }
]
