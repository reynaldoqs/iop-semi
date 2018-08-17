
// import DashBoard from "../views/Protected/DashBoard/DashBoard";
/* children routes */
// usuarios
import UsuariosMainComponent from '@/moduloAdministrador/components/usuarios/UsuariosMainComponent'
import UsuarioDetailComponent from '@/moduloAdministrador/components/usuarios/UsuarioDetailComponent'
// Fin usuarios
// Servicios
import ServiciosMainComponent from '@/moduloAdministrador/components/servicios/ServiciosMainComponent'
import ServiciosDetailComponent from '@/moduloAdministrador/components/servicios/ServiciosDetailComponent'
// Rutas
import RutasMainComponent from '@/moduloAdministrador/components/rutas/RutasMainComponent'
import RutasDetailComponent from '@/moduloAdministrador/components/rutas/RutasDetailComponent'
// Fin rutas
// entidades
import EntidadesMainComponent from '@/moduloAdministrador/components/entidades/EntidadesMainComponent'
// Fin entidades
// ambientes
import AmbientesMainComponent from '@/moduloAdministrador/components/ambientes/AmbientesMainComponent'
import AmbientesDetailComponent from '@/moduloAdministrador/components/ambientes/AmbientesDetailComponent'
// Fin ambientes
import NoticiasComponent from '@/moduloAdministrador/components/NoticiasComponent'
// Estadisticas
import EstadisticasMainComponent from '@/moduloAdministrador/components/estadisticas/EstadisticasMainComponent'
// Fin estadisticas
// PARA HACER PRUEBAS COMPONENTS
// COMPONENTS PARA USUARIOS NORMALES
import UserServiciosDetailComponent from '@/moduloAdministrador/components/usersComponents/userServicios/UserServiciosDetailComponent'
import UserServiciosMainComponent from '@/moduloAdministrador/components/usersComponents/userServicios/UserServiciosMainComponent'
import UserRutasMainComponent from '@/moduloAdministrador/components/usersComponents/userRutas/UserRutasMainComponent'
import UserCatalogoListComponent from '@/moduloAdministrador/components/usersComponents/userRutas/UserCatalogoListComponent'
// PARA OTRAS ACCIONES
import ResetClave from '@/moduloAdministrador/components/accountSettings/resetPassword/resetClave'

// rutas ordenadas
//import Administrador from '@/moduloAdministrador/views/Administrador'
function loadView(view) {
  return () => import(/* webpackChunkName: "view-[request]" */ `@/moduloAdministrador/views/${view}.vue`)
}

export default [
  /* {
        path: '/administrador',
        name: 'administrador',
        component: loadView('Administrador')
    }, */
  // OREDENAR LAS RUTAS
  {
    path: '/dashboard',
    component: loadView('Administrador'),
    children: [
      {
        path: '',
        redirect: {
          name: 'user-estadisticas'
        }
      },
      // Rutas para usuarios normales
      {
        path: 'servicios/:id',
        name: 'user-servicios',
        component: UserServiciosDetailComponent
      },
      {
        path: 'servicios',
        name: 'user-all-Servicios',
        component: UserServiciosMainComponent
      },
      {
        path: 'estadisticas',
        name: 'user-estadisticas',
        component: EstadisticasMainComponent
      },
      {
        path: 'catalogo/:num',
        name: 'detail-catalogo',
        component: UserRutasMainComponent
      },
      {
        path: 'catalogo-servicios',
        name: 'catalogo-list',
        component: UserCatalogoListComponent
      }
    ]
  },
  {
    path: '/admin',
    component: loadView('Administrador'),
    children: [
      {
        path: '',
        redirect: '/admin/estadisticas'
      },
      // estadisticas
      {
        path: 'estadisticas',
        name: 'admin-estadisticas',
        component: EstadisticasMainComponent
      },
      // Fin estadisticas
      // Usuairos
      {
        path: 'usuarios',
        name: 'usuarios',
        component: UsuariosMainComponent
      },
      {
        path: 'usuarios/detail/:id',
        name: 'detail-usuarios',
        component: UsuarioDetailComponent
      },
      // Fin usuarios
      // Servicios
      {
        path: 'servicios',
        name: 'servicios',
        component: ServiciosMainComponent
      },
      // prueba para ver los detalles de rutas en el servicio
      {
        path: 'servicios/detail/:id',
        name: 'detail-servicios',
        component: ServiciosDetailComponent
      },
      // End servicios
      // Rutas components
      {
        path: 'rutas',
        name: 'rutas',
        component: RutasMainComponent
      },
      {
        path: 'rutas/detail/:id',
        name: 'detail-rutas',
        component: RutasDetailComponent
      },
      // Fin rutas
      // Entidades
      {
        path: 'entidades',
        name: 'entidades',
        component: EntidadesMainComponent
      },
      // Fin entidades
      // ambientes
      {
        path: 'ambientes',
        name: 'ambientes',
        component: AmbientesMainComponent
      },
      {
        path: 'ambientes/detail/:id',
        name: 'detail-ambientes',
        component: AmbientesDetailComponent
      },
      // Fin ambientes
      {
        path: 'noticias',
        name: 'noticias',
        component: NoticiasComponent
      }
    ]
  }

]
