const style = {
    //Organiza los objetos entre si, uno tras otro de forma vertical
    paper:{
        //Margen con la parte superior
        marginTop: 8,
        //flex quiere decir que sea una tras otro
        display: "flex",
        //En que formato se debem organiza los objetros dentro del div, uno detras del otro para abajo, es tipo de modelo vertical o columna     
        flexDirection: "column",
        //Me aline los elementos del paper del div
        alignItems: "center"
    },
    form: {
        width: "100%",
        marginTop: 20
    },
    submit: {
        marginTop: 15
    }
};

export default style;