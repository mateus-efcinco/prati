import React from 'react';

const Descontos = () => {

    React.useEffect( () => {

        fetch('/MAIORES%20DESCONTOS').then( r => r.text())
            .then( result => {
                console.log(result)
            })

    }, [])
    
    
    return(
        <>
        </>
    )
}

export default Descontos
