
import NotFound from './views/NotFound'

export default [
    {
        path: '/',
        redirect: '/usuario',
    },
    {
        path: '*',
        name: 'not-found',
        component: NotFound
    }
]
