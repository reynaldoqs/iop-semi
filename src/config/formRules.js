//const expRegUrl = /^(http[s]?:\/\/(www\.)?|ftp:\/\/(www\.)?|www\.){1}([0-9A-Za-z-\.@:%_\+~#=]+)+((\.[a-zA-Z]{2,3})+)(\/(.)*)?(\?(.)*)?/g;
export default {
  req: v => !!v || 'Campo requerido',
  noSpace: v => {
    const expReg = /^\S+$/;
    return expReg.test(v) || 'No debe tener espacios en blanco.';
  },
  ip: v => {
    const expRegIp = /^(([1-9]?[0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]).){3}([1-9]?[0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
    return expRegIp.test(v) || 'Ip no válida';
  },
  email: v => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(v) || 'Correo no válido';
  },
  url: v => {
    const expRegUrl = /^([0-9A-Za-z-\.@:%_\+~#=]+)?/g;
    return expRegUrl.test(v) || 'URL no válido';
  },
  min3: v =>
    typeof v !== 'object'
      ? v.length >= 3 || 'El tamaño mínimo es de 3 caracteres'
      : 'Dato nulo',
  min15: v =>
    typeof v !== 'object'
      ? v.length >= 15 || 'El tamaño mínimo es de 15 caracteres'
      : 'Dato nulo',
  max2: v =>
    typeof v !== 'object'
      ? v.length <= 2 || 'El tamaño máximo es de 2 caracteres'
      : 'Dato nulo',
  customMax: (v, max) => v.length <= max || `El tamaño máximo es de 3 caracteres${v}`,
  max9: v =>
    typeof v !== 'object'
      ? v.length <= 9 || 'El tamaño máximo es de 9 caracteres'
      : 'Dato nulo',
  max20: v =>
    typeof v !== 'object'
      ? v.length <= 20 || 'El tamaño máximo es de 20 caracteres'
      : 'Dato nulo',
  max30: v =>
    typeof v !== 'object'
      ? v.length <= 30 || 'El tamaño máximo es de 30 caracteres'
      : 'Dato nulo',
  max50: v =>
    typeof v !== 'object'
      ? v.length <= 50 || 'El tamaño máximo es de 50 caracteres'
      : 'Dato nulo',
  max150: v =>
    typeof v !== 'object'
      ? v.length <= 150 || 'El tamaño máximo es de 150 caracteres'
      : 'Dato nulo',
  max500: v =>
    typeof v !== 'object'
      ? v.length <= 500 || 'El tamaño máximo es de 500 caracteres'
      : 'Dato nulo',
  integer: v => typeof v === 'number' || 'Tiene que ser un número'
};
