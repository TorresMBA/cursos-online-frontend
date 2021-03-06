import React from 'react';
import { Divider, List, ListItem, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';

export const MenuIzquierda = ({classes}) => (
    <div className={classes.list}>
        <List>
            <ListItem component={Link} button to="/auth/perfil">
                <i className="material-icons">account_box</i>
                <ListItemText classes={{primary: classes.listItemText}} primary="Perfil"/>
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem component={Link} button to="/curso/nuevo">
                <i className="material-icons">add_box</i>
                <ListItemText classes={{primary: classes.listItemText}} primary="Nuevo Curso" />
            </ListItem>
            <ListItem component={Link} button to="/curso/paginador" >
                <i className="material-icons">menu_book</i>
                <ListItemText classes={{primary: classes.listItemText}} primary="Lista Cursos" />
            </ListItem>
        </List>
        <Divider/>
        <List>
            <ListItem component={Link} botton to="/instructor/nuevo">
                <i className="material-icons">person_add</i>
                <ListItemText classes={{primary: classes.listItemText}} primary="Nuevo Instructor"/>
            </ListItem>
            <ListItem component={Link} botton to="/instructor/lista">
                <i className="material-icons">supervisor_account</i>
                <ListItemText classes={{primary: classes.listItemText}} primary="Lista Instructores"/>
            </ListItem>
        </List>
    </div>
);
