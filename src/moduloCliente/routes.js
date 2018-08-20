export default [
  {
    path: '/cliente',
    name: 'cliente',
    component: () => import('@/moduloCliente/views/Cliente.vue'),
    meta: {
      auth: true,
    }
  }
]

