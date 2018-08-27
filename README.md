## Configuración del entorno

Para un corrento funcionamiento se debe tener los siguientes micro-servicios funcionando obligatoriamente:
> links a los md de los apis

Programas requeridos para el despliege del proyecto:
> links a los md de los apis
## Despliege del proyecto
### Clonación

Clonarlo:

**Opción 1:** Si se generó llave SSH: (En los pasos del archivo SERVER.md)
```sh
$ git clone git@gitlab.geo.gob.bo:agetic/proyecto-base-frontend-vue.git
```
**Opción 2:** Si se quiere clonar el proyecto por HTTPS:
```sh
$ git clone https://usuario@gitlab.geo.gob.bo/agetic/proyecto-base-frontend-vue.git
```
Es posible que al descargar el proyecto con HTTPs, nos lance el siguiente error:
```sh
Cloning into 'nombre-del-proyecto'...
fatal: unable to access 'https://url-del-proyecto.git/': server certificate verification failed. CAfile: /etc/ssl/certs/ca-certificates.crt CRLfile: none
```
```sh
$ git config --global http.sslverify false
$ git clone https://usuario@gitlab.geo.gob.bo/agetic/proyecto-base-frontend-vue.git
```

**Después de clonar con cualquiera de las opciones anteriores:**

Ingresar a la carpeta:
```sh
$ cd proyecto....
```
Podemos verificar que estamos en el branch master:
```sh
$ git status
```
Nos devolverá:
```sh
- On branch master
```

#### Instalando dependencias npm, se recomienda usar `yarn` para una instalación correcta
```sh
$ yarn # o npm install
```

#### Configurar los datos de conexión a los servicios REST del backend

La configuración general se hace en los archivos `config/index.js`, `config/dev.env.js` y `config/prod.env.js`, a continuación se muestra un ejemplo de configuración:

```js
module.exports = {
  NODE_ENV: '"production"',
  API_URL: '"http://localhost:4000"',
  AUTH_URL: '"http://localhost:4000/autenticacion"',
  TIME_SESSION_EXPIRED: 30,
  ONBEFOREUNLOAD: true,
  AUTH_TOKEN: '"JWT"',
  LANG: '"es"',
  DEBUG_MODE: false
}
```

# lazy-iop

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test:unit
```
