import React from 'react';
import {AppBar} from '@material-ui/core';
import BarSesion from './bar/BarSesion';

const AppNavBar = () => {
    return (
        <AppBar position="static">{/*Posicion estatica para que no se mueva*/}
            <BarSesion/>
        </AppBar>
    );
};

export default AppNavBar;