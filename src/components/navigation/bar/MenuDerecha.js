import React from 'react';
import { Avatar, List, ListItem, ListItemText } from '@material-ui/core';
import logo from '../../../logo.svg';
import { Link } from 'react-router-dom';

export const MenuDerecha = ({
    classes,
    salirSesion,
    usuario
}) => (
    <div className={classes.list}>
        <List>
            <ListItem button component={Link}>
                <Avatar src={usuario.imagen || logo}/>
                <ListItemText classes={{primary: classes.listItemText}} primary={ usuario ? usuario.nombre : "Null"}/>
            </ListItem>
            <ListItem button onClick={salirSesion}>
                <ListItemText classes={{primary: classes.listItemText}} primary="Salir"/>
            </ListItem>
        </List>
    </div>
);