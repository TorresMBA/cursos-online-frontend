//Va a manejar la configuracion generica del cliente axios en mi proyecto
import axios from 'axios';

//Indicar el endpoint base sobre la cual estan correiendo nuestros web services
axios.defaults.baseURL = 'http://localhost:5000/api/';

//Crear un objeto generico que represente lo request que enviamos al servidor
const requestGenerico = {
    get: (url) => axios.get(url),
    post: (url, body) => axios.post(url, body),
    put: (url, body) => axios.put(url, body),
    delete: (url) => axios.delete(url)
};

export default requestGenerico;