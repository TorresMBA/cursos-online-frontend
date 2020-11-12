import HttpCliente from '../service/HttpCliente';

export const registrarUsuario = usuario => {
    return new Promise((resolve, eject) => {
        HttpCliente.post('/Usuario/registrar', usuario)
                    .then(response =>{
                        resolve(response);
                    })
    })
}