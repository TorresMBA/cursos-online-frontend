//Los reducers tiene 3 partes
/*
    1 Los valores que va a almacenar 
    2 La logica que va a ejecuta dependiendo al usuario que quiera hacer
    3 exportar la funcion
*/

//Aqui va a almacenar toda la data
export const initialState = {  
    usuario: {
        nombre:'',
        apellido:'',
        username: '',
        foto: ''
    },
    autenticado: false
}

const sesionUsuarioReducer = (state = initialState, action) => {
    switch (action.type) {
        case "INICIAR_SESION":
            return {
                ...state,
                usuario: action.sesion,
                autenticado: action.autenticado
            };
        case "SALIR_SESION":
            return{
                ...state,
                usuario: action.nuevoUsuario,
                autenticado: action.autenticado
            }
        case "ACTUALIZAR_USUARIO":
            return {
                ...state,
                usuario: action.nuevoUsuario,
                autenticado: action.autenticado
            }
        default:
            return state;
    }
};

export default sesionUsuarioReducer;