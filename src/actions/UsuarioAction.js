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
                        if(response.data && response.data.imagenPerfil){
                            let fotoPerfil = response.data.imagenPerfil;
                            //Se arma la estructura de un base64 que es la imagen
                            const nuevoFile = 'data:image/' + fotoPerfil.extension + ';base64,' + fotoPerfil.data;
                            response.data.imagenPerfil = nuevoFile;
                        }
                        dispatch({
                            type: "INICIAR_SESION",
                            sesion: response.data,
                            autenticado: true
                        });
                        resolve(response);
                    })
    })
}

export const actualizarUsuario = (usuario, dispatch) => {
    return new Promise( (resolve, eject) => {
        HttpCliente.put('/Usuario', usuario)
                    .then(response => {
                        console.log('UsuarioAction.js, Usuario => ', usuario, " Response => ", response);
                        if(response.data && response.data.imagenPerfil){
                            let fotoPerfil = response.data.imagenPerfil;
                            //Se arma la estructura de un base64 que es la imagen
                            const nuevoFile = 'data:image/' + fotoPerfil.extension + ';base64,' + fotoPerfil.data;
                            response.data.imagenPerfil = nuevoFile;
                        }
                        dispatch({
                            type: "INICIAR_SESION",
                            sesion: response.data,
                            autenticado: true
                        });
                        resolve(response);
                    })
                    .catch(error => {
                        resolve(error.response);
                    });
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