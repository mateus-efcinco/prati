import React from 'react';

const InstitucionalClicked = () => {

    React.useEffect(() => {

        let pathname = window.location.pathname

        let nodes = document.querySelectorAll('.vtex-menu-2-x-menuContainer--menu-institucional > li')

        nodes.forEach( (el) => {
            let a = el.querySelector('a')
            if(a !== null) {

                if(a.href.includes(pathname)) {
                    a.querySelector('div').classList.add('vtex-menu-2x-x-menuItem-clicked')
                }
            }
        })

    }, [])

    return(
        <></>
    )
}

export default InstitucionalClicked
