import {createMuiTheme} from '@material-ui/core/styles';


const Theme = createMuiTheme({
    palette: {
        primary: {
            // color para cuando el usuario ponga el curso en un objeto
            light: "#63a4fff",

            //El color principál cuando se cague la pagina
            main: "#1976d2",

            //Color momento del hover
            dark: "#004ba0",
            
            //Colo de contraste del texto
            contrastText: "#ecfad8"
        }
    }
});

export default Theme;
