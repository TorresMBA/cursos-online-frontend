import HttpCliente from '../service/HttpCliente';
import axios from 'axios';

const instancia = axios.create();
instancia.CancelToken = axios.CancelToken;
instancia.isCancel = axios.isCancel;

export const registrarUsuario = usuario => {
    return new Promise((resolve, eject) => {
        instancia.post('/Usuario/registrar', usuario)
                    .then(response =>{
                        resolve(response);
                    })
                    .catch(error => {
                        resolve(error.response);
                    });
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
                        })
                        resolve(response);
                    })
                    .catch(error => {
                        resolve(error.response);
                    });
    })
}

export const actualizarUsuario = (usuario, dispatch) => {
    return new Promise( (resolve, eject) => {
        HttpCliente.put('/Usuario', usuario)
                    .then(response => {
                        //console.log('UsuarioAction.js, Usuario => ', usuario, " Response => ", response);
                        //Evaluo la existencia del atributo imagenPerfil si tiene o no tiene data, es decir 
                        //el usuario que quiero consultar tiene o no ttiene foto sino tiene no pasa nada
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

export const loginUsuario = (usuario, dispatch) => {
    return new Promise( (resolve, eject) => {
        instancia.post('/Usuario/login', usuario)
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
                        resolve(response)
                    }).catch(error => {
                        resolve(error.response);
                    });
    });
}