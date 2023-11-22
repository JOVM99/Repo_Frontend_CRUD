//Función para buscar un cliente por el nombre
export const getClientesPorNombre = (clientes, nombre='') => {
    if (nombre==null ){
      nombre=''
    }
    nombre = nombre.toLocaleLowerCase().trim();
    if(nombre.length === 0) return [...clientes];
    return clientes.filter( c => c.nombre.toLocaleLowerCase().includes(nombre));
}