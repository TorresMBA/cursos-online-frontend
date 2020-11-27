import React from 'react';
import {AppBar} from '@material-ui/core';
import BarSesion from './bar/BarSesion';
import { useStateValue } from '../../context/store';

const AppNavBar = () => {
    const [ {sesionUsuario}/*, distpach*/] = useStateValue();

    return sesionUsuario ? (sesionUsuario.autenticado === true ? 
        <AppBar position="static">
            <BarSesion />
        </AppBar>
        : null
    ) : null;

    //return (
    //    <AppBar position="static">{/*Posicion estatica para que no se mueva*/}
    //        <BarSesion />
    //    </AppBar>
    //);
};

export default AppNavBar;