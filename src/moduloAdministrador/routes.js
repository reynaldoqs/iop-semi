
function loadView(view) {
  return () => import(/* webpackChunkName: "view-[request]" */ `@/moduloAdministrador/views/${view}.vue`)
}

export default [
  {
    path: '/dashboard',
    name: 'modulo-administrador',
    component: loadView('Administrador')
  }]