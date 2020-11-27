import React, { useState } from 'react';
import {Button, Container, Grid, TextField, Typography} from '@material-ui/core';
import style from '../Tools/Style';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import ImageUploader from 'react-images-upload';
import {v4 as uuidv4} from 'uuid';
import { ObtenerDataImagen } from '../../actions/ImagenAction';
import {guardarCurso} from '../../actions/CursoAction';
import {useStateValue} from '../../context/store';

const NuevoCurso = () => {
    const [{},dispatch] = useStateValue();

    //variable de estado local para que almacene la fecha
    const [fechaSeleccionada, setFechaSelecionada] = useState(new Date());

    const [imagenCurso, setImagenCurso] = useState(null);

    const [curso, setCurso] = useState({
        titulo: '',
        descripcion: '',
        precio: 0.0,
        promocion: 0.0
    });

    const resetarForm = () => {
        setFechaSelecionada(new Date());
        setImagenCurso(null);
        setCurso({
            titulo: '',
            descripcion: '',
            precio: 0.0,
            promocion: 0.0
        });
    }

    //Lo que el usuario ingrese dentro de las cajas de texto van a entrar a la memoria js 
    //por eso creo este metodo para que capture esos valores y las convierta en varaibles locales de estado
    const ingresarValoresMemoria = e => {
        const {name, value} = e.target; //representa la caja de texto, y la caja de texto tiene dos atributos

        setCurso((anterior) => ({
            ...anterior,
            [name] : value
        }));
    }

    const subirFoto = imagenes => {
        const foto = imagenes[0];

        //convertir imagen file a base64
        ObtenerDataImagen(foto).then((respuesta) => {
            setImagenCurso(respuesta)
        });
    }

    const guardarCursoBotton = e =>{
        e.preventDefault();
        //Se crea Id para que represente al curso
        //va a viajar tanto para objetocurso como para imagencurso
        const cursoId = uuidv4();

        const objetoCurso = {
            titulo: curso.titulo,
            descripcion: curso.descripcion,
            promocion: parseFloat(curso.promocion || 0.0),
            precio: parseFloat(curso.precio || 0.0),
            fechaPublicacion: fechaSeleccionada,
            cursoId: cursoId
        };
        
        let objetoImagen = null;

        if(imagenCurso){
            objetoImagen = {
                nombre : imagenCurso.nombre,
                data : imagenCurso.data,
                extension: imagenCurso.extension,
                objetoReferencia: cursoId
            }
        }

        guardarCurso(objetoCurso, objetoImagen)
            .then(respuesta => {
                //console.log("Respuesta arreglo", respuesta);
                const reponseCurso = respuesta[0];
                const responseImagen = respuesta[1];
                let mensaje = "";
                
                if(reponseCurso.status === 200){
                    mensaje += "Se guardo existosamente el curso"
                    resetarForm();
                }else{
                    mensaje += "Errores: " + Object.keys(reponseCurso.response.data.errors);
                }

                if(responseImagen){
                    if(responseImagen.status === 200){
                        mensaje += ", Se guardo la imagen correctamente"
                    }else{
                        mensaje += ", Errores en imagen: " + Object.keys(responseImagen.response.data.errors);
                    }
                }

                dispatch({
                    type:"OPEN_SNACKBAR",
                    openMensaje: {
                        open: true,
                        mensaje: mensaje
                    }
                });
            });
    }

    const fotokey = uuidv4();

    return (
        <Container component="main" maxWidth="md" justify="center">
            <div style={style.paper}>
                <Typography component="h1" variant="h5">
                    Registro de Nuevo Curso
                </Typography>
            </div>
            <form style={style.form}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                        <TextField name="titulo"
                                    variant="outlined"
                                    fullWidth
                                    label="Ingrese Titulo"
                                    value={curso.titulo  || " "}
                                    onChange={ingresarValoresMemoria}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <TextField name="descripcion"
                                    variant="outlined"
                                    fullWidth
                                    label="Descripcion"
                                    value={curso.descripcion  || " "}
                                    onChange={ingresarValoresMemoria}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField name="precio"
                                    variant="outlined"
                                    fullWidth
                                    label="Ingrese Precio normal"
                                    value={curso.precio  || " "}
                                    onChange={ingresarValoresMemoria}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField name="promocion"
                                    variant="outlined"
                                    fullWidth
                                    label="Ingrese Precio promocion"
                                    value={curso.promocion  || " "}
                                    onChange={ingresarValoresMemoria}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker 
                                value={fechaSeleccionada  || "-/-/-"}
                                onChange={setFechaSelecionada}
                                margin="normal"
                                id="fecha-publicacion-id"
                                label="Seleccione fecha de publicacion"
                                format="dd/MM/yyyy"
                                fullWidth
                                KeyboardButtonProps = {{
                                    "aria-label": "change date"
                                }}

                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <ImageUploader
                            withIcon={false}
                            key={fotokey}
                            singleImage={true}
                            buttonText="Selecione imagen del curso"
                            onChange={subirFoto}
                            imgExtension={[".jpg", ".gif", ".png", ".jpeg"]}
                            maxFileSize={5242880}
                        />
                    </Grid>
                </Grid> 
                <Grid container justify="center">
                    <Grid item xs={12} md={6}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            size="large"
                            style={style.submit}
                            onClick={guardarCursoBotton}
                        >
                            Guardar Curso
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default NuevoCurso;