import React from 'react';
import { Toolbar, IconButton, Typography, makeStyles, Button, Avatar } from '@material-ui/core';
import logo from '../../../logo.svg';
import { useStateValue } from '../../../context/store';

const useStyles = makeStyles((theme) => ({
    seccionDesktop: {
        display: "none",//Oculta todo
        [theme.breakpoints.up("md")]: {
            display: "flex"
        }//hasta que reconozca una pantalla pc o tablet
    },
    seccionMobile: {
        display: "flex",//Indica que empieze mostrando el componente
        [theme.breakpoints.up("md")]: {//pero si reconoze que la pantalla es una tablet o pc 
            display: "none"//entonces esto ocultara || inversa de la seecionDesktop
        }
    },
    grow: {
        flexGrow: 1 //Va a tomar todo el espacio disponible dentro de un div
    },
    avatarSize: {
        width: 40,
        height: 40
    }
})) 

const BarSesion = () => {
    const classes = useStyles();
    const [{sesionUsuario}, dispatch] = useStateValue();

    return (
        <Toolbar>
            <IconButton color="inherit">
                <i className="material-icons">menu</i>
            </IconButton>
            <Typography variant="h6">Cursos Online</Typography>
            <div className={classes.grow}></div>
            <div className={classes.seccionDesktop}>
                <Button color="inherit">
                    Salir
                    </Button>
                <Button color="inherit">
                    {sesionUsuario ? sesionUsuario.usuario.nombre : ""}
                    </Button>
                <Avatar src={logo}>
                </Avatar>
            </div>

            <div className={classes.seccionMobile}>
                <IconButton color="inherit">
                    <i className="material-icons">more_vert</i>
                </IconButton>
            </div>
        </Toolbar>
    );
};

export default BarSesion;