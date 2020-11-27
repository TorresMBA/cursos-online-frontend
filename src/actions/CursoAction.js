import HttpCliente from '../service/HttpCliente';
//import axios from 'axios';

export const guardarCurso = async (curso, imagen) => {
    const endPointCurso = '/cursos';
    const promesaCurso = HttpCliente.post(endPointCurso, curso);
    
    if(imagen){
        const endoPointImagen = '/documento';   
        const promesaImagen = HttpCliente.post(endoPointImagen, imagen);
        return await Promise.all([promesaCurso, promesaImagen].map(p => p.catch(e => e)));
    }else{
        return await Promise.all([promesaCurso].map(p => p.catch(e => e)));
    }
};

export const paginacionCurso = (paginador) => {
    return new Promise((resolve, eject) => {
        HttpCliente.post('/cursos/report', paginador)
            .then((response) => {
                resolve(response);
            })
            .catch(error => {
                resolve(error)
            });
    })
};