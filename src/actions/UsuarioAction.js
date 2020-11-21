import HttpCliente from '../service/HttpCliente';

export const registrarUsuario = usuario => {
    return new Promise((resolve, eject) => {
        HttpCliente.post('/Usuario/registrar', usuario)
                    .then(response =>{
                        resolve(response);
                    })
    })
}

export const obtenerUsuarioActual = (dispatch) => {
    return new Promise((resolve, ejecet) => {
        HttpCliente.get('/Usuario')
                    .then(response => {
                        dispatch({
                            type: "INICIAR_SESION",
                            sesion: response.data,
                            autenticado: true
                        });
                        resolve(response);
                    })
    })
}

export const actualizarUsuario = usuario => {
    return new Promise( (resolve, eject) => {
        HttpCliente.put('/Usuario', usuario)
                    .then(response => {
                        resolve(response);
                    })
    })
}

export const loginUsuario = usuario => {
    return new Promise( (resolve, eject) => {
        HttpCliente.post('/Usuario/login', usuario)
                    .then(response => {
                        resolve(response)
                    })
    })
}