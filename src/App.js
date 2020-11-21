import React, { useEffect, useState } from 'react';
import { ThemeProvider as MuithemeProvider } from '@material-ui/core/styles';
import theme from './theme/theme';
import RegistrarUsuario from './components/security/RegistrarUsuario';
import Login from './components/security/Login';
import PerfilUsuario from './components/security/PerfilUsuario';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { Grid, Snackbar } from '@material-ui/core';
import AppNavBar from './components/navigation/AppNavBar';
import { useStateValue } from './context/store';
import { obtenerUsuarioActual } from './actions/UsuarioAction';
//Router es un enrutador
//Switch es el que redirige a que componente te estas refierendo
//Route es la ruta del componente que se va a cargar

function App() {
    //Referencia a esa data que esta manejando el reducer openSnackBar, referencia a la variable global que almacena el estado
    //del snackBar
    const [{ sesionUsuario, openSnackBar }, dispatch] = useStateValue();

    const [iniciaApp, setInicialApp] = useState(false);

    useEffect(() => {
        if(!iniciaApp){
            obtenerUsuarioActual(dispatch).then(response => {
                setInicialApp(true);
            }).catch((error) => {
                setInicialApp(true);
            });
        }
    }, [iniciaApp])

    return (
        //Porque agregar <React.Fragment> lo que pasa es que cada vez que defines el html de un componente react 
        //Solo se puede colocar un solo componenete, dentro de este componente de tipo dom virtual anidas los siguientes componente
        //no puedes puedes cologar por ejemplo dentro return dos objetos de tipo dom virtual porque da errores 
        //Solo se puede colocar un unico objeto padre que referencia despues a los hijos 
        <React.Fragment>
            {/*anchorOrigin = indica donde aparecera en pantalla, open= indica si aparecera o no en pantalla */}
            <Snackbar anchorOrigin={{ vertical: "bottom", horizontal: "center"}} 
                        open={openSnackBar ? openSnackBar.open : false}
                        autoHideDuration={3000}
                        ContentProps={{"aria-describedby": "message-id"}}
                        message={
                            <span id="message-id">{openSnackBar ? openSnackBar.mensaje : ""}</span>
                        }
                        onClose={ () => 
                            dispatch({
                                type: "OPEN_SNACKBAR",
                                openMensaje: {
                                    open : false,
                                    mensaje : ""
                                }
                            })
                        }
            >
            </Snackbar>
            <Router>
                <MuithemeProvider theme={theme}>
                    <AppNavBar/>
                    <Grid container>
                        <Switch>
                            <Route exact path="/auth/login" component={Login}/>
                            <Route exact path="/auth/registrar" component={RegistrarUsuario}/>
                            <Route exact path="/auth/perfil" component={PerfilUsuario}/>
                            <Route exact path="/" component={PerfilUsuario}/>
                        </Switch>
                    </Grid>
                </MuithemeProvider>
            </Router>
        </React.Fragment>
    );
}

export default App;
