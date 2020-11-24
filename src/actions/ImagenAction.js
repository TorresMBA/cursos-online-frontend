export const ObtenerDataImagen = imagen => {
    return new Promise((resolve, eject) =>{
        const nombre = imagen.name;
        const extension = imagen.name.split(".").pop();
        
        //Convertir imagen de tipo file a un formato tipo base64
        const lector = new FileReader(); 
        //Lo que hara este objeto es leer la data que esta ingresandole
        lector.readAsDataURL(imagen);
        //Para que lo cargue dentro la funcion que le indicamos
        lector.onload = () => resolve(
            {
                data: lector.result.split(",")[1],
                nombre: nombre,
                extension: extension
            }
        );
        lector.onerror = error => PromiseRejectionEvent(error);
    })
}