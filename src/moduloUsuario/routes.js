import Inicio from './views/Inicio';
import Main from './views/Main'
export default [
    {
        path: '/usuario',
        name: 'usuario',
        component: Main,
        title: 'usuario',
        redirect: { name: 'usuario-inicio' },
        children: [
            {
                path: 'inicio',
                name: 'usuario-inicio',
                component: Inicio,
            }
        ],
    },
]