function loadView (view) {
  return () => import(/* webpackChunkName: "view-[request]" */ `@/moduloCliente/views/${view}.vue`)
}

export default [
  {
    path: '/cliente',
    name: 'cliente',
    component: loadView('Cliente')
  }
]
