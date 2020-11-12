import React, { useState } from 'react';
import { Container, Typography, Grid, TextField, Button } from '@material-ui/core';
import style from '../Tools/Style';
import { registrarUsuario } from '../../actions/UsuarioAction';

const RegistrarUsuario = () => {
    const [usuario, setUsuario] = useState({
        Nombre: '',
        Apellidos: '',
        Email: '',
        Username: '',
        Password: '',
        ConfirmarPassword: ''
    });

    const ingresarValoresMemoria = e => {
        //representacion de la caja de texto 
        const {name, value} = e.target;
        setUsuario(anterior => ({
            ...anterior,
            [name] : value
        }))
    }

    const registrarUsuarioBoton = e => {
        e.preventDefault();
        registrarUsuario(usuario).then(response => {
            window.localStorage.setItem("token_seguridad", response.data.token);
        })
    }

    return (
        //El container es un objeto del Material-UI Design
        <Container component="main" maxWidth="md" justify="center">
            <div style={style.paper}>
                {/*Me permite formatos para titulo dentro del componente
                variant -> para que sea responsivo y reduszca el h1 hasta el h5
                */}
                <Typography component="h1" variant="h5">
                    Registro de Usuario
                </Typography>
                <form style={style.form}>
                    {/*El Grid puede tomar dos formas,
                    puede ser el container es decir el padre de otros objetos o tambien el hijo parte de un container si se coloco item
                    xs significa cuando el dispositivo este ejecutando la pagina sea un movil va a tomar todo el espacio i se pone un md cuando se trate de un dispositov table o superior va a tomar la mitad del espacio*/}
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            {/*cada variant tiene difenrete estilo en la caja de texto*/}
                            <TextField name="Nombre" value={usuario.Nombre} onChange={ingresarValoresMemoria} variant="outlined" fullWidth label="Ingrese su nombre"/>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField name="Apellidos" value={usuario.Apellidos} onChange={ingresarValoresMemoria} variant="standard" fullWidth label="Ingrese sus Apellidos"/>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField name="Email" value={usuario.Email} onChange={ingresarValoresMemoria} variant="outlined" fullWidth label="Ingrese su email"/>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField name="Username" value={usuario.Username} onChange={ingresarValoresMemoria} variant="filled" fullWidth label="Ingrese sus username"/>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField name="Password" value={usuario.Password} onChange={ingresarValoresMemoria} type="password" variant="outlined" fullWidth label="Ingrese su contraseña"/>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField name="ConfirmarPassword" value={usuario.ConfirmarPassword} onChange={ingresarValoresMemoria} type="password" variant="outlined" fullWidth label="Confirme su contraseña"/>
                        </Grid>
                    </Grid>
                    <Grid container justify="center">
                        <Grid item xs={12} md={6}>
                            <Button type="submit" onClick={registrarUsuarioBoton} fullWidth variant="contained" color="primary" size="large" style={style.submit}>
                                Enviar
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

export default RegistrarUsuario;