import React, { useEffect, useState } from 'react';
import { paginacionCurso } from '../../actions/CursoAction';
import { Grid, Hidden, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from '@material-ui/core';
import ControlTyping from '../Tools/ControlTyping';

const PaginadorCurso = () => {
    const [textoBuscadorcusro, setTextoBusquedaCurso] = useState("");
    const typingBuscadorTexto = ControlTyping(textoBuscadorcusro, 900);

    const [paginadorRequest, setPaginadorRequest] = useState({
        titulo: " ",
        numeroPagina: 0,
        cantidadElementos: 5
    });

    const [paginadorResponse, setPaginadorResponse] = useState({
        listaRecords: [],
        numeroPaginas: 0,
        totalRecords: 0
    });

    useEffect(() => {
        const obtenerListaCurso = async() => {
            let tituloVariante = "";
            let paginaVariante = paginadorRequest.numeroPagina + 1;
            
            if(typingBuscadorTexto){
                tituloVariante = typingBuscadorTexto;
                paginaVariante = 1
            }

            const objetoPaginadorRequest = {
                titulo: tituloVariante,
                numeroPagina: paginaVariante,
                cantidadElementos: paginadorRequest.cantidadElementos
            }

            const response = await paginacionCurso(objetoPaginadorRequest);
            setPaginadorResponse(response.data);
        }

        obtenerListaCurso();
    }, [paginadorRequest, typingBuscadorTexto])

    const cambiarPagina = (event, nuevaPagina) => {
        setPaginadorRequest((anterior) => ({
            ...anterior,
            numeroPagina: parseInt(nuevaPagina)
        }));
    }

    const cambiarCantidadRecords = (event) => {
        setPaginadorRequest((anterior) => ({
            ...anterior,
            cantidadElementos: parseInt(event.target.value),
            numeroPagina: 0
        }));
    }

    return (    
       <div style={{padding:"10px", width:"100%"}}>
           <Grid container style={{paddingTop:"20px", paddingBottom:"20px"}}>
                <Grid item xs={12} sm={4} md={6}>
                    <TextField 
                        fullWidth
                        name="textoBusquedaCurso"
                        variant="outlined"
                        label="Busca tu Curso"
                        onChange={e => setTextoBusquedaCurso(e.target.value)}
                    />
                </Grid>
           </Grid>
           <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">ID</TableCell>
                            <TableCell align="left">Cursos</TableCell>
                            <Hidden mdDown>
                                <TableCell align="left">Descripcion</TableCell>
                                <TableCell align="left">FechaPublicacion</TableCell>
                                <TableCell align="left">Precio Normal</TableCell>
                                <TableCell align="left">Precio Oferta</TableCell>
                            </Hidden>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginadorResponse.listaRecords.map((curso) => (
                            <TableRow key={curso.titulo }>
                                {/*<TableCell align="left">{i++ || ""}</TableCell>*/}
                                <TableCell align="left">{curso.Titulo || "" }</TableCell>
                                <Hidden mdDown>
                                    <TableCell align="left">{curso.Descripcion || ""}</TableCell>
                                    <TableCell align="left">{(new Date(curso.FechaPublicacion)).toLocaleString() || ""}</TableCell>
                                    <TableCell align="left">{curso.PrecioActual || ""}</TableCell>
                                    <TableCell align="left">{curso.PrecioPromocion || ""}</TableCell>
                                </Hidden>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
           </TableContainer>
           <TablePagination 
                rowsPerPageOptions={[5, 10, 25]}//Combo box para decir caunta data puede pintar en pantalla
                count={paginadorResponse.totalRecords}//Cantidad de elemtos que tiene en total la tabla que quiero paginar
                rowsPerPage={paginadorRequest.cantidadElementos}//Indica cuantas filas quiero imprimir dentro de la pagina
                page={paginadorRequest.numeroPagina}//Indica que en pagina estoy
                onChangePage={cambiarPagina}
                onChangeRowsPerPage={cambiarCantidadRecords}//Este evento se disprara cuando el usuario seleccione un item del combo box
                labelRowsPerPage="Cursos por Pagina"
            />
       </div>
    );
};

export default PaginadorCurso;