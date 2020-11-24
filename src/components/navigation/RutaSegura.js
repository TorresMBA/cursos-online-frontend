import React from 'react';
import { useStateValue } from '../../context/store';
import { Redirect, Route } from 'react-router-dom';

function RutaSegura({component: Component, ...rest}){
    //Saber si el usuario esta en sesion o no 
    //para ello se llama a las variables globales
    const [ {sesionUsuario}, dispatch] = useStateValue();

    return (
        <Route
            //Va tener Todas las caracteristicas orignales que le paso por el parametro ...rest            
            {...rest}
            render = {(props) => 
                sesionUsuario ? (
                    sesionUsuario.autenticado == true ? (
                        //Si las condiciones son verdaderas indicare que pinte mi componente orignal
                        //con todas sus propiedades, va a pintar el componente que quiero en este caso
                        //a perfil
                        <Component {...props} {...rest} />
                    ) : <Redirect to="/auth/login" />
                ) : <Redirect to="/auth/login" />
            }
        />
    );
}

export default RutaSegura;