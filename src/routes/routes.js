import { routes as mainModule } from '@/app'
import { routes as moduleA } from '@/moduloCliente'
import { routes as moduleB } from '@/moduloUsuario'
import { routes as moduleC } from '@/moduloAdministrador'

export default [...mainModule, ...moduleA, ...moduleB, ...moduleC]
