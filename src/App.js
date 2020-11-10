import './App.css';
import MuithemeProvide from '@material-ui/core/styles/MuiThemeProvider';
import theme from './theme/theme';
import { TextField, Button } from '@material-ui/core';

function App() {
    return (
        <MuithemeProvide theme={theme}>
            <h1>Proyecto en blanco</h1>
            <TextField variant="outlined"/>
            <Button variant="contained" color="primary">
                Mi Button Material Design
            </Button>
        </MuithemeProvide>
    )
}

export default App;
