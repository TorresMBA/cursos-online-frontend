//Se encargara evaluar el tiempo de espera hasta que envie el request al aervixo
//que se refiere el tiempo de espero, el tiempo el cual el usuario a dejado de escribir algo en la caja de texto
import React, {useState, useEffect} from 'react';

export default function ControlTyping(texto, delay) {
    const [textoValor, setTextoValor] = useState();

    useEffect(()=>{
        const manejador = setTimeout(() => {
            setTextoValor(texto);
        }, delay);

        return () => {
            clearTimeout(manejador);
        }
    }, [texto]);

    return textoValor;
}