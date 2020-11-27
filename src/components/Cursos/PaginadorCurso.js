import React, { useEffect, useState } from 'react';
import { paginacionCurso } from '../../actions/CursoAction';
import { Hidden, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core';

const PaginadorCurso = () => {
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
        const objetoPaginadorRequest = {
            titulo: paginadorRequest.titulo,
            numeroPagina: paginadorRequest.numeroPagina + 1,
            cantidadElementos: paginadorRequest.cantidadElementos
        }

        const obtenerListaCurso = async() => {
            const response = await paginacionCurso(objetoPaginadorRequest);
            setPaginadorResponse(response.data);
        }

        obtenerListaCurso();
    }, [paginadorRequest])

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
       <React.Fragment>
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
                        {paginadorResponse.listaRecords.map((curso, i = 1) => (
                            <TableRow key={curso.titulo}>
                                <TableCell align="left">{i++}</TableCell>
                                <TableCell align="left">{curso.Titulo}</TableCell>
                                <Hidden mdDown>
                                    <TableCell align="left">{curso.Descripcion}</TableCell>
                                    <TableCell align="left">{(new Date(curso.FechaPublicacion)).toLocaleString()}</TableCell>
                                    <TableCell align="left">{curso.PrecioActual}</TableCell>
                                    <TableCell align="left">{curso.PrecioPromocion}</TableCell>
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
       </React.Fragment>
    );
};

export default PaginadorCurso;