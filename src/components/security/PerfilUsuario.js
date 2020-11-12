import React, { useEffect, useState } from 'react';
import style from '../Tools/Style';
import {Button, Container, Grid, TextField, Typography} from '@material-ui/core';
import { obtenerUsuarioActual, actualizarUsuario } from '../../actions/UsuarioAction';

const PerfilUsuario = () => {
    const [usuario, setUsuario] = useState({
        nombre: '',
        apellidos:'',
        email: '',
        password: '',
        confirmarPassword: '',
        userName: ''
    });

    const ingresarValoresMemoria = (e) =>{
        const {name, value} = e.target;
        setUsuario(anterior => ({
            ...anterior,
            [name]: value
        }));
    }

    useEffect( () => {
        obtenerUsuarioActual().then(response => {
            console.log('Data del Objeto response del Usuario Actual', response);
            setUsuario(response.data);
        });
    }, [])

    const guardarUsuario = e => {
        e.preventDefault();
        actualizarUsuario(usuario).then(response => {
            console.log('Se Actualizo el usuario', usuario);
            window.localStorage.setItem("token_seguridad", response.data.token);
        })
    }

    return (
        <Container component="main" maxWidth="md" justify="center">
            <div style={style.paper}>
                {/*esto es para los titulos*/}
                <Typography component="h1" variant="h5">
                    Perfil de Usuario
                </Typography>
            </div>
            <form style={style.form} >
                <Grid container spacing={2} >
                    <Grid item xs={12} md={6}>
                        <TextField name="nombre" value={usuario.nombre} onChange={ingresarValoresMemoria} variant="outlined" fullWidth label="Ingrese Nombre"/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                            <TextField name="apellidos" value={usuario.apellidos} onChange={ingresarValoresMemoria} variant="outlined" fullWidth label="Ingrese sus Apellidos"/>
                        </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField name="email" value={usuario.email} onChange={ingresarValoresMemoria} variant="outlined" fullWidth label="Ingrese email"/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField name="userName" value={usuario.userName} onChange={ingresarValoresMemoria} variant="outlined" fullWidth label="Ingrese Usename"/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField type="password" value={usuario.password} onChange={ingresarValoresMemoria} name="password" variant="outlined" fullWidth label="Ingrese password"/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField type="password" value={usuario.confirmarPassword} onChange={ingresarValoresMemoria} name="confirmarPassword" variant="outlined" fullWidth label="Confirme password"/>
                    </Grid>
                </Grid>
                <Grid container justify="center">
                    <Grid item xs={12} md={6}>
                        <Button type="submit" onClick={guardarUsuario} fullWidth variant="contained" size="large" color="primary" style={style.submit}>
                            Guardar Datos
                        </Button>
                    </Grid>
                </Grid> 
            </form>
        </Container>
    );
};

export default PerfilUsuario;