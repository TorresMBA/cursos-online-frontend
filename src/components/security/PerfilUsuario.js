import React from 'react';
import style from '../Tools/Style';
import {Button, Container, Grid, TextField, Typography} from '@material-ui/core';

const PerfilUsuario = () => {
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
                        <TextField name="nombreCompleto" variant="outlined" fullWidth label="Ingrese Nombre"/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                            <TextField name="apellidos" variant="standard" fullWidth label="Ingrese sus Apellidos"/>
                        </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField name="email" variant="outlined" fullWidth label="Ingrese email"/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField type="password" name="password" variant="outlined" fullWidth label="Ingrese password"/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField type="password" name="confirmepassword" variant="outlined" fullWidth label="Confirme password"/>
                    </Grid>
                </Grid>
                <Grid container justify="center">
                    <Grid item xs={12} md={6}>
                        <Button type="submit" fullWidth variant="contained" size="large" color="primary" style={style.submit}>
                            Guardar Datos
                        </Button>
                    </Grid>
                </Grid> 
            </form>
        </Container>
    );
};

export default PerfilUsuario;