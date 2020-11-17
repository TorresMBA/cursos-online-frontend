import React from 'react';
import { ThemeProvider as MuithemeProvider } from '@material-ui/core/styles';
import theme from './theme/theme';
import RegistrarUsuario from './components/security/RegistrarUsuario';
import Login from './components/security/Login';
import PerfilUsuario from './components/security/PerfilUsuario';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { Grid } from '@material-ui/core';
import AppNavBar from './components/navigation/AppNavBar';
//Router es un enrutador
//Switch es el que redirige a que componente te estas refierendo
//Route es la ruta del componente que se va a cargar

function App() {
    return (
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
    );
}

export default App;
