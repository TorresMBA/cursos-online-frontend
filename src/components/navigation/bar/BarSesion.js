import React, { useState } from 'react';
import { Toolbar, 
    IconButton, 
    Typography, 
    makeStyles, 
    Button, 
    Avatar, 
    Drawer
} from '@material-ui/core';
import logo from '../../../logo.svg';
import { useStateValue } from '../../../context/store';
import { MenuIzquierda } from './MenuIzquierda';
import { MenuDerecha } from './MenuDerecha';
import { withRouter } from 'react-router-dom';

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
    },
    list: {
        width: 250
    },
    listItemText: {
        fontSize: "14px",
        fontWeight:  600,
        paddingLeft: "15px",
        color: "#212121"
    }
})) 

const BarSesion = (props) => {
    const classes = useStyles();
    const [{sesionUsuario}, dispatch] = useStateValue();
    const [abrirMenuIzquierda, setAbrirMenuIzquierda] = useState(false);
    const [abrirMenuDerecha, setAbrirMenuDerecha] = useState(false);

    const cerrarMenuIzquierda = () => {
        setAbrirMenuIzquierda(false);
    }

    const abrirMenuIzquierdaAction = () => {
        setAbrirMenuIzquierda(true);
    }

    const cerrarMenuDerecha = () => {
        setAbrirMenuDerecha(false);
    }

    const abrirMenuDerechaAction = () => {
        setAbrirMenuDerecha(true);
    }

    const salirSesionApp = () => {
        //Para este caso salir de sesion es porque el token no existe, al borrar el token del browser
        //que representa la sesion del usuario automaticamente signifcara que saliste sesion
        localStorage.removeItem('token_seguridad');
        props.history.push('/auth/login');
    }

    return (
        <React.Fragment>
            <Drawer open={abrirMenuIzquierda}
                    onClose={cerrarMenuIzquierda}
                    anchor="left"
            >
                <div className={classes.list} onKeyDown={cerrarMenuIzquierda} onClick={cerrarMenuIzquierda}>
                    <MenuIzquierda classes={classes}/>
                </div>
            </Drawer>

            <Drawer open={abrirMenuDerecha}
                    onClose={cerrarMenuDerecha}
                    anchor="right"
            >
                <div role="button" onClick={cerrarMenuDerecha} onKeyDown={cerrarMenuDerecha }>
                    <MenuDerecha classes={classes} 
                                salirSesion={salirSesionApp} 
                                usuario={sesionUsuario ? sesionUsuario.usuario : null}/>
                </div>
            </Drawer>

            <Toolbar>
                <IconButton color="inherit" onClick={abrirMenuIzquierdaAction}>
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
                    <IconButton color="inherit" onClick={abrirMenuDerechaAction}>
                        <i className="material-icons">more_vert</i>
                    </IconButton>
                </div>
            </Toolbar>
        </React.Fragment>
    );
};

export default withRouter(BarSesion);