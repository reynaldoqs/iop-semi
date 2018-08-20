export default {
    lazyLoadView(AsyncView) {
        //poner la funcion para tener una pagina de loading aqui
        return () => import(AsyncView)

    }
}