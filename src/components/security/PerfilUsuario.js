import React, { useEffect, useState } from 'react';
import style from '../Tools/Style';
import {Avatar, Button, Container, Grid, TextField, Typography} from '@material-ui/core';
import { /*obtenerUsuarioActual,*/ actualizarUsuario } from '../../actions/UsuarioAction';
import { useStateValue } from '../../context/store';
import reactFoto from '../../logo.svg';
import {v4 as uuidv4} from 'uuid';
import ImageUploader from 'react-images-upload';
import { ObtenerDataImagen } from '../../actions/ImagenAction';

const PerfilUsuario = () => {
    const [{ sesionUsuario }, dispatch] = useStateValue();

    const [usuario, setUsuario] = useState({
        nombre: '',
        apellidos:'',
        email: '',
        password: '',
        confirmarPassword: '',
        userName: '',
        imagenPerfil: null,
        fotoUrl: ''
    });

    const ingresarValoresMemoria = (e) =>{
        const {name, value} = e.target;
        setUsuario(anterior => ({
            ...anterior,
            [name]: value
        }));
    }

    useEffect( () => {
        setUsuario(sesionUsuario.usuario);
        setUsuario(anterior => ({
            ...anterior,
            fotoUrl: sesionUsuario.usuario.imagenPerfil,
            imagenPerfil: null
        }));
    }, [])

    const guardarUsuario = e => {
        e.preventDefault();
        actualizarUsuario(usuario, dispatch).then(response => {
            //console.log("PerfilUsuario: response => ", response, " usuario => ", usuario);
            if(response.status === 200){
                dispatch({
                    type: "OPEN_SNACKBAR",
                    openMensaje: {
                        open: true,
                        mensaje: "Se guardaron exitosamente los cambios del usuario"
                    }
                })
                window.localStorage.setItem("token_seguridad", response.data.token);
            }else{
                dispatch({
                    type: "OPEN_SNACKBAR",
                    openMensaje: {
                        open: true,
                        mensaje: "Error al intentar guardar en : " + Object.keys(response.data.errors)
                    }
                })
            }
            //console.log('Se Actualizo el usuario', response);
        })
    }

    const subirFoto = imagenes => {
        //Capturar el primer elemento del upload imagenes
        const foto = imagenes[0];

        //Convertir este archivo en formato file (foto) a una URL local
        const fotoUrl = URL.createObjectURL(foto);

        ObtenerDataImagen(foto).then(respuesta => {
            //console.log('respuesta', respuesta)
            setUsuario(anterior => ({
                //Para que mantengo los datos que habia
                ...anterior,
                //exceptos estos
                imagenPerfil : respuesta, //respuesta => es un json que proviene del action ImageAction
                fotoUrl : fotoUrl //el archivo en formato url
            }));
        })
    }

    const fotoKey = uuidv4();

    return (
        <Container component="main" maxWidth="md" justify="center">
            <div style={style.paper}>
                <Avatar style={style.avatar} src={usuario.fotoUrl || reactFoto} />
                {/*esto es para los titulos*/}
                <Typography component="h1" variant="h5">
                    Perfil de Usuario
                </Typography>
                <form style={style.form} >
                    <Grid container spacing={2} >
                        <Grid item xs={12} md={6}>
                            <TextField name="nombre" value={usuario.nombre || ""} onChange={ingresarValoresMemoria} variant="outlined" fullWidth label="Ingrese Nombre"/>
                        </Grid>
                        <Grid item xs={12} md={6}>
                                <TextField name="apellidos" value={usuario.apellidos || ""} onChange={ingresarValoresMemoria} variant="outlined" fullWidth label="Ingrese sus Apellidos"/>
                            </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField name="email" value={usuario.email || ""} onChange={ingresarValoresMemoria} variant="outlined" fullWidth label="Ingrese email"/>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField name="userName" value={usuario.userName || ""} onChange={ingresarValoresMemoria} variant="outlined" fullWidth label="Ingrese Usename"/>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField type="password" value={usuario.password || ""} onChange={ingresarValoresMemoria} name="password" variant="outlined" fullWidth label="Ingrese password"/>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField type="password" value={usuario.confirmarPassword || ""} onChange={ingresarValoresMemoria} name="confirmarPassword" variant="outlined" fullWidth label="Confirme password"/>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <ImageUploader withIcon={false}
                                            key={fotoKey}
                                            singleImage={true}
                                            buttonText="Selecione una imagen de perfil"
                                            onChange={subirFoto}
                                            imgExtension={[".jpg", ".gif", ".png", ".jpeg"]}
                                            maxFileSize={5242880}
                            />
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
            </div>
        </Container>
    );
};

export default PerfilUsuario;