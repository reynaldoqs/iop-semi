export default {
  toJson (value) {
    if (value === null || value === undefined) {
      return null
    }
    try {
      let validJson = JSON.parse(value)
      return validJson
    } catch (err) {
      return null
    }
  },
  toNestedJson (array) {
    let padres = array.filter(data => !data.idParametroPadre)
    let hijos = array.filter(data => data.idParametroPadre)
    padres.map(data => {
      let ownHijos = hijos.filter(child => data.id === child.idParametroPadre)
      return Object.assign(data, { hijos: ownHijos })
    })

    hijos = hijos.map(data => {
      let ownhijos = hijos.filter(hijo => hijo.idParametroPadre === data.id)
      return Object.assign(data, { hijos: ownhijos.length > 0 ? ownhijos : null })
    })

    return padres.map(data => {
      /* let newData = {
        nombre: data.nombre,
        idParametroPadre: data.idParametroPadre,
        tipo: data.tipo,
        ubicacion: data.ubicacion,
        id: data.id,
        idRuta: data.idRuta,
        requerido: data.requerido,
        hijos: data.hijos.length > 0 ? data.hijos : null
      };
      return newData; */
      data.hijos = data.hijos.length > 0 ? data.hijos : null
      return data
    })
  }, // hacer un solo toNestedJson para hacerlo funcional
  toNestedJsonV2 (array) {
    console.log('se viene al dos')
    let padres = array.filter(data => !data.idParametroRespuestaPadre)
    let hijos = array.filter(data => data.idParametroRespuestaPadre)
    padres.map(data => {
      let ownHijos = hijos.filter(child => data.id === child.idParametroRespuestaPadre)
      return Object.assign(data, { hijos: ownHijos })
    })

    hijos = hijos.map(data => {
      let ownhijos = hijos.filter(hijo => hijo.idParametroRespuestaPadre === data.id)
      return Object.assign(data, { hijos: ownhijos.length > 0 ? ownhijos : null })
    })

    return padres.map(data => {
      data.hijos = data.hijos.length > 0 ? data.hijos : null
      return data
    })
  }
}
